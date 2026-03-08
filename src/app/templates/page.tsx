"use client";

import { motion } from "framer-motion";
import { FileText, Home, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
    }),
};

const TEMPLATES = [
    {
        id: "classic",
        name: "Classic",
        desc: "Traditional & ATS-friendly layout with clean lines and elegant typography.",
        headerBg: "#F9FAFB",
        headerColor: "#111827",
        accentColor: "#6B7280",
        sidebarBg: null,
        style: "traditional",
    },
    {
        id: "modern",
        name: "Modern",
        desc: "Two-column sidebar layout with a bold colored sidebar and modern sans-serif fonts.",
        headerBg: "#4B5563",
        headerColor: "#FFFFFF",
        accentColor: "#4B5563",
        sidebarBg: "#4B5563",
        style: "sidebar",
    },
    {
        id: "creative",
        name: "Creative",
        desc: "Bold gradients, large typography, and eye-catching section headers for creative roles.",
        headerBg: "linear-gradient(135deg, #6B7280, #9CA3AF)",
        headerColor: "#FFFFFF",
        accentColor: "#6B7280",
        sidebarBg: null,
        style: "gradient",
    },
    {
        id: "minimalist",
        name: "Minimalist",
        desc: "Ultra-clean design with ample whitespace and elegant serif fonts for a refined look.",
        headerBg: "#FFFFFF",
        headerColor: "#111827",
        accentColor: "#D1D5DB",
        sidebarBg: null,
        style: "minimal",
    },
    {
        id: "executive",
        name: "Executive",
        desc: "Deeply professional and authoritative layout for senior roles and C-suite positions.",
        headerBg: "#1F2937",
        headerColor: "#FFFFFF",
        accentColor: "#1F2937",
        sidebarBg: null,
        style: "executive",
    },
    {
        id: "startup",
        name: "Startup",
        desc: "Vibrant dual-column layout with energetic accents, perfect for tech and startup roles.",
        headerBg: "#F3F4F6",
        headerColor: "#111827",
        accentColor: "#6B7280",
        sidebarBg: "#F9FAFB",
        style: "startup",
    },
    {
        id: "academic",
        name: "Academic (CV)",
        desc: "Formal academic CV layout with centered headers and traditional serif typesetting.",
        headerBg: "#FFFFFF",
        headerColor: "#111827",
        accentColor: "#374151",
        sidebarBg: null,
        style: "academic",
    },
    {
        id: "infographic",
        name: "Infographic",
        desc: "Visual data-driven layout with progress bars, timelines, and a modern aesthetic.",
        headerBg: "#374151",
        headerColor: "#FFFFFF",
        accentColor: "#6B7280",
        sidebarBg: "#374151",
        style: "infographic",
    },
];

