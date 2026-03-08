import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { resumeData } = await req.json();

        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "GROQ_API_KEY is not configured on the server." },
                { status: 500 }
            );
        }

        const prompt = `Analyze this resume and generate 10-15 mock interview questions tailored directly to the candidate's experience, skills, and projects.
Categorize the questions into 3 categories: technical, behavioral, and experienceBased.
Resume Data: ${JSON.stringify(resumeData)}

Output schema:
{
  "technical": ["string question", "string question"],
  "behavioral": ["string question", "string question"],
  "experienceBased": ["string question", "string question"]
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
                        { role: "system", content: "You are an AI mock interview generator that strictly outputs only pure JSON based on resume data." },
                        { role: "user", content: prompt }
                    ],
                    temperature: 0.3,
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
            { error: "Failed to generate mock interview." },
            { status: 500 }
        );
    }
}
