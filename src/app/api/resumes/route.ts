import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// Save a resume
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const supabase = await createClient();

        // Get authenticated user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { data, error } = await supabase
            .from("resumes")
            .insert({
                user_id: user.id,
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
            { error: "Failed to save resume." },
            { status: 500 }
        );
    }
}

// Get all resumes for current user
export async function GET() {
    try {
        const supabase = await createClient();

        // Get authenticated user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { data, error } = await supabase
            .from("resumes")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Supabase fetch error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ resumes: data });
    } catch (error) {
        console.error("Fetch resumes error:", error);
        return NextResponse.json(
            { error: "Failed to fetch resumes." },
            { status: 500 }
        );
    }
}
