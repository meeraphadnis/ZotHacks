from dotenv import load_dotenv
load_dotenv()
import os
import google.generativeai as genai
import json
from datetime import datetime

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
    today = datetime.now().strftime("%Y-%m-%d")
    response = model.generate_content(
        [
            {
                "parts": [
                    {"text": "Respond ONLY with JSON. TODAY'S DATE IS: November 8 2025. Do not include any extra text. Each key is an ingredient and each \
                     value has two components: the quantity of the item (integer value), and an expiration date in YYYY-MM-DD format. Make the expiration date reasonable, according to today's date. List all food items visible in this fridge image. \
                     If you can't tell what the quantity is, have a default value based on the context of the image (example: if it's berries, default to an appropriate value vs if it's a can of milk). \
                     NEVER include special characters in the JSON keys or values. \
                     Respond with JSON file of items without any additional text."},
                    {"mime_type": mime_type, "data": file_content}
                ]
            }
        ]
    )
    return response.text


def generate_recipes_with_gemini(selected_ingredients: dict) -> str:
    """
    Sends selected ingredients to Gemini and gets 3 recipes with AI-generated images.
    Returns Gemini's JSON response as a string.
    """
    model = genai.GenerativeModel("gemini-flash-latest")

    # Convert dict to string nicely for the prompt
    ingredients_text = json.dumps(selected_ingredients, indent=2)

    prompt = f"""

    DO NOT include any markdown code fences like ```json or ``` anywhere. Do NOT add ANY additional text outside the JSON structure. Respond ONLY in JSON like this:
    {{
        "recipes": [
            {{
                "name": "",
                "ingredients": [],
                "instructions": "",
                "image_url": ""
            }}
        ]
    }}
    You are a top chef AI. Using the following ingredients:

    {ingredients_text}

    Create 3 complete recipes. Each recipe should include:
    - Recipe name
    - Ingredients list with quantities
    - Step-by-step instructions
    - An AI image of the dish (realistic and appetizing)

    """

    response = model.generate_content([{"text": prompt}])
    # #dump to create recipes json file with the response
    # with open("recipes.json", "w", encoding="utf-8") as f:
    #     json.dump({"recipes": recipes["recipes"]}, f, ensure_ascii=False, indent=2)
    return response.text
