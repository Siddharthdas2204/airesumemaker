"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    Briefcase,
    GraduationCap,
    Wrench,
    ArrowRight,
    ArrowLeft,
    Sparkles,
    Download,
    Save,
    FileText,
    Check,
    Loader2,
    Plus,
    Trash2,
    Home,
    Linkedin,
    Globe,
} from "lucide-react";
import Link from "next/link";
import { generatePortfolioHTML } from "@/lib/portfolio-template";
import AIFeatures from "@/components/AIFeatures";
import {
    ResumeData,
    PersonalInfo,
    Experience,
    Education,
    SkillsAndExtras,
} from "@/lib/types";

const STEPS = [
    { id: 0, label: "Personal", icon: <User size={16} /> },
    { id: 1, label: "Experience", icon: <Briefcase size={16} /> },
    { id: 2, label: "Education", icon: <GraduationCap size={16} /> },
    { id: 3, label: "Skills", icon: <Wrench size={16} /> },
];

const TEMPLATES = [
    { id: "classic", label: "Classic", desc: "Traditional & ATS-friendly" },
    { id: "modern", label: "Modern", desc: "Sidebar layout with flair" },
    { id: "creative", label: "Creative", desc: "Bold gradients & typography" },
    { id: "minimalist", label: "Minimalist", desc: "Clean, spacious, focus on content" },
    { id: "executive", label: "Executive", desc: "Professional, structured, for senior roles" },
    { id: "startup", label: "Startup", desc: "Vibrant, agile, tech-focused" },
    { id: "academic", label: "Academic (CV)", desc: "Detailed, formal, publication-ready" },
    { id: "infographic", label: "Infographic", desc: "Visual, data-driven, unique" },
];

const VALID_TEMPLATE_IDS = TEMPLATES.map((t) => t.id);

function uid() {
    return Math.random().toString(36).slice(2, 10);
}

