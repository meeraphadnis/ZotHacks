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
                     value has two components: the quantity of the item (integer value), and an expiration date in YYYY-MM-DD format. (The date should start from the exact date the user is using the platform, keep it up in present real-time.) List all food items visible in this fridge image. \
                     If you can't tell what the quantity is, have a default value based on the context of the image (example: if it's berries, default to an appropriate value vs if it's a can of milk). \
                     NEVER include special characters in the JSON keys or values. \
                     Respond with JSON file of items without any additional text."},
                    {"mime_type": mime_type, "data": file_content}
                ]
            }
        ]
    )
    return response.text