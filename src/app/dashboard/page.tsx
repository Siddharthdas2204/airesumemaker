"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
    FileText,
    Home,
    Plus,
    Trash2,
    Eye,
    Download,
    Loader2,
    FolderOpen,
    Calendar,
} from "lucide-react";
import Link from "next/link";

interface ResumeRow {
    id: string;
    title: string;
    full_name: string;
    template: string;
    generated_content: string;
    created_at: string;
}

export default function DashboardPage() {
    const [resumes, setResumes] = useState<ResumeRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [previewId, setPreviewId] = useState<string | null>(null);

    const fetchResumes = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/resumes");
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setResumes(data.resumes || []);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to load resumes");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchResumes();
    }, [fetchResumes]);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this resume?")) return;
        try {
            await fetch(`/api/resumes/${id}`, { method: "DELETE" });
            setResumes((prev) => prev.filter((r) => r.id !== id));
        } catch {
            alert("Delete failed");
        }
    };

    const handleDownload = async (resume: ResumeRow) => {
        const el = document.createElement("div");
        el.innerHTML = resume.generated_content;
        el.style.padding = "40px";
        el.style.background = "white";
        el.style.width = "800px";
        el.style.position = "fixed";
        el.style.left = "-9999px";
        document.body.appendChild(el);

        const html2canvas = (await import("html2canvas")).default;
        const { jsPDF } = await import("jspdf");

        const canvas = await html2canvas(el, { scale: 2, useCORS: true });
        document.body.removeChild(el);

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${resume.full_name || "resume"}.pdf`);
    };

    const previewResume = resumes.find((r) => r.id === previewId);

    const templateColors: Record<string, string> = {
        classic: "#6B7280",
        modern: "#4B5563",
        creative: "#9CA3AF",
        minimalist: "#374151",
        executive: "#1F2937",
        startup: "#6B7280",
        academic: "#4B5563",
        infographic: "#9CA3AF",
    };

    return (
        <div className="relative min-h-screen" style={{ background: "#FFFFFF" }}>
            <div className="orb orb-1" />
            <div className="orb orb-2" />

            {/* Header */}
            <header
                className="relative z-10 flex items-center justify-between px-6 py-4"
                style={{
                    background: "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(12px)",
                    borderBottom: "1px solid #E5E7EB",
                }}
            >
                <Link href="/" className="flex items-center gap-2">
                    <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{
                            background: "var(--gradient-cool)",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        }}
                    >
                        <FileText size={16} className="text-white" />
                    </div>
                    <span className="font-bold text-base" style={{ color: "#111827" }}>
                        Resume<span className="gradient-text">AI</span>
                    </span>
                </Link>
                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        className="flex items-center gap-1.5 text-sm transition-colors hover:text-gray-900"
                        style={{ color: "#4B5563" }}
                    >
                        <Home size={14} /> Home
                    </Link>
                    <Link
                        href="/builder"
                        className="btn-primary text-sm py-2 px-4 flex items-center gap-1.5"
                    >
                        <Plus size={14} /> New Resume
                    </Link>
                </div>
            </header>

            <div className="relative z-10 max-w-6xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold mb-2" style={{ color: "#111827" }}>
                    My <span className="gradient-text">Resumes</span>
                </h1>
                <p className="text-sm mb-8" style={{ color: "#4B5563" }}>
                    All your AI-generated resumes stored safely in the cloud.
                </p>

                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 size={32} className="animate-spin" style={{ color: "#9CA3AF" }} />
                    </div>
                )}

                {error && (
                    <div
                        className="p-4 rounded-2xl text-center text-sm mb-6"
                        style={{
                            background: "#FEF2F2",
                            border: "1px solid #FECACA",
                            color: "#DC2626",
                        }}
                    >
                        {error}
                        <p className="mt-1 text-xs" style={{ color: "#9CA3AF" }}>
                            Make sure your Supabase environment variables are configured in <code>.env.local</code>
                        </p>
                    </div>
                )}

                {!loading && !error && resumes.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="glass-card p-12 text-center"
                        style={{ background: "white" }}
                    >
                        <FolderOpen
                            size={48}
                            className="mx-auto mb-4"
                            style={{ color: "#D1D5DB" }}
                        />
                        <h3 className="text-lg font-medium mb-2" style={{ color: "#111827" }}>No resumes yet</h3>
                        <p className="text-sm mb-6" style={{ color: "#4B5563" }}>
                            Create your first AI-powered resume and it will appear here.
                        </p>
                        <Link
                            href="/builder"
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            <Plus size={16} /> Create Resume
                        </Link>
                    </motion.div>
                )}

                {!loading && resumes.length > 0 && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {resumes.map((resume, i) => (
                            <motion.div
                                key={resume.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="glass-card glass-card-hover overflow-hidden"
                                style={{ background: "white" }}
                            >
                                {/* Mini preview */}
                                <div
                                    className="h-40 overflow-hidden relative"
                                    style={{ background: "white" }}
                                >
                                    <div
                                        className="scale-[0.35] origin-top-left w-[285%] pointer-events-none"
                                        dangerouslySetInnerHTML={{ __html: resume.generated_content }}
                                    />
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background:
                                                "linear-gradient(to bottom, transparent 60%, white)",
                                        }}
                                    />
                                </div>

                                {/* Info */}
                                <div className="p-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-semibold text-sm truncate max-w-[200px]" style={{ color: "#111827" }}>
                                                {resume.title}
                                            </h3>
                                            <div
                                                className="flex items-center gap-1.5 mt-1 text-xs"
                                                style={{ color: "#9CA3AF" }}
                                            >
                                                <Calendar size={11} />
                                                {new Date(resume.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <span
                                            className="px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                                            style={{
                                                background: "#F3F4F6",
                                                color: templateColors[resume.template] || "#6B7280",
                                                border: "1px solid #E5E7EB",
                                            }}
                                        >
                                            {resume.template}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 mt-4">
                                        <button
                                            onClick={() => setPreviewId(resume.id)}
                                            className="btn-secondary flex-1 flex items-center justify-center gap-1.5 text-xs py-2"
                                        >
                                            <Eye size={12} /> Preview
                                        </button>
                                        <button
                                            onClick={() => handleDownload(resume)}
                                            className="btn-primary flex-1 flex items-center justify-center gap-1.5 text-xs py-2"
                                        >
                                            <Download size={12} /> PDF
                                        </button>
                                        <button
                                            onClick={() => handleDelete(resume.id)}
                                            className="p-2 rounded-xl transition-all"
                                            style={{
                                                color: "#EF4444",
                                                background: "#FEF2F2",
                                                border: "1px solid #FECACA",
                                            }}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Preview Modal */}
            {previewResume && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{
                        background: "rgba(17,24,39,0.5)",
                        backdropFilter: "blur(8px)",
                    }}
                    onClick={() => setPreviewId(null)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto p-2 md:p-4 rounded-2xl"
                        style={{
                            background: "white",
                            border: "1px solid #E5E7EB",
                            boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-3 px-2">
                            <h3 className="font-semibold" style={{ color: "#111827" }}>{previewResume.title}</h3>
                            <button
                                onClick={() => setPreviewId(null)}
                                className="btn-secondary text-xs py-1.5 px-3"
                            >
                                Close
                            </button>
                        </div>
                        <div
                            className="resume-page rounded-xl"
                            dangerouslySetInnerHTML={{ __html: previewResume.generated_content }}
                        />
                    </motion.div>
                </div>
            )}
        </div>
    );
}