function BuilderContent() {
    const searchParams = useSearchParams();
    const [step, setStep] = useState(0);
    const [template, setTemplate] = useState("classic");

    // Pre-select template from URL query param (e.g. /builder?template=executive)
    useEffect(() => {
        const tpl = searchParams.get("template");
        if (tpl && VALID_TEMPLATE_IDS.includes(tpl)) {
            setTemplate(tpl);
        }
    }, [searchParams]);
    const [generating, setGenerating] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [generatedHTML, setGeneratedHTML] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [personal, setPersonal] = useState<PersonalInfo>({
        fullName: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        portfolio: "",
        summary: "",
    });

    const [experiences, setExperiences] = useState<Experience[]>([
        { id: uid(), company: "", role: "", startDate: "", endDate: "", description: "" },
    ]);

    const [education, setEducation] = useState<Education[]>([
        { id: uid(), institution: "", degree: "", field: "", startDate: "", endDate: "", gpa: "" },
    ]);

    const [skillsAndExtras, setSkillsAndExtras] = useState<SkillsAndExtras>({
        skills: "",
        certifications: "",
        languages: "",
        hobbies: "",
    });

    const resumeData: ResumeData = { personal, experiences, education, skillsAndExtras };

    // ─── handlers ───
    const addExperience = () =>
        setExperiences((prev) => [
            ...prev,
            { id: uid(), company: "", role: "", startDate: "", endDate: "", description: "" },
        ]);

    const removeExperience = (id: string) =>
        setExperiences((prev) => prev.filter((e) => e.id !== id));

    const updateExperience = (id: string, field: keyof Experience, value: string) =>
        setExperiences((prev) =>
            prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
        );

    const addEducation = () =>
        setEducation((prev) => [
            ...prev,
            { id: uid(), institution: "", degree: "", field: "", startDate: "", endDate: "", gpa: "" },
        ]);

    const removeEducation = (id: string) =>
        setEducation((prev) => prev.filter((e) => e.id !== id));

    const updateEducation = (id: string, field: keyof Education, value: string) =>
        setEducation((prev) =>
            prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
        );

    // ─── generate ───
    const handleGenerate = async () => {
        setGenerating(true);
        setError(null);
        setGeneratedHTML(null);
        try {
            const res = await fetch("/api/generate-resume", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resumeData, template }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Generation failed");
            setGeneratedHTML(data.content);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setGenerating(false);
        }
    };

    // ─── save to Supabase ───
    const handleSave = async () => {
        if (!generatedHTML) return;
        setSaving(true);
        setSaved(false);
        try {
            const res = await fetch("/api/resumes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: `${personal.fullName || "Untitled"}'s Resume`,
                    full_name: personal.fullName,
                    email: personal.email,
                    raw_input: resumeData,
                    generated_content: generatedHTML,
                    template,
                }),
            });
            if (!res.ok) throw new Error("Failed to save");
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch {
            setError("Failed to save resume. Check your Supabase configuration.");
        } finally {
            setSaving(false);
        }
    };

    // ─── PDF download ───
    const handleDownload = async () => {
        const el = document.getElementById("resume-preview-content");
        if (!el) return;

        const html2canvas = (await import("html2canvas")).default;
        const { jsPDF } = await import("jspdf");

        const canvas = await html2canvas(el, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${personal.fullName || "resume"}.pdf`);
    };

    // ─── render steps ───
    const renderStep = () => {
        switch (step) {
            case 0:
                return <PersonalStep data={personal} onChange={setPersonal} />;
            case 1:
                return (
                    <ExperienceStep
                        data={experiences}
                        onUpdate={updateExperience}
                        onAdd={addExperience}
                        onRemove={removeExperience}
                    />
                );
            case 2:
                return (
                    <EducationStep
                        data={education}
                        onUpdate={updateEducation}
                        onAdd={addEducation}
                        onRemove={removeEducation}
                    />
                );
            case 3:
                return <SkillsStep data={skillsAndExtras} onChange={setSkillsAndExtras} />;
            default:
                return null;
        }
    };

    return (
        <div className="relative min-h-screen">
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
                <Link
                    href="/"
                    className="flex items-center gap-1.5 text-sm transition-colors hover:text-gray-900"
                    style={{ color: "#4B5563" }}
                >
                    <Home size={14} /> Home
                </Link>
            </header>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
                {/* If we have generated content, show the result view */}
                {generatedHTML ? (
                    <ResultView
                        html={generatedHTML}
                        onBack={() => setGeneratedHTML(null)}
                        onSave={handleSave}
                        onDownload={handleDownload}
                        saving={saving}
                        saved={saved}
                        error={error}
                        name={personal.fullName}
                        resumeData={resumeData}
                    />
                ) : (
                    <>
                        {/* LinkedIn Importer above Personal step */}
                        {step === 0 && (
                            <LinkedInImport
                                onImport={(data) => {
                                    setPersonal(data.personal);
                                    setExperiences(data.experiences);
                                    setEducation(data.education);
                                    setSkillsAndExtras(data.skillsAndExtras);
                                }}
                            />
                        )}

                        {/* Step Indicator */}
                        <div className="flex items-center justify-center gap-2 mb-10">
                            {STEPS.map((s, i) => (
                                <div key={s.id} className="flex items-center gap-2">
                                    <button
                                        onClick={() => setStep(s.id)}
                                        className={`step-dot ${step === s.id
                                            ? "step-dot-active"
                                            : step > s.id
                                                ? "step-dot-complete"
                                                : "step-dot-inactive"
                                            }`}
                                        title={s.label}
                                    >
                                        {step > s.id ? <Check size={14} /> : s.icon}
                                    </button>
                                    {i < STEPS.length - 1 && (
                                        <div
                                            className={`step-line w-8 md:w-16 ${step > s.id ? "step-line-active" : ""
                                                }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Step title */}
                        <h2
                            className="text-center text-xl font-semibold mb-6"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            {STEPS[step].label} Details
                        </h2>

                        {/* Form Step Content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.3 }}
                                className="glass-card p-6 md:p-8 max-w-3xl mx-auto"
                            >
                                {renderStep()}
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="flex items-center justify-between max-w-3xl mx-auto mt-6">
                            <button
                                onClick={() => setStep((s) => Math.max(0, s - 1))}
                                disabled={step === 0}
                                className="btn-secondary flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <ArrowLeft size={16} /> Back
                            </button>

                            {step < 3 ? (
                                <button
                                    onClick={() => setStep((s) => s + 1)}
                                    className="btn-primary flex items-center gap-2"
                                >
                                    Next <ArrowRight size={16} />
                                </button>
                            ) : (
                                <div className="flex flex-col sm:flex-row items-end md:items-center gap-3">
                                    {/* Template Selector */}
                                    <div className="flex flex-wrap justify-end gap-2 max-w-[500px]">
                                        {TEMPLATES.map((t) => (
                                            <button
                                                key={t.id}
                                                onClick={() => setTemplate(t.id)}
                                                className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
                                                style={{
                                                    background:
                                                        template === t.id
                                                            ? "var(--gradient-cool)"
                                                            : "white",
                                                    color:
                                                        template === t.id
                                                            ? "white"
                                                            : "#4B5563",
                                                    border: `1px solid ${template === t.id
                                                        ? "#9CA3AF"
                                                        : "#E5E7EB"
                                                        }`,
                                                    boxShadow: template === t.id
                                                        ? "0 2px 8px rgba(0,0,0,0.08)"
                                                        : "none",
                                                }}
                                                title={t.desc}
                                            >
                                                {t.label}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={handleGenerate}
                                        disabled={generating}
                                        className="btn-primary flex items-center gap-2"
                                    >
                                        {generating ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                Generating…
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles size={16} />
                                                Generate Resume
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>

                        {error && (
                            <div
                                className="max-w-3xl mx-auto mt-4 p-3 rounded-2xl text-sm text-center"
                                style={{
                                    background: "#FEF2F2",
                                    border: "1px solid #FECACA",
                                    color: "#DC2626",
                                }}
                            >
                                {error}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default function BuilderPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <BuilderContent />
        </Suspense>
    );
}

// ═══════════════════════════════════════════
// Sub-components
// ═══════════════════════════════════════════

function LinkedInImport({ onImport }: { onImport: (data: ResumeData) => void }) {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleImport = async () => {
        if (!url.includes("linkedin.com")) {
            setError("Please enter a valid LinkedIn URL (e.g. https://linkedin.com/in/username)");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/parse-linkedin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url })
            });
            const data = await res.json();
            if (res.ok && data.personal) {
                onImport(data);
                setUrl("");
            } else {
                setError(data.error || "Failed to parse LinkedIn profile");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-card p-6 mb-8 w-full max-w-3xl mx-auto text-center" style={{ border: "1px dashed #9CA3AF" }}>
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                <Linkedin size={18} style={{ color: "#2563EB" }} /> Fast-Track: Import from LinkedIn
            </h3>
            <p className="text-sm text-gray-500 mb-4 max-w-xl mx-auto">
                Paste your LinkedIn profile URL below and our AI will extract your information to automatically fill out your resume details.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto">
                <input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="form-input w-full"
                />
                <button
                    onClick={handleImport}
                    disabled={loading || !url}
                    className="btn-primary whitespace-nowrap px-6"
                >
                    {loading ? <Loader2 size={16} className="animate-spin inline mr-2" /> : "Import Profile"}
                </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </div>
    );
}

function PersonalStep({
    data,
    onChange,
}: {
    data: PersonalInfo;
    onChange: (d: PersonalInfo) => void;
}) {
    const set = (field: keyof PersonalInfo, val: string) =>
        onChange({ ...data, [field]: val });
    return (
        <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
                <label className="form-label">Full Name *</label>
                <input
                    className="form-input"
                    placeholder="John Doe"
                    value={data.fullName}
                    onChange={(e) => set("fullName", e.target.value)}
                />
            </div>
            <div>
                <label className="form-label">Email *</label>
                <input
                    className="form-input"
                    type="email"
                    placeholder="john@example.com"
                    value={data.email}
                    onChange={(e) => set("email", e.target.value)}
                />
            </div>
            <div>
                <label className="form-label">Phone</label>
                <input
                    className="form-input"
                    placeholder="+1 (555) 123-4567"
                    value={data.phone}
                    onChange={(e) => set("phone", e.target.value)}
                />
            </div>
            <div>
                <label className="form-label">Location</label>
                <input
                    className="form-input"
                    placeholder="San Francisco, CA"
                    value={data.location}
                    onChange={(e) => set("location", e.target.value)}
                />
            </div>
            <div>
                <label className="form-label">LinkedIn URL</label>
                <input
                    className="form-input"
                    placeholder="linkedin.com/in/johndoe"
                    value={data.linkedin}
                    onChange={(e) => set("linkedin", e.target.value)}
                />
            </div>
            <div className="sm:col-span-2">
                <label className="form-label">Portfolio / Website</label>
                <input
                    className="form-input"
                    placeholder="yourportfolio.com"
                    value={data.portfolio}
                    onChange={(e) => set("portfolio", e.target.value)}
                />
            </div>
            <div className="sm:col-span-2">
                <label className="form-label">Professional Summary</label>
                <textarea
                    className="form-input"
                    rows={4}
                    placeholder="Brief summary of your professional background, or leave blank for AI to generate one…"
                    value={data.summary}
                    onChange={(e) => set("summary", e.target.value)}
                />
            </div>
        </div>
    );
}

function ExperienceStep({
    data,
    onUpdate,
    onAdd,
    onRemove,
}: {
    data: Experience[];
    onUpdate: (id: string, field: keyof Experience, value: string) => void;
    onAdd: () => void;
    onRemove: (id: string) => void;
}) {
    return (
        <div className="space-y-6">
            {data.map((exp, idx) => (
                <div
                    key={exp.id}
                    className="p-4 rounded-2xl space-y-3"
                    style={{
                        background: "white",
                        border: "1px solid #E5E7EB",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                    }}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium" style={{ color: "var(--color-accent-light)" }}>
                            Experience {idx + 1}
                        </span>
                        {data.length > 1 && (
                            <button
                                onClick={() => onRemove(exp.id)}
                                className="p-1.5 rounded-lg hover:bg-red-500/10 transition"
                                style={{ color: "var(--color-danger)" }}
                            >
                                <Trash2 size={14} />
                            </button>
                        )}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                            <label className="form-label">Company</label>
                            <input
                                className="form-input"
                                placeholder="Google"
                                value={exp.company}
                                onChange={(e) => onUpdate(exp.id, "company", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="form-label">Role / Title</label>
                            <input
                                className="form-input"
                                placeholder="Software Engineer"
                                value={exp.role}
                                onChange={(e) => onUpdate(exp.id, "role", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="form-label">Start Date</label>
                            <input
                                className="form-input"
                                placeholder="Jan 2022"
                                value={exp.startDate}
                                onChange={(e) => onUpdate(exp.id, "startDate", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="form-label">End Date</label>
                            <input
                                className="form-input"
                                placeholder="Present"
                                value={exp.endDate}
                                onChange={(e) => onUpdate(exp.id, "endDate", e.target.value)}
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-input"
                                rows={3}
                                placeholder="Brief description of responsibilities and achievements…"
                                value={exp.description}
                                onChange={(e) => onUpdate(exp.id, "description", e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ))}
            <button
                onClick={onAdd}
                className="btn-secondary w-full flex items-center justify-center gap-2 text-sm"
            >
                <Plus size={14} /> Add Another Experience
            </button>
        </div>
    );
}

function EducationStep({
    data,
    onUpdate,
    onAdd,
    onRemove,
}: {
    data: Education[];
    onUpdate: (id: string, field: keyof Education, value: string) => void;
    onAdd: () => void;
    onRemove: (id: string) => void;
}) {
    return (
        <div className="space-y-6">
            {data.map((edu, idx) => (
                <div
                    key={edu.id}
                    className="p-4 rounded-xl space-y-3"
                    style={{
                        background: "var(--color-bg-secondary)",
                        border: "1px solid var(--color-border)",
                    }}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium" style={{ color: "var(--color-accent-light)" }}>
                            Education {idx + 1}
                        </span>
                        {data.length > 1 && (
                            <button
                                onClick={() => onRemove(edu.id)}
                                className="p-1.5 rounded-lg hover:bg-red-500/10 transition"
                                style={{ color: "var(--color-danger)" }}
                            >
                                <Trash2 size={14} />
                            </button>
                        )}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <div className="sm:col-span-2">
                            <label className="form-label">Institution</label>
                            <input
                                className="form-input"
                                placeholder="Stanford University"
                                value={edu.institution}
                                onChange={(e) => onUpdate(edu.id, "institution", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="form-label">Degree</label>
                            <input
                                className="form-input"
                                placeholder="Bachelor of Science"
                                value={edu.degree}
                                onChange={(e) => onUpdate(edu.id, "degree", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="form-label">Field of Study</label>
                            <input
                                className="form-input"
                                placeholder="Computer Science"
                                value={edu.field}
                                onChange={(e) => onUpdate(edu.id, "field", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="form-label">Start Date</label>
                            <input
                                className="form-input"
                                placeholder="Sep 2018"
                                value={edu.startDate}
                                onChange={(e) => onUpdate(edu.id, "startDate", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="form-label">End Date</label>
                            <input
                                className="form-input"
                                placeholder="Jun 2022"
                                value={edu.endDate}
                                onChange={(e) => onUpdate(edu.id, "endDate", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="form-label">GPA (optional)</label>
                            <input
                                className="form-input"
                                placeholder="3.8 / 4.0"
                                value={edu.gpa}
                                onChange={(e) => onUpdate(edu.id, "gpa", e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ))}
            <button
                onClick={onAdd}
                className="btn-secondary w-full flex items-center justify-center gap-2 text-sm"
            >
                <Plus size={14} /> Add Another Education
            </button>
        </div>
    );
}

function SkillsStep({
    data,
    onChange,
}: {
    data: SkillsAndExtras;
    onChange: (d: SkillsAndExtras) => void;
}) {
    const set = (field: keyof SkillsAndExtras, val: string) =>
        onChange({ ...data, [field]: val });
    return (
        <div className="space-y-4">
            <div>
                <label className="form-label">Technical & Soft Skills</label>
                <textarea
                    className="form-input"
                    rows={3}
                    placeholder="e.g. React, TypeScript, Node.js, Leadership, Communication…"
                    value={data.skills}
                    onChange={(e) => set("skills", e.target.value)}
                />
            </div>
            <div>
                <label className="form-label">Certifications</label>
                <textarea
                    className="form-input"
                    rows={2}
                    placeholder="e.g. AWS Certified Developer, Google Analytics Certified…"
                    value={data.certifications}
                    onChange={(e) => set("certifications", e.target.value)}
                />
            </div>
            <div>
                <label className="form-label">Languages</label>
                <input
                    className="form-input"
                    placeholder="e.g. English (Native), Spanish (Conversational)…"
                    value={data.languages}
                    onChange={(e) => set("languages", e.target.value)}
                />
            </div>
            <div>
                <label className="form-label">Hobbies / Interests (optional)</label>
                <input
                    className="form-input"
                    placeholder="e.g. Open-source, Hiking, Photography…"
                    value={data.hobbies}
                    onChange={(e) => set("hobbies", e.target.value)}
                />
            </div>
        </div>
    );
}

function ResultView({
    html,
    onBack,
    onSave,
    onDownload,
    saving,
    saved,
    error,
    name,
    resumeData,
}: {
    html: string;
    onBack: () => void;
    onSave: () => void;
    onDownload: () => void;
    saving: boolean;
    saved: boolean;
    error: string | null;
    name: string;
    resumeData: ResumeData;
}) {
    const [viewMode, setViewMode] = useState<"resume" | "portfolio">("resume");
    const [portfolioHtml, setPortfolioHtml] = useState<string | null>(null);

    const handleTogglePortfolio = () => {
        if (viewMode === "resume") {
            const compiledHtml = generatePortfolioHTML(resumeData);
            setPortfolioHtml(compiledHtml);
            setViewMode("portfolio");
        } else {
            setViewMode("resume");
        }
    };

    const handleDownloadPortfolio = () => {
        if (!portfolioHtml) return;
        const blob = new Blob([portfolioHtml], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${name.replace(/\s+/g, "_")}_Portfolio.html`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <button onClick={onBack} className="btn-secondary flex items-center gap-2">
                    <ArrowLeft size={16} /> Edit Details
                </button>
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold gradient-text">{name}&apos;s {viewMode === "resume" ? "Resume" : "Portfolio"}</h2>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleTogglePortfolio}
                        className="btn-secondary flex items-center gap-2"
                        style={{ border: "1px solid #C0C0C0" }}
                    >
                        <Globe size={14} /> {viewMode === "resume" ? "Generate Portfolio Website" : "Back to Resume"}
                    </button>

                    {viewMode === "resume" ? (
                        <>
                            <button
                                onClick={onSave}
                                disabled={saving}
                                className="btn-secondary flex items-center gap-2"
                            >
                                {saving ? (
                                    <Loader2 size={14} className="animate-spin" />
                                ) : saved ? (
                                    <Check size={14} style={{ color: "var(--color-success)" }} />
                                ) : (
                                    <Save size={14} />
                                )}
                                {saved ? "Saved!" : "Save to Cloud"}
                            </button>
                            <button onClick={onDownload} className="btn-primary flex items-center gap-2">
                                <Download size={14} /> Download PDF
                            </button>
                        </>
                    ) : (
                        <button onClick={handleDownloadPortfolio} className="btn-primary flex items-center gap-2 bg-gray-900 text-white border-0 hover:bg-gray-800">
                            <Download size={14} /> Download HTML
                        </button>
                    )}
                </div>
            </div>

            {error && (
                <div
                    className="mb-4 p-3 rounded-2xl text-sm text-center"
                    style={{
                        background: "#FEF2F2",
                        border: "1px solid #FECACA",
                        color: "#DC2626",
                    }}
                >
                    {error}
                </div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-2 md:p-4 max-w-4xl mx-auto"
            >
                {viewMode === "resume" ? (
                    <div
                        id="resume-preview-content"
                        className="resume-page rounded-lg shadow-xl"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                ) : (
                    <div className="w-full h-full rounded-lg shadow-xl overflow-hidden" style={{ minHeight: "800px" }}>
                        <iframe
                            srcDoc={portfolioHtml || ""}
                            className="w-full h-full border-0"
                            style={{ minHeight: "800px", background: "white" }}
                            title="Portfolio Preview"
                        />
                    </div>
                )}
            </motion.div>

            {/* AI Enhancements Area */}
            <div className="max-w-4xl mx-auto">
                <AIFeatures resumeData={resumeData} />
            </div>
        </div>
    );
}
