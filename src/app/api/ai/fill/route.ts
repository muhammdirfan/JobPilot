import { NextResponse } from "next/server";
import { OpenAI } from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

console.log("API KEY", process.env.OPENAI_API_KEY);

export async function POST(req: Request) {
  const { url } = await req.json();

  console.log("🟢 Received URL:", url);

  const prompt = `Extract job title, company name, and summary from this job post URL (as much as you can): ${url}`;

  //   const prompt = `
  // Given the job post URL below, extract the data and return it strictly as JSON with fields: company, position, description:

  // URL: ${url}
  // Respond with only JSON.`;

  //   const completion = await openai.chat.completions.create({
  //     model: "gpt-3.5",
  //     messages: [
  //       { role: "system", content: "You're a job data parser." },
  //       { role: "user", content: prompt },
  //     ],
  //   });

  //   const text = completion.choices[0]?.message?.content ?? "";

  const completion = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer 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`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo-instruct", // or try "mistralai/mixtral-8x7b"
        messages: [
          { role: "system", content: "You're a job data parser." },
          { role: "user", content: `Extract job details from: ${url}` },
        ],
      }),
    }
  );
  const text = await completion.json();

  console.log("🟢 GPT Response:", text);

  // Naive extract, optionally improve with JSON prompt format
  return NextResponse.json({ raw: text });
  //   return NextResponse.json({
  //     raw: `Company: Upwork\nPosition: Frontend Developer\nStatus: applied\nLink: https://example.com\nNotes: Remote friendly, React + Tailwind required`,
  //   });
}
