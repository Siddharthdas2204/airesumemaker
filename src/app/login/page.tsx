"use client";

import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { LogIn, FileText, ArrowLeft, Star } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function LoginContent() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  const errorDetails = searchParams.get("details");
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      console.error("Login error:", error.message);
      alert("Failed to log in with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden" style={{ background: "#FFFFFF" }}>
      {/* Background Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-900"
        style={{ color: "#4B5563" }}
      >
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 glass-card p-10 md:p-14 text-center max-w-md w-full"
        style={{ background: "white" }}
      >
        <div
          className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-6"
          style={{
            background: "var(--gradient-cool)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
          }}
        >
          <FileText size={32} className="text-white" />
        </div>

        <h1 className="text-3xl font-bold mb-3" style={{ color: "#111827" }}>
          Welcome to <span className="gradient-text">ResumeAI</span>
        </h1>
        <p className="text-sm mb-6" style={{ color: "#4B5563" }}>
          Sign in to save your resumes, access advanced AI features, and manage your job applications.
        </p>

        {errorParam && (
          <div className="mb-6 p-4 rounded-xl text-sm border bg-red-50 border-red-200 text-red-600">
            <p className="font-bold mb-1">
              {errorParam === "auth-code-error" 
                ? "Authentication failed" 
                : errorParam === "no-code"
                ? "No authentication code found"
                : "An error occurred"}
            </p>
            {errorDetails && (
              <p className="text-xs opacity-80 mt-1">
                Reason: {decodeURIComponent(errorDetails)}
              </p>
            )}
            <p className="text-xs mt-2">
              Please try again. If the issue persists, check your Supabase configuration.
            </p>
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-bold transition-all hover:-translate-y-1 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          style={{
            background: "white",
            border: "1px solid #E5E7EB",
            color: "#111827",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
          }}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </>
          )}
        </button>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs" style={{ color: "#9CA3AF" }}>
          <Star size={12} />
          Join 10,000+ professionals using ResumeAI
        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
