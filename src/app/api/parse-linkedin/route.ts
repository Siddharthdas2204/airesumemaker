import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { url } = await req.json();

        if (!url || !url.includes("linkedin.com")) {
            return NextResponse.json({ error: "Invalid LinkedIn URL provided." }, { status: 400 });
        }

        const username = url.split("linkedin.com/in/")[1]?.split("/")[0] || "User";

        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "GROQ_API_KEY is not configured on the server." },
                { status: 500 }
            );
        }

        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "llama-3.1-8b-instant",
                    messages: [
                        {
                            role: "system",
                            content: `You are a strict JSON data extractor API. You must rely on the provided LinkedIn URL/username to output a realistic resume profile. If the username belongs to a widely known public figure in tech, use accurate public information. Otherwise, invent a highly realistic, professional tech resume for a person named based on the username string.
The output MUST be valid JSON only. Do not wrap it in markdown block quotes (e.g. \`\`\`json). Just the raw JSON object.
Output schema:
{
  "personal": {
    "fullName": "Name (derived from url or famous person)",
    "email": "inferred or generated realistic email",
    "phone": "555-123-4567",
    "location": "A realistic tech city (e.g., San Francisco, CA)",
    "linkedin": "the provided url",
    "portfolio": "theirname.com",
    "summary": "2-3 sentences of a strong professional summary."
  },
  "experiences": [
    {
      "id": "random_string_1",
      "company": "Company Name",
      "role": "Job Title",
      "startDate": "Mon YYYY",
      "endDate": "Mon YYYY or Present",
      "description": "2-3 bullets summarizing impact"
    }
  ],
  "education": [
    {
      "id": "random_string_2",
      "institution": "University Name",
      "degree": "Degree Type",
      "field": "Major",
      "startDate": "YYYY",
      "endDate": "YYYY",
      "gpa": "Optional GPA"
    }
  ],
  "skillsAndExtras": {
    "skills": "Comma separated modern skills",
    "certifications": "Comma separated certificates",
    "languages": "English, etc.",
    "hobbies": "Optional hobbies"
  }
}
`,
                        },
                        {
                            role: "user",
                            content: `Generate the JSON payload for this LinkedIn URL: ${url}. Username is ${username}.`,
                        },
                    ],
                    temperature: 0.1,
                }),
            }
        );

        if (!response.ok) {
            console.error("Groq API error:", await response.text());
            throw new Error("Failed to fetch from Groq API");
        }

        const completion = await response.json();
        const content = completion.choices[0]?.message?.content || "";
        let parsed;

        try {
            // strip markdown formatting if the model still outputs it
            const cleaned = content.replace(/```json/i, "").replace(/```/i, "").trim();
            parsed = JSON.parse(cleaned);
        } catch (parseError) {
            console.error("JSON parsing error strictly using regex:", content);
            throw new Error("Failed to parse JSON response from AI.");
        }

        return NextResponse.json(parsed);
    } catch (error) {
        console.error("LinkedIn parse error:", error);
        return NextResponse.json(
            { error: "Failed to extract LinkedIn profile data. Try manual input." },
            { status: 500 }
        );
    }
}
