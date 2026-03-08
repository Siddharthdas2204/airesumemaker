import { ResumeData } from "./types";

export function generatePortfolioHTML(data: ResumeData): string {
    const { personal, experiences, education, skillsAndExtras } = data;

    const sections = [];

    // Experience
    if (experiences && experiences.length > 0) {
        const expItems = experiences.map(exp => `
            <div class="card mb-6 p-6">
                <div class="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900">${exp.role}</h3>
                        <p class="text-lg text-gray-600 font-medium">${exp.company}</p>
                    </div>
                    <span class="inline-block mt-2 md:mt-0 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                        ${exp.startDate} - ${exp.endDate}
                    </span>
                </div>
                <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">${exp.description}</p>
            </div>
        `).join("");

        sections.push(`
            <section id="experience" class="py-16">
                <div class="container mx-auto px-6 max-w-4xl">
                    <h2 class="text-3xl font-bold mb-8 text-gray-900 border-b pb-2 inline-block">Work Experience</h2>
                    ${expItems}
                </div>
            </section>
        `);
    }

    // Education
    if (education && education.length > 0) {
        const eduItems = education.map(edu => `
            <div class="card mb-6 p-6 border-l-4 border-gray-400">
                <h3 class="text-xl font-bold text-gray-900">${edu.degree} in ${edu.field}</h3>
                <p class="text-lg text-gray-600 font-medium">${edu.institution}</p>
                <div class="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>${edu.startDate} - ${edu.endDate}</span>
                    ${edu.gpa ? `<span>GPA: ${edu.gpa}</span>` : ""}
                </div>
            </div>
        `).join("");

        sections.push(`
            <section id="education" class="py-16 bg-gray-50">
                <div class="container mx-auto px-6 max-w-4xl">
                    <h2 class="text-3xl font-bold mb-8 text-gray-900 border-b pb-2 inline-block">Education</h2>
                    ${eduItems}
                </div>
            </section>
        `);
    }

    // Skills
    if (skillsAndExtras?.skills) {
        const skillsArray = skillsAndExtras.skills.split(",").map(s => s.trim()).filter(Boolean);
        const skillBadges = skillsArray.map(s => `
            <span class="px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-lg text-gray-800 font-medium">
                ${s}
            </span>
        `).join("");

        sections.push(`
            <section id="skills" class="py-16">
                <div class="container mx-auto px-6 max-w-4xl pt-8">
                    <h2 class="text-3xl font-bold mb-8 text-gray-900 border-b pb-2 inline-block">Skills & Expertise</h2>
                    <div class="flex flex-wrap gap-3 mt-4">
                        ${skillBadges}
                    </div>
                </div>
            </section>
        `);
    }

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${personal.fullName} - Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background-color: #FFFFFF;
            color: #111827;
        }
        .card {
            background: #FFFFFF;
            border: 1px solid #E5E7EB;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
        }
        .gradient-text {
            background: linear-gradient(135deg, #4B5563 0%, #111827 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        nav a {
            transition: color 0.2s;
        }
        nav a:hover {
            color: #111827;
        }
    </style>
</head>
<body class="antialiased">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div class="container mx-auto px-6 py-4 flex justify-between items-center max-w-5xl">
            <span class="font-bold text-xl tracking-tight text-gray-900">${personal.fullName}</span>
            <div class="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
                <a href="#about">About</a>
                ${experiences.length > 0 ? `<a href="#experience">Experience</a>` : ''}
                ${education.length > 0 ? `<a href="#education">Education</a>` : ''}
                <a href="#contact" class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">Contact</a>
            </div>
        </div>
    </nav>

    <!-- Hero / About -->
    <header id="about" class="pt-32 pb-20 px-6 bg-gray-50">
        <div class="container mx-auto max-w-4xl text-center md:text-left md:flex items-center gap-12">
            <div class="flex-1">
                <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                    Hi, I'm <span class="gradient-text">${personal.fullName}</span>
                </h1>
                ${personal.location ? `<p class="flex items-center justify-center md:justify-start gap-2 text-gray-500 mb-6">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    ${personal.location}
                </p>` : ''}
                <p class="text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl">
                    ${personal.summary || "A passionate professional dedicated to building amazing things."}
                </p>
                <div class="flex flex-wrap justify-center md:justify-start gap-4">
                    <a href="#contact" class="px-8 py-3 bg-gray-900 text-white font-medium rounded-xl shadow-md hover:bg-gray-800 transition-colors">
                        Get in touch
                    </a>
                    ${personal.portfolio ? `
                    <a href="${personal.portfolio.startsWith('http') ? personal.portfolio : `https://${personal.portfolio}`}" target="_blank" class="px-8 py-3 bg-white text-gray-900 font-medium rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-colors">
                        View Work
                    </a>` : ''}
                </div>
            </div>
        </div>
    </header>

    ${sections.join("\n")}

    <!-- Contact -->
    <section id="contact" class="py-20 bg-gray-900 text-white text-center">
        <div class="container mx-auto px-6 max-w-3xl border-t border-gray-800 pt-16">
            <h2 class="text-4xl font-bold mb-6">Let's Work Together</h2>
            <p class="text-xl text-gray-400 mb-10">I'm currently available for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
            <a href="mailto:${personal.email}" class="inline-block px-8 py-4 bg-white text-gray-900 font-bold rounded-xl shadow-lg hover:scale-105 transition-transform">
                Say Hello
            </a>
            <div class="mt-16 flex justify-center gap-6 text-gray-500">
                ${personal.linkedin ? `
                <a href="${personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`}" target="_blank" class="hover:text-white transition-colors">
                    LinkedIn
                </a>` : ''}
                ${personal.portfolio ? `
                <a href="${personal.portfolio.startsWith('http') ? personal.portfolio : `https://${personal.portfolio}`}" target="_blank" class="hover:text-white transition-colors">
                    Portfolio
                </a>` : ''}
                <a href="mailto:${personal.email}" class="hover:text-white transition-colors">Email</a>
            </div>
        </div>
    </section>

    <footer class="bg-gray-950 text-gray-600 text-center py-6 text-sm">
        <p>© ${new Date().getFullYear()} ${personal.fullName}. Built with ResumeAI.</p>
    </footer>
</body>
</html>`;

    return html;
}
