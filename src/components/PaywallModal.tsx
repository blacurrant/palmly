"use client";

import { useEffect } from "react";
import { Lang, t } from "@/lib/translations";

interface Props {
  lang: Lang;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PaywallModal({ lang, onClose, onSuccess }: Props) {
  const tx = t[lang];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  function handleRazorpay() {
    const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (!key) {
      // Dev mode: just unlock
      onSuccess();
      onClose();
      return;
    }

    // @ts-expect-error Razorpay loaded via script
    const rzp = new window.Razorpay({
      key,
      amount: 9900, // ₹99 in paise
      currency: "INR",
      name: "Palmly",
      description: "Full Palm Reading — ₹99/month",
      image: "/icon-192.png",
      handler: () => {
        onSuccess();
        onClose();
      },
      prefill: {},
      theme: { color: "#c96442" },
      modal: { ondismiss: onClose },
    });
    rzp.open();
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(20,20,19,0.6)",
          zIndex: 40,
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Sheet */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#faf9f5",
          borderRadius: "24px 24px 0 0",
          zIndex: 50,
          padding: "28px 20px 40px",
          maxWidth: 480,
          margin: "0 auto",
        }}
      >
        {/* Drag handle */}
        <div style={{
          width: 40, height: 4, background: "#e8e6dc",
          borderRadius: 2, margin: "0 auto 24px",
        }} />

        <div style={{ textAlign: "center", marginBottom: 24 }}>
          {/* Palm icon */}
          <div style={{
            width: 56, height: 56, background: "#f5f4ed",
            borderRadius: "50%", margin: "0 auto 16px",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "1px solid #e8e6dc",
          }}>
            <span style={{ fontSize: 26 }}>🔮</span>
          </div>

          <h2 style={{
            fontFamily: "Georgia, serif",
            fontSize: 22, fontWeight: 500,
            color: "#141413", marginBottom: 8, lineHeight: 1.2,
          }}>
            {tx.unlockFull}
          </h2>
          <p style={{ fontSize: 14, color: "#87867f", lineHeight: 1.5, marginBottom: 4 }}>
            {tx.unlockDesc}
          </p>
          <p style={{
            fontFamily: "Georgia, serif",
            fontSize: 28, fontWeight: 500,
            color: "#c96442", marginTop: 16,
          }}>
            {tx.price}
          </p>
        </div>

        {/* Feature list */}
        <div style={{
          background: "#f5f4ed",
          borderRadius: 16, padding: "16px 20px",
          marginBottom: 20,
          display: "flex", flexDirection: "column", gap: 12,
        }}>
          {[
            { icon: "❤️", label: lang === "hi" ? "जीवन रेखा (पूरी)" : "Life Line (full)" },
            { icon: "⭐", label: lang === "hi" ? "भाग्य रेखा" : "Fate Line" },
            { icon: "🤚", label: lang === "hi" ? "पर्वत विश्लेषण" : "Mounts Analysis" },
            { icon: "✨", label: lang === "hi" ? "आपकी नियति" : "Your Destiny" },
          ].map(({ icon, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 18, width: 28 }}>{icon}</span>
              <span style={{ fontSize: 14, color: "#4d4c48", fontWeight: 500 }}>{label}</span>
              <span style={{ marginLeft: "auto", fontSize: 14, color: "#c96442" }}>✓</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleRazorpay}
          style={{
            width: "100%",
            background: "#c96442",
            color: "#faf9f5",
            border: "none",
            borderRadius: 12,
            padding: "15px 20px",
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
            marginBottom: 10,
            fontFamily: "system-ui, sans-serif",
            boxShadow: "0 0 0 1px #c96442",
          }}
        >
          {tx.unlockBtn}
        </button>
        <p style={{ textAlign: "center", fontSize: 12, color: "#87867f" }}>
          {tx.priceNote}
        </p>
      </div>

      {/* Razorpay script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />
    </>
  );
}
