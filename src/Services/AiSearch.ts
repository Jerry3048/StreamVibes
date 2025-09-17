import axios from "axios";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export interface AiResponse {
  reply: string;     // natural chatbot reply
  keywords: string[]; // clean keywords for TMDB
}

export async function getMovieAiResponse(prompt: string): Promise<AiResponse> {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a friendly movie assistant.
- Always reply conversationally to the user (like ChatGPT).
- At the END of your reply, include a hidden keyword section in this format:
<keywords>funny, superhero, action</keywords>`,
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 150,
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const content: string = response.data.choices?.[0]?.message?.content || "";

  console.log("AI raw chatbot response:", content);

  // Extract <keywords>...</keywords>
  const keywordMatch = content.match(/<keywords>(.*?)<\/keywords>/i);
  const keywords = keywordMatch
    ? keywordMatch[1]
        .split(",")
        .map((s: string) => s.trim().toLowerCase())
        .filter((s) => s.length > 0)
    : [];

  // Remove keyword section from chatbot reply
  const reply = content.replace(/<keywords>.*<\/keywords>/i, "").trim();

  return { reply, keywords };
}