function TemplatePreview({ template }: { template: (typeof TEMPLATES)[0] }) {
    const isGradient = template.headerBg.includes("gradient");

    // SVG Dimensions
    const w = 300;
    const h = 400;
    const headerH = 75;
    const startX = template.sidebarBg ? 100 : 0;
    const mainWidth = template.sidebarBg ? 200 : 300;

    const fillTitle = template.headerColor === "#FFFFFF" ? "rgba(255,255,255,0.95)" : "#111827";
    const fillSub = template.headerColor === "#FFFFFF" ? "rgba(255,255,255,0.6)" : "#6B7280";

    return (
        <svg
            viewBox={`0 0 ${w} ${h}`}
            className="w-full h-auto rounded-lg shadow-sm"
            style={{ background: "white", border: "1px solid #E5E7EB", display: "block" }}
        >
            <defs>
                {isGradient && (
                    <linearGradient id="creativeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6B7280" />
                        <stop offset="100%" stopColor="#9CA3AF" />
                    </linearGradient>
                )}
            </defs>

            {/* Header */}
            {template.style !== "minimal" && template.style !== "academic" ? (
                <>
                    <rect
                        x="0" y="0" width={w} height={headerH}
                        fill={isGradient ? "url(#creativeGrad)" : template.headerBg}
                    />
                    <rect x="24" y="24" width="160" height="12" rx="3" fill={fillTitle} />
                    <rect x="24" y="46" width="100" height="6" rx="2" fill={fillSub} />
                </>
            ) : (
                <>
                    <rect x="0" y="0" width={w} height={headerH} fill="white" />
                    <rect x={(w - 180) / 2} y="26" width="180" height="12" rx="2" fill="#111827" />
                    <rect x={(w - 120) / 2} y="48" width="120" height="4" rx="1" fill="#6B7280" />
                    {template.style === "academic" && (
                        <rect x="20" y="70" width={w - 40} height="1" fill="#E5E7EB" />
                    )}
                </>
            )}

            {/* Sidebar */}
            {template.sidebarBg && (
                <g>
                    <rect x="0" y={headerH} width="100" height={h - headerH} fill={template.sidebarBg} />
                    {/* Sidebar bars */}
                    <rect x="16" y={headerH + 20} width="60" height="5" rx="2.5" fill="rgba(255,255,255,0.5)" />
                    <rect x="16" y={headerH + 35} width="70" height="3" rx="1.5" fill="rgba(255,255,255,0.25)" />
                    <rect x="16" y={headerH + 45} width="50" height="3" rx="1.5" fill="rgba(255,255,255,0.25)" />
                    <rect x="16" y={headerH + 55} width="65" height="3" rx="1.5" fill="rgba(255,255,255,0.25)" />

                    <rect x="16" y={headerH + 85} width="50" height="5" rx="2.5" fill="rgba(255,255,255,0.5)" />
                    <rect x="16" y={headerH + 100} width="65" height="3" rx="1.5" fill="rgba(255,255,255,0.25)" />
                    <rect x="16" y={headerH + 110} width="45" height="3" rx="1.5" fill="rgba(255,255,255,0.25)" />
                    <rect x="16" y={headerH + 120} width="70" height="3" rx="1.5" fill="rgba(255,255,255,0.25)" />
                </g>
            )}

            {/* Main Content Areas */}
            <g transform={`translate(${startX}, ${headerH})`}>
                {/* Section 1 */}
                <rect x="24" y="24" width={mainWidth * 0.35} height="6" rx="3" fill={template.accentColor} />
                <rect x="24" y="42" width={mainWidth - 48} height="4" rx="2" fill="#E5E7EB" />
                <rect x="24" y="54" width={(mainWidth - 48) * 0.9} height="4" rx="2" fill="#E5E7EB" />
                <rect x="24" y="66" width={(mainWidth - 48) * 0.85} height="4" rx="2" fill="#E5E7EB" />
                <rect x="24" y="78" width={(mainWidth - 48) * 0.4} height="4" rx="2" fill="#E5E7EB" />

                {/* Section 2 */}
                <rect x="24" y="110" width={mainWidth * 0.45} height="6" rx="3" fill={template.accentColor} />
                <rect x="24" y="128" width={mainWidth - 48} height="4" rx="2" fill="#E5E7EB" />
                <rect x="24" y="140" width={(mainWidth - 48) * 0.8} height="4" rx="2" fill="#E5E7EB" />
                <rect x="24" y="152" width={(mainWidth - 48) * 0.95} height="4" rx="2" fill="#E5E7EB" />
                <rect x="24" y="164" width={(mainWidth - 48) * 0.7} height="4" rx="2" fill="#E5E7EB" />

                {/* Section 3 */}
                <rect x="24" y="196" width={mainWidth * 0.25} height="6" rx="3" fill={template.accentColor} />
                <rect x="24" y="214" width={mainWidth - 48} height="4" rx="2" fill="#E5E7EB" />
                <rect x="24" y="226" width={(mainWidth - 48) * 0.6} height="4" rx="2" fill="#E5E7EB" />

                {/* Optional Infographic Skills */}
                {template.style === "infographic" && (
                    <g transform="translate(0, 256)">
                        <rect x="24" y="0" width={mainWidth * 0.4} height="6" rx="3" fill={template.accentColor} />

                        {/* Bar 1 */}
                        <rect x="24" y="18" width={(mainWidth - 48)} height="8" rx="4" fill="#E5E7EB" />
                        <rect x="24" y="18" width={(mainWidth - 48) * 0.85} height="8" rx="4" fill="#9CA3AF" />

                        {/* Bar 2 */}
                        <rect x="24" y="36" width={(mainWidth - 48)} height="8" rx="4" fill="#E5E7EB" />
                        <rect x="24" y="36" width={(mainWidth - 48) * 0.65} height="8" rx="4" fill="#9CA3AF" />

                        {/* Bar 3 */}
                        <rect x="24" y="54" width={(mainWidth - 48)} height="8" rx="4" fill="#E5E7EB" />
                        <rect x="24" y="54" width={(mainWidth - 48) * 0.75} height="8" rx="4" fill="#9CA3AF" />
                    </g>
                )}
            </g>
        </svg>
    );
}

