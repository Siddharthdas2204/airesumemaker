import { NextRequest, NextResponse } from "next/server";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient | null = null;

function getSupabase() {
    if (!supabase) {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (!url || !key) throw new Error("Supabase credentials not configured");
        supabase = createClient(url, key);
    }
    return supabase;
}

// Save a resume
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const db = getSupabase();

        const { data, error } = await db
            .from("resumes")
            .insert({
                title: body.title || "Untitled Resume",
                full_name: body.full_name,
                email: body.email,
                raw_input: body.raw_input,
                generated_content: body.generated_content,
                template: body.template || "classic",
            })
            .select()
            .single();

        if (error) {
            console.error("Supabase insert error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ resume: data });
    } catch (error) {
        console.error("Save resume error:", error);
        return NextResponse.json(
            { error: "Failed to save resume. Check Supabase configuration." },
            { status: 500 }
        );
    }
}

// Get all resumes
export async function GET() {
    try {
        const db = getSupabase();

        const { data, error } = await db
            .from("resumes")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Supabase fetch error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ resumes: data });
    } catch (error) {
        console.error("Fetch resumes error:", error);
        return NextResponse.json(
            { error: "Failed to fetch resumes. Check Supabase configuration." },
            { status: 500 }
        );
    }
}
