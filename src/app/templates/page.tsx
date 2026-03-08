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

    return (
        <div
            className="w-full aspect-[3/4] rounded-lg overflow-hidden"
            style={{
                background: "white",
                border: "1px solid #E5E7EB",
                fontSize: "6px",
            }}
        >
            {/* Header area */}
            <div
                className="px-3 py-2.5"
                style={{
                    background: isGradient ? template.headerBg : template.headerBg,
                    borderBottom: template.style === "minimal" ? "1px solid #E5E7EB" : "none",
                }}
            >
                <div
                    className="h-2 rounded-full w-2/3 mb-1"
                    style={{ background: template.headerColor === "#FFFFFF" ? "rgba(255,255,255,0.9)" : "#111827" }}
                />
                <div
                    className="h-1 rounded-full w-1/2"
                    style={{ background: template.headerColor === "#FFFFFF" ? "rgba(255,255,255,0.5)" : "#9CA3AF" }}
                />
            </div>

            {/* Body */}
            <div className="flex h-full">
                {/* Optional sidebar */}
                {template.sidebarBg && (
                    <div className="w-1/3 p-2 space-y-1.5" style={{ background: template.sidebarBg }}>
                        <div className="h-1 rounded-full w-full" style={{ background: "rgba(255,255,255,0.4)" }} />
                        <div className="h-0.5 rounded-full w-4/5" style={{ background: "rgba(255,255,255,0.2)" }} />
                        <div className="h-0.5 rounded-full w-3/5" style={{ background: "rgba(255,255,255,0.2)" }} />
                        <div className="mt-2 h-1 rounded-full w-full" style={{ background: "rgba(255,255,255,0.4)" }} />
                        <div className="h-0.5 rounded-full w-4/5" style={{ background: "rgba(255,255,255,0.2)" }} />
                        <div className="h-0.5 rounded-full w-2/3" style={{ background: "rgba(255,255,255,0.2)" }} />
                    </div>
                )}

                {/* Main content */}
                <div className={`${template.sidebarBg ? "w-2/3" : "w-full"} p-2.5 space-y-2`}>
                    {/* Section 1 */}
                    <div>
                        <div className="h-1 rounded-full w-1/3 mb-1" style={{ background: template.accentColor }} />
                        <div className="h-0.5 rounded-full w-full mb-0.5" style={{ background: "#E5E7EB" }} />
                        <div className="h-0.5 rounded-full w-5/6 mb-0.5" style={{ background: "#E5E7EB" }} />
                        <div className="h-0.5 rounded-full w-4/5" style={{ background: "#E5E7EB" }} />
                    </div>
                    {/* Section 2 */}
                    <div>
                        <div className="h-1 rounded-full w-2/5 mb-1" style={{ background: template.accentColor }} />
                        <div className="h-0.5 rounded-full w-full mb-0.5" style={{ background: "#E5E7EB" }} />
                        <div className="h-0.5 rounded-full w-3/4 mb-0.5" style={{ background: "#E5E7EB" }} />
                        <div className="h-0.5 rounded-full w-5/6" style={{ background: "#E5E7EB" }} />
                    </div>
                    {/* Section 3 */}
                    <div>
                        <div className="h-1 rounded-full w-1/4 mb-1" style={{ background: template.accentColor }} />
                        <div className="h-0.5 rounded-full w-full mb-0.5" style={{ background: "#E5E7EB" }} />
                        <div className="h-0.5 rounded-full w-2/3" style={{ background: "#E5E7EB" }} />
                    </div>
                    {/* Section 4 - skill bars for infographic */}
                    {template.style === "infographic" && (
                        <div className="space-y-1">
                            <div className="h-1 rounded-full w-1/3 mb-1" style={{ background: template.accentColor }} />
                            <div className="h-1.5 rounded-full w-4/5" style={{ background: "#E5E7EB" }}>
                                <div className="h-full rounded-full w-4/5" style={{ background: "#9CA3AF" }} />
                            </div>
                            <div className="h-1.5 rounded-full w-4/5" style={{ background: "#E5E7EB" }}>
                                <div className="h-full rounded-full w-3/5" style={{ background: "#9CA3AF" }} />
                            </div>
                            <div className="h-1.5 rounded-full w-4/5" style={{ background: "#E5E7EB" }}>
                                <div className="h-full rounded-full w-2/3" style={{ background: "#9CA3AF" }} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
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
