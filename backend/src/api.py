import random
from fastapi import FastAPI, HTTPException
from upload import router as upload_router
import json
from fastapi.responses import PlainTextResponse
from fastapi.middleware.cors import CORSMiddleware
import os
from gemini_integration import generate_recipes_with_gemini
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or use ["http://localhost:5173"]
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

DATA_FILE = "./fridge_items.json"

def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE) as f:
            return json.load(f)
    return {}

def save_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f)

@app.get("/api/fridge-items")
async def get_fridge_items():
    data = load_data()
    return data  # FastAPI will send this as a JSON response

@app.post("/api/fridge-items")
async def add_ingredient(item: dict):
    data = load_data()
    name = item.get("name")
    try:
        quantity = int(item.get("quantity", 1))
    except Exception:
        quantity = 1
    expiration = item.get("expiration")   # Allow missing/None values
    if name:   # expiration is now optional
        data[name] = [quantity, expiration]
        save_data(data)
        return data
    raise HTTPException(status_code=400, detail="Invalid ingredient")


@app.delete("/api/fridge-items/{name}")
async def delete_ingredient(name: str):
    data = load_data()
    if name in data:
        del data[name]
        save_data(data)
        return data
    raise HTTPException(status_code=404, detail="Ingredient not found")

@app.put("/api/fridge-items/{name}/increase")
async def increase_quantity(name: str):
    data = load_data()
    if name in data:
        data[name][0] = int(data[name][0]) + 1  # Ensure int before increment
        save_data(data)
    return data

@app.put("/api/fridge-items/{name}/decrease")
async def decrease_quantity(name: str):
    data = load_data()
    if name in data and int(data[name][0]) > 1:
        data[name][0] = int(data[name][0]) - 1  # Ensure int before decrement
        save_data(data)
    return data

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