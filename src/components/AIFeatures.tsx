"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Activity,
    CheckCircle,
    Target,
    MessageSquare,
    Loader2,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

export default function AIFeatures({ resumeData }: { resumeData: any }) {
    const [activeTab, setActiveTab] = useState<string | null>(null);

    // Feature 1: Resume Score Analyzer
    const [scoreData, setScoreData] = useState<any>(null);
    const [loadingScore, setLoadingScore] = useState(false);

    // Feature 2: ATS Checker
    const [atsData, setAtsData] = useState<any>(null);
    const [loadingAts, setLoadingAts] = useState(false);

    // Feature 3: Resume Optimizer
    const [jobDescription, setJobDescription] = useState("");
    const [optimizeData, setOptimizeData] = useState<any>(null);
    const [loadingOptimize, setLoadingOptimize] = useState(false);

    // Feature 4: Mock Interview
    const [interviewData, setInterviewData] = useState<any>(null);
    const [loadingInterview, setLoadingInterview] = useState(false);

    const toggleTab = (tab: string) => {
        setActiveTab(activeTab === tab ? null : tab);
    };

    const handleAnalyze = async () => {
        setLoadingScore(true);
        try {
            const res = await fetch("/api/analyze-resume", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resumeData })
            });
            const data = await res.json();
            setScoreData(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingScore(false);
        }
    };

    const handleAtsCheck = async () => {
        setLoadingAts(true);
        try {
            const res = await fetch("/api/ats-check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resumeData })
            });
            const data = await res.json();
            setAtsData(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingAts(false);
        }
    };

    const handleOptimize = async () => {
        if (!jobDescription) return;
        setLoadingOptimize(true);
        try {
            const res = await fetch("/api/optimize-resume", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resumeData, jobDescription })
            });
            const data = await res.json();
            setOptimizeData(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingOptimize(false);
        }
    };

    const handleGenerateInterview = async () => {
        setLoadingInterview(true);
        try {
            const res = await fetch("/api/mock-interview", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resumeData })
            });
            const data = await res.json();
            setInterviewData(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingInterview(false);
        }
    };

    return (
        <div className="w-full mt-10 space-y-4">
            <h3 className="text-xl font-bold gradient-text mb-6">AI Enhancements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Score Analyzer Card */}
                <div className="glass-card p-5" style={{ border: "1px solid #E5E7EB" }}>
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleTab("score")}
                    >
                        <div className="flex items-center gap-2 font-semibold">
                            <Activity size={18} className="text-blue-500" /> AI Resume Score
                        </div>
                        {activeTab === "score" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>

                    <AnimatePresence>
                        {activeTab === "score" && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden mt-4"
                            >
                                {!scoreData ? (
                                    <button
                                        onClick={handleAnalyze}
                                        disabled={loadingScore}
                                        className="btn-primary w-full flex items-center justify-center gap-2"
                                    >
                                        {loadingScore ? <Loader2 className="animate-spin" size={16} /> : <Activity size={16} />}
                                        Analyze Resume
                                    </button>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-blue-50">
                                                <span className="text-blue-600 font-bold text-lg">{scoreData.score}/100</span>
                                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 36 36">
                                                    <path
                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        fill="none" stroke="#E5E7EB" strokeWidth="3"
                                                    />
                                                    <path
                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        fill="none" stroke="#3B82F6" strokeWidth="3"
                                                        strokeDasharray={`${scoreData.score}, 100`}
                                                    />
                                                </svg>
                                            </div>
                                            <p className="text-sm text-gray-600">Based on keyword optimization, skill relevance, grammar, and formatting.</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm mb-2 text-gray-800">Improvement Suggestions:</h4>
                                            <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700">
                                                {scoreData.suggestions?.map((o: string, i: number) => <li key={i}>{o}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* 2. ATS Compatibility Checker */}
                <div className="glass-card p-5" style={{ border: "1px solid #E5E7EB" }}>
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleTab("ats")}
                    >
                        <div className="flex items-center gap-2 font-semibold">
                            <CheckCircle size={18} className="text-green-500" /> ATS Compatibility Checker
                        </div>
                        {activeTab === "ats" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>

                    <AnimatePresence>
                        {activeTab === "ats" && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden mt-4"
                            >
                                {!atsData ? (
                                    <button
                                        onClick={handleAtsCheck}
                                        disabled={loadingAts}
                                        className="btn-primary flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 border-none text-white"
                                    >
                                        {loadingAts ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle size={16} />}
                                        Check ATS Compatibility
                                    </button>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-green-50">
                                                <span className="text-green-600 font-bold text-lg">{atsData.score}%</span>
                                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 36 36">
                                                    <path
                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        fill="none" stroke="#E5E7EB" strokeWidth="3"
                                                    />
                                                    <path
                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        fill="none" stroke="#22C55E" strokeWidth="3"
                                                        strokeDasharray={`${atsData.score}, 100`}
                                                    />
                                                </svg>
                                            </div>
                                            <p className="text-sm text-gray-600">Likelihood of parsing correctly through Applicant Tracking Systems.</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm mb-2 text-gray-800">ATS Insights:</h4>
                                            <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700">
                                                {atsData.suggestions?.map((o: string, i: number) => <li key={i}>{o}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* 3. Resume Optimizer */}
                <div className="glass-card p-5" style={{ border: "1px solid #E5E7EB" }}>
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleTab("optimize")}
                    >
                        <div className="flex items-center gap-2 font-semibold">
                            <Target size={18} className="text-purple-500" /> Resume Optimizer
                        </div>
                        {activeTab === "optimize" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>

                    <AnimatePresence>
                        {activeTab === "optimize" && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden mt-4"
                            >
                                <textarea
                                    className="form-input w-full text-sm mb-3"
                                    rows={3}
                                    placeholder="Paste job description here to tailor your resume..."
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                />
                                <button
                                    onClick={handleOptimize}
                                    disabled={loadingOptimize || !jobDescription}
                                    className="btn-primary w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 border-none text-white"
                                >
                                    {loadingOptimize ? <Loader2 className="animate-spin" size={16} /> : <Target size={16} />}
                                    Optimize Resume
                                </button>

                                {optimizeData && (
                                    <div className="mt-4 space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                        {optimizeData.keywords?.length > 0 && (
                                            <div>
                                                <h4 className="font-semibold text-sm mb-1 text-gray-800">Keywords to Add:</h4>
                                                <div className="flex flex-wrap gap-1">
                                                    {optimizeData.keywords.map((k: string, i: number) => (
                                                        <span key={i} className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded border border-purple-200">{k}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {optimizeData.skillAdditions?.length > 0 && (
                                            <div>
                                                <h4 className="font-semibold text-sm mb-1 text-gray-800">Suggested Skills:</h4>
                                                <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700">
                                                    {optimizeData.skillAdditions.map((k: string, i: number) => <li key={i}>{k}</li>)}
                                                </ul>
                                            </div>
                                        )}
                                        {optimizeData.bulletImprovements?.length > 0 && (
                                            <div>
                                                <h4 className="font-semibold text-sm mb-1 text-gray-800">Bullet Improvements:</h4>
                                                <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700">
                                                    {optimizeData.bulletImprovements.map((k: string, i: number) => <li key={i}>{k}</li>)}
                                                </ul>
                                            </div>
                                        )}
                                        {optimizeData.experienceImprovements?.length > 0 && (
                                            <div>
                                                <h4 className="font-semibold text-sm mb-1 text-gray-800">Experience Strategy:</h4>
                                                <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700">
                                                    {optimizeData.experienceImprovements.map((k: string, i: number) => <li key={i}>{k}</li>)}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* 4. Mock Interview Generator */}
                <div className="glass-card p-5" style={{ border: "1px solid #E5E7EB" }}>
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleTab("interview")}
                    >
                        <div className="flex items-center gap-2 font-semibold">
                            <MessageSquare size={18} className="text-orange-500" /> AI Mock Interview Prepper
                        </div>
                        {activeTab === "interview" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>

                    <AnimatePresence>
                        {activeTab === "interview" && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden mt-4"
                            >
                                {!interviewData ? (
                                    <button
                                        onClick={handleGenerateInterview}
                                        disabled={loadingInterview}
                                        className="btn-primary w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 border-none text-white"
                                    >
                                        {loadingInterview ? <Loader2 className="animate-spin" size={16} /> : <MessageSquare size={16} />}
                                        Generate Interview Questions
                                    </button>
                                ) : (
                                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                        <p className="text-sm text-gray-600 mb-2">Practice these questions based on your resume data.</p>

                                        {interviewData.technical?.length > 0 && (
                                            <div>
                                                <h4 className="font-semibold text-sm mb-1 text-gray-800">Technical / Skills</h4>
                                                <ul className="list-decimal pl-5 text-sm space-y-1 text-gray-700">
                                                    {interviewData.technical.map((q: string, i: number) => <li key={i}>{q}</li>)}
                                                </ul>
                                            </div>
                                        )}
                                        {interviewData.behavioral?.length > 0 && (
                                            <div className="mt-3">
                                                <h4 className="font-semibold text-sm mb-1 text-gray-800">Behavioral / Leadership</h4>
                                                <ul className="list-decimal pl-5 text-sm space-y-1 text-gray-700">
                                                    {interviewData.behavioral.map((q: string, i: number) => <li key={i}>{q}</li>)}
                                                </ul>
                                            </div>
                                        )}
                                        {interviewData.experienceBased?.length > 0 && (
                                            <div className="mt-3">
                                                <h4 className="font-semibold text-sm mb-1 text-gray-800">Experience / Projects</h4>
                                                <ul className="list-decimal pl-5 text-sm space-y-1 text-gray-700">
                                                    {interviewData.experienceBased.map((q: string, i: number) => <li key={i}>{q}</li>)}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
