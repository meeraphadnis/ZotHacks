from dotenv import load_dotenv
load_dotenv()
import os
import google.generativeai as genai
import json

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# def analyze_image_with_gemini(file_content: bytes, mime_type: str) -> str:
#     """
#     Sends an image to Gemini and returns the generated response text.
#     """
#     image_parts = [{"mime_type": mime_type, "data": file_content}]
#     model = genai.GenerativeModel("gemini-1.5-flash")
#     prompt = "List all food items visible in this fridge image:"
#     response = model.generate_content([prompt, image_parts])
#     return response.text

def analyze_image_with_gemini(file_content: bytes, mime_type: str) -> str:
    model = genai.GenerativeModel("gemini-flash-latest")

    response = model.generate_content(
        [
            {
                "parts": [
                    {"text": "Respond ONLY with JSON. Do not include any extra text. Each key is an ingredient and each \
                     value is an expiration date in YYYY-MM-DD format.List all food items visible in this fridge image. \
                     Respond with JSON file of items without any additional text. Each ingredient should also have an \
                     expiration date, not assuming it is fresh."},
                    {"mime_type": mime_type, "data": file_content}
                ]
            }
        ]
    )
    return response.text