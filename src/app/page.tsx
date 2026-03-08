"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  FileText,
  Zap,
  ArrowRight,
  Database,
  Download,
  Star,
  Layout,
  BrainCircuit,
} from "lucide-react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

const features = [
  {
    icon: <BrainCircuit size={28} />,
    title: "AI-Powered Writing",
    desc: "Our AI enhances your experience descriptions with powerful action verbs and quantifiable achievements.",
    iconBg: "#F3F4F6",
    iconColor: "#4B5563",
  },
  {
    icon: <Layout size={28} />,
    title: "Multiple Templates",
    desc: "Choose from 8+ professional templates including Executive, Minimalist, and Creative — each designed for maximum impact.",
    iconBg: "#F3F4F6",
    iconColor: "#6B7280",
  },
  {
    icon: <Download size={28} />,
    title: "Instant PDF Export",
    desc: "Download your polished resume as a beautiful PDF with one click. Ready to send to recruiters.",
    iconBg: "#F3F4F6",
    iconColor: "#4B5563",
  },
  {
    icon: <Database size={28} />,
    title: "Cloud Storage",
    desc: "All resumes are securely saved to the cloud. Access and edit them anytime, anywhere.",
    iconBg: "#F3F4F6",
    iconColor: "#6B7280",
  },
  {
    icon: <Zap size={28} />,
    title: "Lightning Fast",
    desc: "Generate a professional resume in under 30 seconds. No signup required to get started.",
    iconBg: "#F3F4F6",
    iconColor: "#4B5563",
  },
  {
    icon: <Star size={28} />,
    title: "ATS-Friendly",
    desc: "Resumes are optimized for Applicant Tracking Systems so your application never gets filtered out.",
    iconBg: "#F3F4F6",
    iconColor: "#6B7280",
  },
];

