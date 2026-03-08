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

        const prompt = `Analyze this resume specifically for Applicant Tracking System (ATS) compatibility. Check proper section headings, keyword match predictability, readable formatting structure, font compatibility assumptions, and structural parsing. Return a JSON with an ATS score out of 100 and specific suggestions to improve ATS performance.
Resume Data: ${JSON.stringify(resumeData)}

Output schema:
{
  "score": <number 0-100>,
  "suggestions": [
     "string suggestion 1",
     "string suggestion 2"
  ]
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
                        { role: "system", content: "You are a specialized ATS evaluating AI API that outputs only pure JSON." },
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
            { error: "Failed to run ATS check." },
            { status: 500 }
        );
    }
}
