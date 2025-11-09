import random
from fastapi import FastAPI
from upload import router as upload_router
from gemini_integration import generate_recipes_with_gemini
import json

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5173"] for more security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the upload router
app.include_router(upload_router)

@app.get("/hello")
async def hello() -> dict[str, str]:
    return {"message": "Hello from FastAPI"}

@app.get("/random")
async def get_random_item(maximum: int) -> dict[str, int]:
    return {"itemId": random.randint(0, maximum)}

@app.get("/test")
async def test_endpoint() -> dict[str, str]:
    return {"status": "Test endpoint is working!"}

from typing import List, Dict

@app.post("/get-recipes")
async def get_recipes(fridge_items: List[Dict]):
    # Convert list to dictionary
    selected_dict = {item["name"]: {"quantity": item["quantity"], "expiration": item["expiration"]}
                     for item in fridge_items if item["quantity"] > 0}
    recipes_json = generate_recipes_with_gemini(selected_dict)
    print("Gemini raw response:", recipes_json)
    # Strip code fences if present
    import re
    recipes_json_clean = re.sub(r"^```(?:json)?\s*|```$", "", recipes_json.strip())
    # Load JSON
    recipes = json.loads(recipes_json_clean)
    with open("recipes.json", "w", encoding="utf-8") as f:
        json.dump(recipes, f, ensure_ascii=False, indent=2)
    return {"recipes": recipes["recipes"]}