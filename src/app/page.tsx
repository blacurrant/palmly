"use client";

import { useState } from "react";
import PalmUploader from "@/components/PalmUploader";
import ReadingResult from "@/components/ReadingResult";
import PaywallModal from "@/components/PaywallModal";
import { Lang, t } from "@/lib/translations";

type State = "idle" | "analyzing" | "result" | "error";

interface PalmReading {
  heartLine: { title: string; reading: string };
  headLine: { title: string; reading: string };
  lifeLine: { title: string; preview: string; full: string };
  fateLine: { title: string; reading: string };
  mounts: { title: string; reading: string };
  overall: { title: string; reading: string };
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [state, setState] = useState<State>("idle");
  const [palmPreview, setPalmPreview] = useState<string>("");
  const [reading, setReading] = useState<PalmReading | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const tx = t[lang];

  async function handleImage(file: File, preview: string) {
    setPalmPreview(preview);
    setState("analyzing");

    try {
      const formData = new FormData();
      formData.append("palm", file);
      const res = await fetch("/api/read-palm", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Failed");
      setReading(data.reading);
      setState("result");
    } catch {
      setState("error");
    }
  }

  function reset() {
    setState("idle");
    setPalmPreview("");
    setReading(null);
    setUnlocked(false);
    setShowPaywall(false);
  }

  return (
    <div style={{
      minHeight: "100dvh",
      background: "#f5f4ed",
      display: "flex",
      flexDirection: "column",
      maxWidth: 480,
      margin: "0 auto",
      position: "relative",
    }}>
      {/* Header */}
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px",
        borderBottom: "1px solid #f0eee6",
        position: "sticky",
        top: 0,
        background: "#f5f4ed",
        zIndex: 10,
      }}>
        <h1 style={{
          fontFamily: "Georgia, serif",
          fontSize: 22,
          fontWeight: 500,
          color: "#141413",
          letterSpacing: -0.3,
        }}>
          Palmly
        </h1>
        <button
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
          style={{
            background: "#e8e6dc",
            border: "none",
            borderRadius: 20,
            padding: "6px 14px",
            fontSize: 13,
            fontWeight: 500,
            color: "#4d4c48",
            cursor: "pointer",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {tx.langToggle}
        </button>
      </header>

      {/* Main content */}
      <main style={{ flex: 1, overflowY: "auto", paddingBottom: 24 }}>

        {/* IDLE STATE */}
        {state === "idle" && (
          <div className="fade-in">
            {/* Hero */}
            <div style={{ padding: "40px 20px 32px", textAlign: "center" }}>
              {/* Decorative palm lines */}
              <div style={{
                width: 80, height: 80,
                margin: "0 auto 24px",
                background: "#faf9f5",
                borderRadius: "50%",
                border: "1px solid #e8e6dc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "rgba(0,0,0,0.05) 0px 4px 24px",
              }}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M20 32c-5 0-10-4-10-10V12a2.5 2.5 0 0 1 5 0v7" stroke="#c96442" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M15 19V9a2.5 2.5 0 0 1 5 0v10" stroke="#c96442" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M20 19V8a2.5 2.5 0 0 1 5 0v11" stroke="#c96442" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M25 19V10a2.5 2.5 0 0 1 5 0v12c0 6-5 10-10 10" stroke="#c96442" strokeWidth="2" strokeLinecap="round"/>
                  {/* Palm lines */}
                  <path d="M13 24 Q20 22 27 24" stroke="#d97757" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
                  <path d="M12 27 Q20 25 26 26" stroke="#d97757" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
                </svg>
              </div>

              <h2 style={{
                fontFamily: "Georgia, serif",
                fontSize: 30,
                fontWeight: 500,
                color: "#141413",
                lineHeight: 1.2,
                marginBottom: 12,
                letterSpacing: -0.5,
              }}>
                {tx.tagline}
              </h2>
              <p style={{
                fontSize: 15,
                color: "#5e5d59",
                lineHeight: 1.65,
                maxWidth: 300,
                margin: "0 auto",
              }}>
                {tx.subtitle}
              </p>
            </div>

            {/* Upload */}
            <PalmUploader onImage={handleImage} lang={lang} />

            {/* How it works */}
            <div style={{ padding: "32px 20px 0" }}>
              <p style={{
                fontSize: 11,
                fontWeight: 500,
                color: "#87867f",
                letterSpacing: 0.8,
                textTransform: "uppercase",
                marginBottom: 16,
              }}>
                {tx.ctaSecondary}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[tx.step1, tx.step2, tx.step3].map((step, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: "50%",
                      background: "#faf9f5",
                      border: "1px solid #e8e6dc",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 600, color: "#c96442",
                      flexShrink: 0, marginTop: 1,
                    }}>
                      {i + 1}
                    </div>
                    <p style={{ fontSize: 14, color: "#5e5d59", lineHeight: 1.5 }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Social proof */}
            <div style={{ padding: "32px 20px 0", textAlign: "center" }}>
              <p style={{ fontSize: 13, color: "#87867f" }}>
                ✦ &nbsp; Free to try &nbsp; ✦ &nbsp; Vedic + Western palmistry &nbsp; ✦
              </p>
            </div>
          </div>
        )}

        {/* ANALYZING STATE */}
        {state === "analyzing" && (
          <div className="fade-in" style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            minHeight: "60vh", padding: 32, textAlign: "center",
          }}>
            {palmPreview && (
              <div style={{
                width: 100, height: 100, borderRadius: "50%",
                overflow: "hidden", border: "2px solid #e8e6dc",
                marginBottom: 28,
                boxShadow: "rgba(0,0,0,0.08) 0px 4px 20px",
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={palmPreview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            )}

            {/* Spinner */}
            <div className="pulse-ring" style={{
              width: 56, height: 56, borderRadius: "50%",
              border: "2px solid #e8e6dc",
              borderTopColor: "#c96442",
              animation: "spin 1s linear infinite, pulse-ring 2s ease-in-out infinite",
              marginBottom: 24,
            }} />

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

            <h3 style={{
              fontFamily: "Georgia, serif",
              fontSize: 22, fontWeight: 500,
              color: "#141413", marginBottom: 8,
            }}>
              {tx.analyzing}
            </h3>
            <p style={{ fontSize: 14, color: "#87867f" }}>{tx.analyzingSub}</p>
          </div>
        )}

        {/* RESULT STATE */}
        {state === "result" && reading && (
          <div className="fade-in">
            <ReadingResult
              reading={reading}
              palmPreview={palmPreview}
              unlocked={unlocked}
              lang={lang}
              onUnlock={() => setShowPaywall(true)}
              onShare={() => {}}
              onReset={reset}
            />
          </div>
        )}

        {/* ERROR STATE */}
        {state === "error" && (
          <div className="fade-in" style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            minHeight: "60vh", padding: 32, textAlign: "center",
          }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>🤚</div>
            <h3 style={{
              fontFamily: "Georgia, serif",
              fontSize: 22, fontWeight: 500,
              color: "#141413", marginBottom: 8,
            }}>
              {tx.errorTitle}
            </h3>
            <p style={{ fontSize: 14, color: "#87867f", marginBottom: 24 }}>
              {tx.errorSub}
            </p>
            <button
              onClick={reset}
              style={{
                background: "#c96442", color: "#faf9f5",
                border: "none", borderRadius: 12,
                padding: "12px 28px", fontSize: 15, fontWeight: 600,
                cursor: "pointer", fontFamily: "system-ui, sans-serif",
              }}
            >
              {tx.retry}
            </button>
          </div>
        )}
      </main>

      {/* Paywall modal */}
      {showPaywall && (
        <PaywallModal
          lang={lang}
          onClose={() => setShowPaywall(false)}
          onSuccess={() => setUnlocked(true)}
        />
      )}
    </div>
  );
}
