import { NextRequest, NextResponse } from "next/server";
import { ResumeData } from "@/lib/types";

export async function POST(req: NextRequest) {
    try {
        const { resumeData, template } = (await req.json()) as {
            resumeData: ResumeData;
            template: string;
        };

        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "GROQ_API_KEY is not configured on the server." },
                { status: 500 }
            );
        }

        const prompt = buildPrompt(resumeData, template);

        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        {
                            role: "system",
                            content:
                                "You are a world-class professional resume writer. You generate clean, well-structured HTML resumes. Output ONLY the HTML content for the resume body — no markdown, no ``` blocks, no explanation. Use semantic HTML with inline styles for professional formatting.",
                        },
                        { role: "user", content: prompt },
                    ],
                    temperature: 0.7,
                    max_tokens: 4000,
                }),
            }
        );

        if (!response.ok) {
            const errBody = await response.text();
            console.error("Groq API error:", errBody);
            return NextResponse.json(
                { error: "AI generation failed. Please try again." },
                { status: 502 }
            );
        }

        const data = await response.json();
        const generatedContent =
            data.choices?.[0]?.message?.content || "No content generated.";

        // Clean up any markdown code fences the model might wrap
        const cleaned = generatedContent
            .replace(/```html\n?/gi, "")
            .replace(/```\n?/g, "")
            .trim();

        return NextResponse.json({ content: cleaned });
    } catch (error) {
        console.error("Resume generation error:", error);
        return NextResponse.json(
            { error: "An unexpected error occurred." },
            { status: 500 }
        );
    }
}

function buildPrompt(data: ResumeData, template: string): string {
    const { personal, experiences, education, skillsAndExtras } = data;

    let styleGuide = "";
    switch (template) {
        case "modern":
            styleGuide =
                "Use a modern, clean design with a left sidebar containing contact info and skills (background color #6c5ce7, white text), and a main content area on the right. Use sans-serif fonts throughout.";
            break;
        case "creative":
            styleGuide =
                "Use a bold, creative layout with gradient accents (#6c5ce7 to #00cec9), large section headers, and a visually striking header with the person's name in large typography. Add subtle visual separators between sections.";
            break;
        case "minimalist":
            styleGuide =
                "Use an ultra-minimalist layout with ample whitespace, a single stark black or dark gray accent color, thin borders for separation, and an elegant serif font (like Merriweather or Playfair Display). Keep it extremely clean.";
            break;
        case "executive":
            styleGuide =
                "Use a deeply professional, authoritative executive layout. Include a prominent header with a dark blue background (#1e3799) and white text for the name and contact info. Use structured grid layouts for experiences and a strong contrast serif font for headers, sans-serif for body.";
            break;
        case "startup":
            styleGuide =
                "Use a vibrant, colorful startup-friendly layout with energetic accents (like #ff4757 or #2ed573) for headers and icons. Use a dual-column layout where the left column is light gray. Ensure it looks dynamic, using a modern geometric sans-serif font.";
            break;
        case "academic":
            styleGuide =
                "Use a formal academic CV layout. Center the name and contact information at the top. Use a traditional serif font (like Times New Roman or Garamond). Sections should be clearly delineated with horizontal rules. Focus on a dense but readable presentation of information.";
            break;
        case "infographic":
            styleGuide =
                "Use an infographic-style layout. Incorporate visual timelines or grid blocks where possible. Use simple inline CSS-based progress bars for skills. Use a highly modern aesthetic with dark accents (#2f3640) and teal highlights (#00a8ff).";
            break;
        default:
            styleGuide =
                "Use a classic, traditional resume layout with clean typography, clear section dividers, and a professional font. Keep it elegant and ATS-friendly with minimal colors (primary accent: #6c5ce7).";
    }

    return `Generate a professional resume in clean HTML with inline CSS styles.

STYLE: ${styleGuide}

PERSONAL INFORMATION:
- Name: ${personal.fullName}
- Email: ${personal.email}
- Phone: ${personal.phone}
- Location: ${personal.location}
- LinkedIn: ${personal.linkedin || "N/A"}
- Portfolio: ${personal.portfolio || "N/A"}

PROFESSIONAL SUMMARY:
${personal.summary || "Write a compelling 2-3 sentence professional summary based on the experience below."}

WORK EXPERIENCE:
${experiences.length > 0
            ? experiences
                .map(
                    (exp) =>
                        `- ${exp.role} at ${exp.company} (${exp.startDate} - ${exp.endDate})\n  ${exp.description}`
                )
                .join("\n")
            : "No work experience provided."
        }

EDUCATION:
${education.length > 0
            ? education
                .map(
                    (edu) =>
                        `- ${edu.degree} in ${edu.field} from ${edu.institution} (${edu.startDate} - ${edu.endDate})${edu.gpa ? `, GPA: ${edu.gpa}` : ""}`
                )
                .join("\n")
            : "No education provided."
        }

SKILLS: ${skillsAndExtras.skills || "N/A"}
CERTIFICATIONS: ${skillsAndExtras.certifications || "N/A"}
LANGUAGES: ${skillsAndExtras.languages || "N/A"}

IMPORTANT INSTRUCTIONS:
1. Enhance and professionalize ALL descriptions using strong action verbs and quantifiable results where possible.
2. Output ONLY the HTML body content. No <html>, <head>, or <body> tags.
3. Make it look like a real, polished resume that would impress a hiring manager.
4. Keep the total length to one page worth of content.
5. Use inline styles only. No external CSS references.`;
}