export default function TemplatesPage() {
    return (
        <div className="relative min-h-screen" style={{ background: "#FFFFFF" }}>
            <div className="orb orb-1" />
            <div className="orb orb-2" />

            {/* Header */}
            <nav
                className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5"
                style={{
                    background: "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(12px)",
                    borderBottom: "1px solid #E5E7EB",
                }}
            >
                <Link href="/" className="flex items-center gap-2 group">
                    <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{
                            background: "var(--gradient-cool)",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        }}
                    >
                        <FileText size={18} className="text-white" />
                    </div>
                    <span className="font-bold text-lg tracking-tight" style={{ color: "#111827" }}>
                        Resume<span className="gradient-text">AI</span>
                    </span>
                </Link>
                <div className="flex items-center gap-4">
                    <Link
                        href="/"
                        className="flex items-center gap-1.5 text-sm transition-colors hover:text-gray-900"
                        style={{ color: "#4B5563" }}
                    >
                        <Home size={14} /> Home
                    </Link>
                    <Link
                        href="/dashboard"
                        className="text-sm font-medium transition-colors hover:text-gray-900"
                        style={{ color: "#4B5563" }}
                    >
                        My Resumes
                    </Link>
                    <Link href="/builder" className="btn-primary text-sm py-2.5 px-5">
                        Create Resume
                    </Link>
                </div>
            </nav>

            {/* Page Header */}
            <section className="relative z-10 text-center px-6 pt-14 pb-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-5"
                        style={{
                            background: "#F3F4F6",
                            border: "1px solid #E5E7EB",
                            color: "#6B7280",
                        }}
                    >
                        <Sparkles size={14} />
                        8 Professional Templates
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4" style={{ color: "#111827" }}>
                        Resume <span className="gradient-text">Templates</span>
                    </h1>
                    <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: "#4B5563" }}>
                        Choose from our collection of professionally designed templates.
                        Each is crafted to make your resume stand out and land interviews.
                    </p>
                </motion.div>
            </section>

            {/* Templates Grid */}
            <section className="relative z-10 px-6 md:px-12 pb-20 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {TEMPLATES.map((t, i) => (
                        <motion.div
                            key={t.id}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="template-card group"
                        >
                            {/* Preview */}
                            <div className="p-4 pb-2 overflow-hidden">
                                <div className="template-preview">
                                    <TemplatePreview template={t} />
                                </div>
                            </div>

                            {/* Info */}
                            <div className="px-4 pb-4">
                                <h3 className="text-base font-semibold mb-1" style={{ color: "#111827" }}>
                                    {t.name}
                                </h3>
                                <p className="text-xs leading-relaxed mb-3" style={{ color: "#6B7280" }}>
                                    {t.desc}
                                </p>
                                <Link
                                    href={`/builder?template=${t.id}`}
                                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all"
                                    style={{
                                        background: "#F3F4F6",
                                        color: "#374151",
                                        border: "1px solid #E5E7EB",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "var(--gradient-cool)";
                                        e.currentTarget.style.color = "white";
                                        e.currentTarget.style.borderColor = "#9CA3AF";
                                        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "#F3F4F6";
                                        e.currentTarget.style.color = "#374151";
                                        e.currentTarget.style.borderColor = "#E5E7EB";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}
                                >
                                    Use Template
                                    <ArrowRight size={14} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 px-6 md:px-12 pb-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto p-10 md:p-14 text-center rounded-2xl"
                    style={{
                        background: "#F8FAFC",
                        border: "1px solid #E5E7EB",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                    }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "#111827" }}>
                        Can&apos;t Decide? <span className="gradient-text">Let AI Help</span>
                    </h2>
                    <p className="text-base mb-6" style={{ color: "#4B5563" }}>
                        Start building your resume and try different templates in real time.
                        Switch templates anytime with a single click.
                    </p>
                    <Link
                        href="/builder"
                        className="btn-primary inline-flex items-center gap-2 text-base py-3.5 px-8"
                    >
                        Start Building Now
                        <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </section>

            {/* Footer */}
            <footer
                className="relative z-10 text-center py-8 text-sm"
                style={{
                    color: "#9CA3AF",
                    borderTop: "1px solid #E5E7EB",
                }}
            >
                © {new Date().getFullYear()} ResumeAI. Built with Next.js, Groq AI & Supabase.
            </footer>
        </div>
    );
}
