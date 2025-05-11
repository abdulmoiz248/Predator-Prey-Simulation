import os
import json
import requests
from dotenv import load_dotenv
from google import genai

def generate_ai_summary(results):
  
    # Load API key from .env file
    load_dotenv()
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("[ERROR] Gemini API key not found in .env file (GEMINI_API_KEY).")
        return "AI summary could not be generated due to missing API key."

    # Prepare the prompt and data
    prompt = (
        "You are an expert science communicator. "
        "Given the following predator-prey simulation results (Lotka-Volterra model), "
        "write a concise, insightful summary for a scientific report. "
        "Highlight key trends, cyclical behaviors, and any notable findings. "
        "Use clear, professional language suitable for a research summary.\n\n"
        "Simulation Data (JSON):\n"
        f"{json.dumps(results, indent=2)}"
    )

    client = genai.Client(api_key=api_key)
   
    try:
        response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt,
        )
        summary=response.text
        if not summary:
            summary = "AI summary could not be generated. Gemini API returned no content."
        return summary
    except Exception as e:
        print(f"[ERROR] Gemini API call failed: {e}")
        return "AI summary could not be generated due to an API error."
