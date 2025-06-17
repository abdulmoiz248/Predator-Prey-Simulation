"use server"

import Groq from "groq-sdk";


interface ChatCompletionMessageParam {
  role: "user" | "assistant" | "system";
  content: string;
}

const prompt = `You are an intelligent teaching assistant for the Lotka-Volterra Simulator. Our platform models the dynamic interaction between predator and prey populations—specifically wolves and rabbits-based on the Lotka-Volterra equations. Your role is to guide users through setting up simulations, interpreting results, and generating a detailed PDF report. Always respond with accurate, helpful insights grounded in the Lotka-Volterra model.Keep your response very concise short upto 3 sentences only if user ask best params for model tell him dont write it is based on situation or this that`;


const messages:ChatCompletionMessageParam[]= [
    {
      role: "system",
      content: prompt,
    },
  ];

  
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function sendChatMessage(message: string) {
 
    messages.push({
      role: "user",
      content: message,
    });
    const chatCompletion = await getGroqChatCompletion();
    const response = chatCompletion.choices[0]?.message?.content || ""
    messages.push({
        role: "assistant",
      content: response,
    })

    return response;
  
}

async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages:messages,
    model: "llama-3.3-70b-versatile",
    max_tokens: 100,
    temperature: 0.5,
  });
}
