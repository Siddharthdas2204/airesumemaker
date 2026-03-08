import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { resumeData, jobDescription } = await req.json();

        if (!jobDescription) {
            return NextResponse.json({ error: "Job description is required." }, { status: 400 });
        }

        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "GROQ_API_KEY is not configured on the server." },
                { status: 500 }
            );
        }

        const prompt = `Analyze this resume against the provided job description and suggest optimization improvements.
Resume Data: ${JSON.stringify(resumeData)}
Job Description: ${jobDescription}

Output schema:
{
  "keywords": ["string keyword 1", "string keyword 2"],
  "skillAdditions": ["string skill 1", "string skill 2"],
  "bulletImprovements": ["string improvement for bullet 1", "string improvement for bullet 2"],
  "experienceImprovements": ["string generic experience improvement"]
}
Ensure output is ONLY valid JSON, no markdown formatting like \`\`\`json.`;

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
                        { role: "system", content: "You are an AI resume optimizer that strictly outputs only pure JSON based on a job description." },
                        { role: "user", content: prompt }
                    ],
                    temperature: 0.1,
                }),
            }
        );

        if (!response.ok) throw new Error("Failed to fetch from Groq API");

        const completion = await response.json();
        const content = completion.choices[0]?.message?.content || "";

        let parsed;
        try {
            const cleaned = content.replace(/```json/i, "").replace(/```/i, "").trim();
            parsed = JSON.parse(cleaned);
        } catch (parseError) {
            throw new Error("Failed to parse JSON response from AI.");
        }

        return NextResponse.json(parsed);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to optimize resume." },
            { status: 500 }
        );
    }
}
