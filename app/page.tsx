"use client";

import { FormEvent, useState } from "react";

type ScriptSection = {
  label: string;
  approxDurationSec?: number;
  content: string;
};

type ScriptResult = {
  title: string;
  description: string;
  hooks: string[];
  sections: ScriptSection[];
  ctaIdeas: string[];
};

export default function HomePage() {
  const [topic, setTopic] = useState("");
  const [videoType, setVideoType] = useState("Tutorial");
  const [lengthType, setLengthType] = useState<"short" | "long">("short");
  const [platform, setPlatform] = useState("YouTube");
  const [language, setLanguage] = useState("English");
  const [extras, setExtras] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScriptResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          videoType,
          lengthType,
          platform,
          language,
          extras: extras || null
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to generate script.");
      }

      const data = (await res.json()) as ScriptResult;
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Unexpected error.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <main className="w-full max-w-5xl mx-auto">
        <div className="card-fade w-full rounded-3xl bg-slate-900/80 border border-slate-800 shadow-soft-card backdrop-blur-xl px-6 py-6 md:px-10 md:py-8">
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-50">
                AI Video Script Studio
              </h1>
              <p className="mt-1 text-sm md:text-base text-slate-400">
                Turn a simple idea into a full video script – title, hooks,
                sections and CTA in seconds.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm text-slate-400">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 border border-slate-700">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium text-slate-100">
                Powered by GPT-4.1
              </span>
            </span>
            </div>
          </header>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)]">
            {/* Form */}
            <section className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-200">
                    Topic / Idea
                  </label>
                  <textarea
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      required
                      rows={3}
                      placeholder='E.g. "How to start play guitar"'
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-200">
                      Video type
                    </label>
                    <select
                        value={videoType}
                        onChange={(e) => setVideoType(e.target.value)}
                        className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    >
                      <option>Tutorial</option>
                      <option>Review</option>
                      <option>Storytime</option>
                      <option>Ad / Promo</option>
                      <option>Explainer</option>
                      <option>Educational</option>
                      <option>Vlog-style</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-200">
                      Platform
                    </label>
                    <select
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    >
                      <option>YouTube</option>
                      <option>TikTok</option>
                      <option>Instagram Reels</option>
                      <option>Facebook</option>
                      <option>LinkedIn</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                <span className="text-xs font-medium text-slate-200">
                  Format length
                </span>
                  <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => setLengthType("short")}
                        className={`flex-1 rounded-2xl px-3 py-2 text-xs font-medium border ${
                            lengthType === "short"
                                ? "bg-brand-600 text-white border-brand-500 shadow-sm"
                                : "bg-slate-900/80 text-slate-300 border-slate-700 hover:border-slate-500"
                        }`}
                    >
                      Short-form (30–60s)
                    </button>
                    <button
                        type="button"
                        onClick={() => setLengthType("long")}
                        className={`flex-1 rounded-2xl px-3 py-2 text-xs font-medium border ${
                            lengthType === "long"
                                ? "bg-brand-600 text-white border-brand-500 shadow-sm"
                                : "bg-slate-900/80 text-slate-300 border-slate-700 hover:border-slate-500"
                        }`}
                    >
                      Long-form (8–15 min)
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-200">
                    Language
                  </label>
                  <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  >
                    <option>English</option>
                    <option>German</option>
                    <option>Ukrainian</option>
                    <option>Polish</option>
                    <option>Spanish</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-200">
                    Extra instructions (optional)
                  </label>
                  <textarea
                      value={extras}
                      onChange={(e) => setExtras(e.target.value)}
                      rows={2}
                      placeholder='E.g. "Make it slightly funny but still professional"'
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  />
                </div>

                {error && (
                    <p className="text-xs text-rose-400 bg-rose-950/50 border border-rose-800 rounded-2xl px-3 py-2">
                      {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading || !topic}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-500 hover:bg-brand-600 disabled:bg-slate-700 disabled:text-slate-400 px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-brand-500/30 transition-colors w-full"
                >
                  {loading ? (
                      <>
                        <span className="h-4 w-4 border-2 border-slate-100/60 border-t-transparent rounded-full animate-spin" />
                        Generating script…
                      </>
                  ) : (
                      <>
                        <span>Generate Video Script</span>
                      </>
                  )}
                </button>

                <p className="text-[11px] text-slate-500 mt-1">
                  No data is stored.
                </p>
              </form>
            </section>

            {/* Result */}
            <section className="rounded-3xl bg-slate-950/60 border border-slate-800/80 px-4 py-4 md:px-5 md:py-5 overflow-hidden">
              {!result && !loading && (
                  <div className="h-full flex items-center justify-center text-center text-sm text-slate-500">
                    <p>
                      Fill in the idea on the left and generate your first video
                      script. <br className="hidden md:block" />
                      Title, hooks, sections & CTA will appear here.
                    </p>
                  </div>
              )}

              {loading && (
                  <div className="space-y-3 text-sm text-slate-400 animate-pulse">
                    <div className="h-4 w-2/3 rounded-full bg-slate-800" />
                    <div className="h-3 w-full rounded-full bg-slate-800" />
                    <div className="h-3 w-5/6 rounded-full bg-slate-800" />
                    <div className="h-3 w-4/5 rounded-full bg-slate-800" />
                    <div className="h-3 w-3/4 rounded-full bg-slate-800" />
                  </div>
              )}

              {result && !loading && (
                  <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">
                    <div>
                      <h2 className="text-base md:text-lg font-semibold text-slate-50">
                        🎬 Title
                      </h2>
                      <p className="mt-1 text-sm text-slate-100">
                        {result.title}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-slate-50">
                        📝 Description
                      </h3>
                      <p className="mt-1 text-sm text-slate-300 whitespace-pre-line">
                        {result.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-slate-50">
                        ⚡ Hooks (first 3 seconds)
                      </h3>
                      <ul className="mt-1 space-y-1.5 text-sm text-slate-200 list-disc list-inside">
                        {result.hooks?.map((hook, idx) => (
                            <li key={idx}>{hook}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-slate-50">
                        📜 Script by sections
                      </h3>
                      <div className="mt-2 space-y-3">
                        {result.sections?.map((section, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl bg-slate-900/80 border border-slate-800 px-3 py-2.5"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <p className="text-xs font-semibold text-slate-100">
                                  {section.label}
                                </p>
                                {section.approxDurationSec && (
                                    <span className="text-[11px] text-slate-400">
                              ~ {section.approxDurationSec}s
                            </span>
                                )}
                              </div>
                              <p className="mt-1 text-xs md:text-sm text-slate-300 whitespace-pre-line">
                                {section.content}
                              </p>
                            </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-slate-50">
                        🎯 CTA ideas
                      </h3>
                      <ul className="mt-1 space-y-1.5 text-sm text-slate-200 list-disc list-inside">
                        {result.ctaIdeas?.map((cta, idx) => (
                            <li key={idx}>{cta}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
              )}
            </section>
          </div>
        </div>
      </main>
  );
}
