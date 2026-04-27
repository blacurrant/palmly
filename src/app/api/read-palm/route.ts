import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const PALM_PROMPT = `You are a wise, warm palm reader with deep knowledge of palmistry traditions from both Western and Vedic (Indian) schools.

Analyze this palm image carefully and provide a detailed reading. Look for the major lines (heart, head, life, fate), the mounts, finger shapes, and overall hand characteristics.

Return ONLY valid JSON in exactly this structure, no other text:

{
  "heartLine": {
    "title": "Heart Line — हृदय रेखा",
    "reading": "2-3 sentences about emotional life, relationships, love nature based on the heart line"
  },
  "headLine": {
    "title": "Head Line — मस्तिष्क रेखा",
    "reading": "2-3 sentences about intellect, decision-making, and mental strengths based on the head line"
  },
  "lifeLine": {
    "title": "Life Line — जीवन रेखा",
    "preview": "1 sentence teaser about vitality and life energy",
    "full": "3-4 sentences about vitality, health, major life changes, and energy levels based on the life line"
  },
  "fateLine": {
    "title": "Fate Line — भाग्य रेखा",
    "reading": "3-4 sentences about career, destiny, success path, and life purpose based on the fate line"
  },
  "mounts": {
    "title": "Mounts & Hand Shape",
    "reading": "2-3 sentences about personality traits revealed by the mounts and overall hand shape"
  },
  "overall": {
    "title": "Your Destiny — आपकी नियति",
    "reading": "3-4 sentences of an overall synthesis — their unique gifts, challenges to watch for, and an encouraging forward-looking message"
  }
}

Be specific to what you actually see in the palm. Be warm, insightful, and encouraging — not vague. Draw on both Western and Vedic palmistry traditions. If the image quality makes a line hard to read, mention what you can observe and interpret accordingly.`;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("palm") as File;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const mediaType = (file.type || "image/jpeg") as
      | "image/jpeg"
      | "image/png"
      | "image/gif"
      | "image/webp";

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: mediaType, data: base64 },
            },
            { type: "text", text: PALM_PROMPT },
          ],
        },
      ],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "Could not parse reading" },
        { status: 500 }
      );
    }

    const reading = JSON.parse(jsonMatch[0]);
    return NextResponse.json({ reading });
  } catch (err) {
    console.error("Palm reading error:", err);
    return NextResponse.json(
      { error: "Reading failed. Please try again." },
      { status: 500 }
    );
  }
}
