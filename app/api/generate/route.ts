import { NextResponse } from "next/server";
import OpenAI from "openai";
import { buildVideoScriptPrompt } from "@/lib/prompt";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {
            topic,
            videoType,
            lengthType,
            platform,
            language,
            extras
        } = body as {
            topic: string;
            videoType: string;
            lengthType: "short" | "long";
            platform: string;
            language: string;
            extras?: string | null;
        };

        if (!topic || !videoType || !lengthType || !platform || !language) {
            return NextResponse.json(
                { error: "Missing required fields." },
                { status: 400 }
            );
        }

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: "Missing OPENAI_API_KEY on the server." },
                { status: 500 }
            );
        }

        const prompt = buildVideoScriptPrompt({
            topic,
            videoType,
            lengthType,
            platform,
            language,
            extras: extras ?? null
        });

        const completion = await openai.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert video script generator. Always reply with STRICT JSON, no explanations."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.8
        });

        const raw = completion.choices[0]?.message?.content ?? "{}";

        let parsed;
        try {
            parsed = JSON.parse(raw);
        } catch (err) {
            return NextResponse.json(
                {
                    error: "Failed to parse JSON from OpenAI.",
                    raw
                },
                { status: 500 }
            );
        }

        return NextResponse.json(parsed);
    } catch (error: any) {
        console.error("[GENERATE_VIDEO_SCRIPT_ERROR]", error);
        return NextResponse.json(
            {
                error: "Something went wrong while generating the script."
            },
            { status: 500 }
        );
    }
}