const steps = [
  {
    num: "01",
    title: "Enter Your Details",
    desc: "Fill in your experience, education, and skills using our intuitive multi-step form.",
  },
  {
    num: "02",
    title: "Choose a Template",
    desc: "Pick from our growing library of 8+ unique templates — each crafted to make your resume stand out.",
  },
  {
    num: "03",
    title: "Generate with AI",
    desc: "Our AI transforms your input into a polished, professional resume in seconds.",
  },
  {
    num: "04",
    title: "Download & Apply",
    desc: "Export your resume as a PDF and start landing interviews immediately.",
  },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "#FFFFFF" }}>
      {/* Background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Navbar */}
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
            href="/templates"
            className="text-sm font-medium transition-colors hover:text-gray-900"
            style={{ color: "#4B5563" }}
          >
            Templates
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium transition-colors hover:text-gray-900"
            style={{ color: "#4B5563" }}
          >
            My Resumes
          </Link>
          <Link href="/builder" className="btn-primary text-sm py-2.5 px-5">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-16 pb-24 md:pt-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6"
          style={{
            background: "#F3F4F6",
            border: "1px solid #E5E7EB",
            color: "#6B7280",
          }}
        >
          <Sparkles size={14} />
          Powered by AI — Free to Use
        </motion.div>

        <motion.h1
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight max-w-4xl"
          style={{ color: "#111827" }}
        >
          Build Your{" "}
          <span className="gradient-text">Dream Resume</span>
          <br />
          in Seconds
        </motion.h1>

        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-5 text-base md:text-lg max-w-2xl"
          style={{ color: "#4B5563" }}
        >
          Let AI craft a stunning, professional resume from your details.
          Choose a template, generate in one click, and download your
          interview-winning resume instantly.
        </motion.p>

        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-8 flex flex-wrap gap-4 justify-center"
        >
          <Link
            href="/builder"
            className="btn-primary inline-flex items-center gap-2 text-base py-3.5 px-8"
          >
            Create My Resume
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/templates"
            className="btn-secondary inline-flex items-center gap-2 text-base py-3.5 px-8"
          >
            Browse Templates
          </Link>
        </motion.div>

        {/* Floating mockup card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 w-full max-w-3xl glass-card p-1 glow"
        >
          <div
            className="rounded-xl overflow-hidden"
            style={{ background: "#F8FAFC" }}
          >
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ borderBottom: "1px solid #E5E7EB" }}
            >
              <div className="w-3 h-3 rounded-full" style={{ background: "#FCA5A5" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#FCD34D" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#6EE7B7" }} />
              <span className="ml-3 text-xs" style={{ color: "#9CA3AF" }}>
                ResumeAI — Builder
              </span>
            </div>
            <div className="p-6 md:p-8 grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="h-3 rounded-full w-3/4" style={{ background: "var(--gradient-cool)" }} />
                <div className="h-2 rounded-full w-full" style={{ background: "#E5E7EB" }} />
                <div className="h-2 rounded-full w-5/6" style={{ background: "#E5E7EB" }} />
                <div className="h-2 rounded-full w-2/3" style={{ background: "#E5E7EB" }} />
                <div className="mt-4 h-3 rounded-full w-1/2" style={{ background: "var(--gradient-primary)" }} />
                <div className="h-2 rounded-full w-full" style={{ background: "#E5E7EB" }} />
                <div className="h-2 rounded-full w-4/5" style={{ background: "#E5E7EB" }} />
              </div>
              <div className="space-y-3">
                <div className="h-3 rounded-full w-2/3" style={{ background: "var(--gradient-cool)" }} />
                <div className="h-2 rounded-full w-full" style={{ background: "#E5E7EB" }} />
                <div className="h-2 rounded-full w-3/4" style={{ background: "#E5E7EB" }} />
                <div className="mt-4 h-3 rounded-full w-1/2" style={{ background: "var(--gradient-primary)" }} />
                <div className="h-2 rounded-full w-5/6" style={{ background: "#E5E7EB" }} />
                <div className="h-2 rounded-full w-full" style={{ background: "#E5E7EB" }} />
                <div className="h-2 rounded-full w-2/3" style={{ background: "#E5E7EB" }} />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 md:px-12 py-20" style={{ background: "#F8FAFC" }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#111827" }}>
            Everything You Need to{" "}
            <span className="gradient-text">Land the Job</span>
          </h2>
          <p className="mt-3 text-base" style={{ color: "#4B5563" }}>
            Professional tools that give your application the edge it deserves.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass-card glass-card-hover p-6 cursor-default"
              style={{ background: "white" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: f.iconBg, color: f.iconColor }}
              >
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: "#111827" }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#4B5563" }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 px-6 md:px-12 py-20" style={{ background: "#FFFFFF" }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#111827" }}>
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="mt-3 text-base" style={{ color: "#4B5563" }}>
            Four simple steps to your perfect resume
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass-card p-6 text-center relative overflow-hidden group"
            >
              <span
                className="text-5xl font-black absolute -top-1 -right-1 transition-opacity"
                style={{ fontSize: "5rem", color: "#E5E7EB", opacity: 0.3 }}
              >
                {s.num}
              </span>
              <div
                className="w-10 h-10 rounded-full mx-auto flex items-center justify-center text-sm font-bold mb-4"
                style={{
                  background: "var(--gradient-cool)",
                  color: "white",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                {s.num}
              </div>
              <h3 className="text-base font-semibold mb-2" style={{ color: "#111827" }}>{s.title}</h3>
              <p className="text-sm" style={{ color: "#4B5563" }}>
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 md:px-12 py-20" style={{ background: "#F8FAFC" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card glow max-w-3xl mx-auto p-10 md:p-14 text-center"
          style={{ background: "white" }}
        >
          <Sparkles
            size={36}
            className="mx-auto mb-4"
            style={{ color: "#9CA3AF" }}
          />
          <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "#111827" }}>
            Ready to Build Your{" "}
            <span className="gradient-text">Perfect Resume</span>?
          </h2>
          <p className="text-base mb-6" style={{ color: "#4B5563" }}>
            Join thousands who have already landed their dream jobs with
            AI-powered resumes. It&apos;s free — no signup needed.
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
          background: "#FFFFFF",
        }}
      >
        © {new Date().getFullYear()} ResumeAI. Built with Next.js, Groq AI & Supabase.
      </footer>
    </div>
  );
}
