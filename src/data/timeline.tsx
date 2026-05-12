import React from "react";

export interface TimelineEvent {
  id: string;
  date: {
    month: string;
    year: string;
  };
  icon: string;
  title: string;
  text: React.ReactNode;
  isSpecial?: boolean;
  image?: string; // Add an image path here, e.g., "/images/first-date.jpg"
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: "e1",
    date: { month: "Oct", year: "2023" },
    icon: "💬",
    title: "It started with a text",
    image: "/images/7.jpeg",
    text: (
      <>
        4th October 2023. Two people, a screen between them, and absolutely no idea what they were walking into.{" "}
        <span className="text-black italic">You were already dangerous and I didn&apos;t know it yet. "all swag people are alseep right now"</span>
      </>
    ),
  },
  {
    id: "e2",
    date: { month: "May", year: "2024" },
    icon: "🎤",
    title: "Seedhe Maut. You. Chaos.",
        image: "/images/8.jpeg",

    text: (
      <>
        12th May 2024. A concert, a crowd, and then — you. Somewhere before the concert day, we knew it already, the real thing began.{" "}
        <span className="text-black italic">Turns out the best meetings have no agenda.</span>
      </>
    ),
  },
  {
    id: "e3",
    date: { month: "Aug", year: "2024" },
    icon: "🎂",
    title: "Your birthday. Social. Then us.",
        image: "/images/6.jpeg",

    text: (
      <>
        21st August 2024. We did it right, good food, good noise and banarasi patiala, then the quieter part of the night that belongs only to us.{" "}
        <span className="text-black italic">You deserve both the celebration and the calm after it.</span>
      </>
    ),
  },
  {
    id: "e4",
    date: { month: "Dec", year: "2024" },
    icon: "💍",
    title: "The first proposal (half-assed, fully felt)",
        image: "/images/0.jpeg",

    text: (
      <>
        1st December 2024. Okay, it wasn&apos;t perfect. The ring was yours, the words were probably stumbled.{" "}
        <span className="text-black italic">But the feeling was real, even if the execution wasn&apos;t.</span> You knew what I meant.
      </>
    ),
  },
  {
    id: "e5",
    date: { month: "Feb", year: "2025" },
    icon: "✨",
    title: "The real one. Silver. Filigree. Yours.",
    isSpecial: true,
        image: "/images/4.jpeg",

    text: (
      <>
        22nd February 2025. A silver filigree flower. I got it right this time.{" "}
        <span className="text-black italic">Some things deserve a second draft, you were always worth the rewrite.</span>
      </>
    ),
  },
  {
    id: "e6",
    date: { month: "Oct", year: "2025" },
    icon: "🪔",
    title: "Diwali at mine",
        image: "/images/3.jpeg",

    text: (
      <>
        You came home. Diwali felt different that year — louder, warmer, better.{" "}
        <span className="text-black italic">Every light in that house knew you were there, and i was just happy that you were there.</span>
      </>
    ),
  },
  {
    id: "e7",
    date: { month: "Nov", year: "2025" },
    icon: "📦",
    title: "I moved to your city",
    image: "/images/5.jpeg",

    text: (
      <>
        November 2025. Packed everything up and landed where you are.{" "}
        <span className="text-black italic">It wasn&apos;t a sacrifice. It was the easiest decision I&apos;ve made in years.</span>
      </>
    ),
  },
  {
    id: "e8",
    date: { month: "Dec", year: "2025" },
    icon: "🎄",
    title: "First Christmas, together",
        image: "/images/1.jpeg",

    text: (
      <>
        December 2025. Lights, cookies, music, good people, cold outside, you across from me from where i can just adore and appreciate you.{" "}
        <span className="text-black italic">I don&apos;t think I&apos;d ever really liked December or christmas before you. Even if things were the way they were, it was the best christmas of my life.</span>
      </>
    ),
  },
  {
    id: "e9b",
    date: { month: "Feb", year: "2026" },
    icon: "🕯️",
    title: "Valentine's at Begeterre",
        image: "/images/2.jpeg",

    text: (
      <>
        14th February 2026. A proper place, some violine, some live cheesecake, proper food, some drinks, the whole thing.{" "}
        <span className="text-black italic">You deserve all the fancy things — and you wore it like you were born for it.</span>
      </>
    ),
  },
  {
    id: "e9",
    date: { month: "Mar", year: "2026" },
    icon: "🔍",
    title: "Mystery Room. Double date. Chaos (the fun kind).",
        image: "/images/9.jpeg",

    text: (
      <>
        March 2026. Locked in a room, with you and your people.{" "}
        <span className="text-black italic">You&apos;re somehow even more yourself when your friends are around — and I love that version of you too, even though i become the local punching bag </span>
      </>
    ),
  },
];
