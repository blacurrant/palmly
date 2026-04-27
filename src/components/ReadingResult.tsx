"use client";

import { Lang, t } from "@/lib/translations";

interface PalmReading {
  heartLine: { title: string; reading: string };
  headLine: { title: string; reading: string };
  lifeLine: { title: string; preview: string; full: string };
  fateLine: { title: string; reading: string };
  mounts: { title: string; reading: string };
  overall: { title: string; reading: string };
}

interface Props {
  reading: PalmReading;
  palmPreview: string;
  unlocked: boolean;
  lang: Lang;
  onUnlock: () => void;
  onShare: () => void;
  onReset: () => void;
}

function LineCard({
  title,
  text,
  locked,
  lockedLabel,
}: {
  title: string;
  text: string;
  locked?: boolean;
  lockedLabel?: string;
}) {
  return (
    <div
      style={{
        background: "#faf9f5",
        border: "1px solid #f0eee6",
        borderRadius: 16,
        padding: "20px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <p
        style={{
          fontFamily: "Georgia, serif",
          fontSize: 14,
          fontWeight: 500,
          color: "#c96442",
          marginBottom: 8,
          letterSpacing: 0.3,
        }}
      >
        {title}
      </p>
      <p
        style={{
          fontSize: 15,
          color: locked ? "transparent" : "#5e5d59",
          lineHeight: 1.65,
          filter: locked ? "blur(5px)" : "none",
          userSelect: locked ? "none" : "auto",
          transition: "filter 0.3s",
        }}
      >
        {text}
      </p>
      {locked && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(245,244,237,0.6)",
            backdropFilter: "blur(2px)",
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#4d4c48",
              background: "#e8e6dc",
              padding: "6px 14px",
              borderRadius: 20,
            }}
          >
            {lockedLabel}
          </span>
        </div>
      )}
    </div>
  );
}

export default function ReadingResult({
  reading,
  palmPreview,
  unlocked,
  lang,
  onUnlock,
  onShare,
  onReset,
}: Props) {
  const tx = t[lang];

  const shareText = encodeURIComponent(
    `My palm reading from Palmly:\n\n❤️ ${reading.heartLine.title}: ${reading.heartLine.reading.slice(0, 80)}...\n\n🧠 ${reading.headLine.title}: ${reading.headLine.reading.slice(0, 80)}...\n\nGet your free reading: https://palmly.app`
  );
  const whatsappUrl = `https://wa.me/?text=${shareText}`;

  return (
    <div style={{ width: "100%", maxWidth: 480, margin: "0 auto" }}>
      {/* Palm preview thumbnail */}
      <div style={{ padding: "0 16px 24px" }}>
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid #e8e6dc",
            maxHeight: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#faf9f5",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={palmPreview}
            alt="Your palm"
            style={{ width: "100%", height: 180, objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Free section header */}
      <div style={{ padding: "0 16px 12px" }}>
        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 22,
            fontWeight: 500,
            color: "#141413",
            lineHeight: 1.2,
          }}
        >
          {tx.freeReading}
        </h2>
      </div>

      {/* Free cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "0 16px" }}>
        <LineCard title={reading.heartLine.title} text={reading.heartLine.reading} />
        <LineCard title={reading.headLine.title} text={reading.headLine.reading} />
        <LineCard
          title={reading.lifeLine.title}
          text={reading.lifeLine.full}
          locked={!unlocked}
          lockedLabel={tx.lockedLabel}
        />
      </div>

      {/* Paywall section */}
      {!unlocked && (
        <div style={{ padding: "24px 16px 0" }}>
          <div
            style={{
              background: "#141413",
              borderRadius: 20,
              padding: "24px 20px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 20,
                fontWeight: 500,
                color: "#faf9f5",
                marginBottom: 8,
                lineHeight: 1.3,
              }}
            >
              {tx.unlockFull}
            </p>
            <p
              style={{
                fontSize: 14,
                color: "#b0aea5",
                marginBottom: 20,
                lineHeight: 1.5,
              }}
            >
              {tx.unlockDesc}
            </p>

            {/* Locked preview cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
              {[reading.fateLine.title, reading.mounts.title, reading.overall.title].map((title) => (
                <div
                  key={title}
                  style={{
                    background: "#30302e",
                    borderRadius: 12,
                    padding: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: 13, color: "#b0aea5", fontFamily: "Georgia, serif" }}>
                    {title}
                  </span>
                  <span style={{ fontSize: 12, color: "#5e5d59" }}>🔒</span>
                </div>
              ))}
            </div>

            <button
              onClick={onUnlock}
              style={{
                width: "100%",
                background: "#c96442",
                color: "#faf9f5",
                border: "none",
                borderRadius: 12,
                padding: "14px 20px",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                marginBottom: 10,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {tx.unlockBtn}
            </button>
            <p style={{ fontSize: 12, color: "#5e5d59" }}>{tx.priceNote}</p>
          </div>
        </div>
      )}

      {/* Unlocked locked cards */}
      {unlocked && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "12px 16px 0" }}>
          <LineCard title={reading.fateLine.title} text={reading.fateLine.reading} />
          <LineCard title={reading.mounts.title} text={reading.mounts.reading} />
          <div
            style={{
              background: "#141413",
              borderRadius: 16,
              padding: "20px 20px",
            }}
          >
            <p
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 14,
                fontWeight: 500,
                color: "#c96442",
                marginBottom: 8,
              }}
            >
              {reading.overall.title}
            </p>
            <p style={{ fontSize: 15, color: "#b0aea5", lineHeight: 1.65 }}>
              {reading.overall.reading}
            </p>
          </div>
        </div>
      )}

      {/* Share + Reset */}
      <div style={{ padding: "24px 16px 40px", display: "flex", flexDirection: "column", gap: 10 }}>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            width: "100%",
            background: "#25D366",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "14px 20px",
            fontSize: 15,
            fontWeight: 600,
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          {tx.shareWhatsApp}
        </a>

        <button
          onClick={onReset}
          style={{
            width: "100%",
            background: "transparent",
            color: "#87867f",
            border: "1px solid #e8e6dc",
            borderRadius: 12,
            padding: "12px 20px",
            fontSize: 14,
            cursor: "pointer",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {tx.tryAgain}
        </button>
      </div>
    </div>
  );
}
