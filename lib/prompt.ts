export const buildVideoScriptPrompt = (params: {
    topic: string;
    videoType: string;
    lengthType: "short" | "long";
    platform: string;
    language: string;
    extras: string | null;
}) => {
    const { topic, videoType, lengthType, platform, language, extras } = params;

    const lengthDescription =
        lengthType === "short"
            ? "Short-form vertical video (TikTok/Reels/Shorts), duration 30–60 seconds."
            : "Long-form YouTube-style video, target duration 8–15 minutes.";

    return `
You are a professional ${platform} scriptwriter and content strategist.

Write a complete video script in ${language}.

Video requirements:
- Topic / idea: "${topic}"
- Video type: ${videoType} (e.g. Tutorial, Review, Storytime, Ad, Explainer)
- Format: ${lengthDescription}
- Platform: ${platform}
${
        extras
            ? `- Additional instructions from the creator: """${extras.trim()}"""`
            : ""
    }

Return ONLY valid JSON in this exact structure:

{
  "title": "Compelling, click-worthy title, optimized for ${platform}",
  "description": "Video description with keywords and 2–4 relevant hashtags.",
  "hooks": [
    "One-sentence hook for the very first 3 seconds.",
    "Another hook option...",
    "Another hook option..."
  ],
  "sections": [
    {
      "label": "Intro",
      "approxDurationSec": 20,
      "content": "Text of what the creator should say / show in this part."
    },
    {
      "label": "Main Point 1",
      "approxDurationSec": 40,
      "content": "..."
    }
  ],
  "ctaIdeas": [
    "Strong call-to-action version 1 (like, subscribe, comment, click link, etc.)",
    "Alternative CTA for a softer, story-driven ending."
  ]
}

Rules:
- Output MUST be valid JSON, no comments, no markdown, no backticks.
- Do not include any explanations outside of the JSON.
- Make the script practical, concrete, and engaging for a real creator.
`;
};
