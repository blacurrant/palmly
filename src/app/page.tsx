"use client";

import { useEffect, useRef } from "react";
import { timelineEvents } from "../data/timeline";

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const cloudRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 },
    );

    const elements = document.querySelectorAll(".entry");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <>
      <section className="hero">
        <div className="parallax-hero">
          {[2, 3, 4, 5, 6].map((layer, index) => {
            const isLeft = index % 2 === 0;
            const enterClass = isLeft
              ? "cloud-enter-left"
              : "cloud-enter-right";
            const driftClass = isLeft
              ? "cloud-drift-left"
              : "cloud-drift-right";
            const animDelay = index * 0.2;
            const driftDuration = 20 + index * 5;
            return (
              <div
                key={layer}
                ref={(el) => {
                  cloudRefs.current[index] = el;
                }}
                className="cloud-parallax-wrapper"
                style={{ opacity: 1 - index * 0.1, zIndex: layer + 1 }}
              >
                <div
                  className={`cloud-enter ${enterClass}`}
                  style={{ animationDelay: `${animDelay}s` }}
                >
                  <div
                    className={`cloud-layer ${driftClass}`}
                    style={{
                      backgroundImage: `url('/Clouds/${layer}.png')`,
                      animationDuration: `${driftDuration}s`,
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        <span
          className="absolute text-[1.2rem] opacity-[0.07] select-none pointer-events-none animate-cat-float"
          style={{ top: "12%", left: "8%", animationDelay: "0s" }}
        >
          🐾
        </span>
        <span
          className="absolute text-[1.2rem] opacity-[0.07] select-none pointer-events-none animate-cat-float"
          style={{ top: "70%", right: "6%", animationDelay: "2s" }}
        >
          🌸
        </span>
        <span
          className="absolute text-[1.2rem] opacity-[0.07] select-none pointer-events-none animate-cat-float"
          style={{
            top: "30%",
            right: "12%",
            animationDelay: "4s",
            fontSize: "0.9rem",
          }}
        >
          🐱
        </span>
        <span
          className="absolute text-[1.2rem] opacity-[0.07] select-none pointer-events-none animate-cat-float"
          style={{
            top: "80%",
            left: "15%",
            animationDelay: "1s",
            fontSize: "0.8rem",
          }}
        >
          💍
        </span>

        <p className="font-sans text-[0.65rem] tracking-[0.25em] uppercase text-white mb-8">
          4th october 2023 — and counting
        </p>

        <h1 className="font-serif text-[4.5rem]  font-extralight leading-[1.05] text-white mb-0">
          Two Years of
          <br />
          <em className="italic">Pranjal</em>
        </h1>

        <p className="font-serif italic text-[clamp(1rem,2.5vw,1.35rem)] text-white py-8 mb-12">
          a small archive of us, for my kitten
        </p>

        <div className="w-px h-[60px] bg-gradient-to-b from-transparent via-muted to-transparent my-8 mx-auto"></div>
        <p className="text-[0.65rem] tracking-[0.2em] uppercase text-muted/60 animate-pulse">
          scroll to remember ↓
        </p>
      </section>

      <div className="timeline">
        <p className="font-sans text-[0.65rem] tracking-[0.25em] uppercase text-muted text-center mb-16">
          our story, in order
        </p>

        {timelineEvents.map((event, index) => (
          <div
            className={`entry sticky mb-48 opacity-0 translate-y-6 transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] [&.visible]:opacity-100 [&.visible]:translate-y-0 flex justify-center ${
              event.isSpecial ? "special" : ""
            }`}
            style={{ top: "3rem", zIndex: index + 1 }}
            id={event.id}
            key={event.id}
          >
            <div
              className="polaroid-card"
              style={{ transform: `rotate(${index % 2 === 0 ? "1.8" : "-1.8"}deg)` }}
            >
              <div className="polaroid-photo">
                {event.image ? (
                  <img src={event.image} alt={event.title} />
                ) : (
                  <div className="polaroid-dark-photo">
                    <span className="polaroid-icon">{event.icon}</span>
                    <p className="polaroid-body-text">{event.text}</p>
                  </div>
                )}
              </div>

              <div className="polaroid-label">
                <div className="polaroid-label-title">{event.title}</div>
                {event.image && (
                  <p className="polaroid-label-text">{event.text}</p>
                )}
                <div className="polaroid-label-date">
                  {event.date.month} · {event.date.year}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 bg-wine">
      <div style={{padding:"12px"}} className="max-w-[620px] mx-auto p-8 border-t border-muted/20 text-center">
        <div className="text-2xl mb-4 opacity-50">𖦹</div>
        <p className="font-serif italic text-[1.1rem] text-muted mb-8 tracking-[0.05em]">
          — a note, because i owe you words —
        </p>
        <div className="font-serif text-[1.1rem] font-extralight leading-loose text-blush-light text-start space-y-[1.2rem]">
          <p>Pranjal,</p>
          <p>
            I don't have anything expensive to give you today. No dinner
            reservation, no wrapped box, no grand gesture planned. What I have
            is this, a quiet collection of everything we've been, laid out so
            you can see it the way I do.
          </p>
          <p>
            You walked into my life at a Seedhe Maut concert and somehow never
            left. You became my kitten, my princess, my person. You let me
            stumble through a half-assed proposal and still said yes to the real
            one. You came home to me. You let me come home to you.
          </p>
          <p>
            Two years of you has been the best and most disorienting thing. I
            didn't know I was going to love someone the way I love you, a
            little messy, very certain, completely yours.
          </p>
          <p>
            Happy anniversary, my love. Here's to every memory we haven't made
            yet.
          </p>
        </div>
        <div className="font-serif italic text-[1.25rem] text-gold mt-8 text-end">
          — Nishant 🐾
        </div>
      </div>

      <p className="max-w-[620px] mx-auto text-center text-[0.65rem] tracking-[0.2em] uppercase text-muted opacity-35 pt-12 pb-8">
        made with nothing but love and a late night
      </p>
      </div>
    </>
  );
}
