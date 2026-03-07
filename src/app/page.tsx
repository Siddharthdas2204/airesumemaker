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
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    icon: <Layout size={28} />,
    title: "Multiple Templates",
    desc: "Choose from Classic, Modern, or Creative layouts — each designed by professionals for maximum impact.",
    gradient: "from-cyan-500 to-teal-500",
  },
  {
    icon: <Download size={28} />,
    title: "Instant PDF Export",
    desc: "Download your polished resume as a beautiful PDF with one click. Ready to send to recruiters.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: <Database size={28} />,
    title: "Cloud Storage",
    desc: "All resumes are securely saved to the cloud. Access and edit them anytime, anywhere.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: <Zap size={28} />,
    title: "Lightning Fast",
    desc: "Generate a professional resume in under 30 seconds. No signup required to get started.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: <Star size={28} />,
    title: "ATS-Friendly",
    desc: "Resumes are optimized for Applicant Tracking Systems so your application never gets filtered out.",
    gradient: "from-blue-500 to-sky-500",
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
    desc: "Pick from Classic, Modern, or Creative — each crafted to make your resume stand out.",
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
    <div className="relative min-h-screen overflow-hidden">
      {/* Background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5">
        <Link href="/" className="flex items-center gap-2 group">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: "var(--gradient-primary)" }}
          >
            <FileText size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            Resume<span className="gradient-text">AI</span>
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-sm font-medium hover:text-white/90 transition-colors"
            style={{ color: "var(--color-text-secondary)" }}
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
            background: "rgba(108,92,231,0.15)",
            border: "1px solid rgba(108,92,231,0.3)",
            color: "var(--color-accent-light)",
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
          style={{ color: "var(--color-text-secondary)" }}
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
            href="/dashboard"
            className="btn-secondary inline-flex items-center gap-2 text-base py-3.5 px-8"
          >
            View Saved Resumes
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
            style={{ background: "var(--color-bg-card)" }}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b"
              style={{ borderColor: "var(--color-border)" }}>
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs" style={{ color: "var(--color-text-muted)" }}>
                ResumeAI — Builder
              </span>
            </div>
            <div className="p-6 md:p-8 grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="h-3 rounded-full w-3/4" style={{ background: "var(--gradient-primary)" }} />
                <div className="h-2 rounded-full w-full" style={{ background: "var(--color-bg-elevated)" }} />
                <div className="h-2 rounded-full w-5/6" style={{ background: "var(--color-bg-elevated)" }} />
                <div className="h-2 rounded-full w-2/3" style={{ background: "var(--color-bg-elevated)" }} />
                <div className="mt-4 h-3 rounded-full w-1/2" style={{ background: "var(--gradient-cool)" }} />
                <div className="h-2 rounded-full w-full" style={{ background: "var(--color-bg-elevated)" }} />
                <div className="h-2 rounded-full w-4/5" style={{ background: "var(--color-bg-elevated)" }} />
              </div>
              <div className="space-y-3">
                <div className="h-3 rounded-full w-2/3" style={{ background: "var(--gradient-warm)" }} />
                <div className="h-2 rounded-full w-full" style={{ background: "var(--color-bg-elevated)" }} />
                <div className="h-2 rounded-full w-3/4" style={{ background: "var(--color-bg-elevated)" }} />
                <div className="mt-4 h-3 rounded-full w-1/2" style={{ background: "var(--gradient-primary)" }} />
                <div className="h-2 rounded-full w-5/6" style={{ background: "var(--color-bg-elevated)" }} />
                <div className="h-2 rounded-full w-full" style={{ background: "var(--color-bg-elevated)" }} />
                <div className="h-2 rounded-full w-2/3" style={{ background: "var(--color-bg-elevated)" }} />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 md:px-12 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Everything You Need to{" "}
            <span className="gradient-text">Land the Job</span>
          </h2>
          <p className="mt-3 text-base" style={{ color: "var(--color-text-secondary)" }}>
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
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white mb-4`}
              >
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 px-6 md:px-12 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="mt-3 text-base" style={{ color: "var(--color-text-secondary)" }}>
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
                className="text-5xl font-black absolute -top-1 -right-1 opacity-5 group-hover:opacity-10 transition-opacity"
                style={{ fontSize: "5rem" }}
              >
                {s.num}
              </span>
              <div
                className="w-10 h-10 rounded-full mx-auto flex items-center justify-center text-sm font-bold mb-4"
                style={{ background: "var(--gradient-primary)", color: "white" }}
              >
                {s.num}
              </div>
              <h3 className="text-base font-semibold mb-2">{s.title}</h3>
              <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 md:px-12 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card glow max-w-3xl mx-auto p-10 md:p-14 text-center"
        >
          <Sparkles
            size={36}
            className="mx-auto mb-4"
            style={{ color: "var(--color-accent-light)" }}
          />
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Ready to Build Your{" "}
            <span className="gradient-text">Perfect Resume</span>?
          </h2>
          <p className="text-base mb-6" style={{ color: "var(--color-text-secondary)" }}>
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
        className="relative z-10 text-center py-8 text-sm border-t"
        style={{
          color: "var(--color-text-muted)",
          borderColor: "var(--color-border)",
        }}
      >
        © {new Date().getFullYear()} ResumeAI. Built with Next.js, Groq AI & Supabase.
      </footer>
    </div>
  );
}
