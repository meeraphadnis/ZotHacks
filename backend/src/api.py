import random
from fastapi import FastAPI, HTTPException
from upload import router as upload_router
import json
from fastapi.responses import PlainTextResponse
from fastapi.middleware.cors import CORSMiddleware
import os
from gemini_integration import generate_recipes_with_gemini
from typing import List, Dict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

# ------ Fridge Items (NEW LIST FORMAT) -------
DATA_FILE = "./fridge_items.json"

def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE) as f:
            return json.load(f)
    return []

def save_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f)

@app.get("/api/fridge-items")
async def get_fridge_items():
    return load_data()  # Returns list

@app.post("/api/fridge-items")
async def add_ingredient(item: dict):
    data = load_data()
    for entry in data:
        if entry["name"] == item.get("name"):
            entry["quantity"] = int(item.get("quantity", 1))
            entry["expiration"] = item.get("expiration")
            save_data(data)
            return data
    data.append({
        "name": item.get("name"),
        "quantity": int(item.get("quantity", 1)),
        "expiration": item.get("expiration")
    })
    save_data(data)
    return data

@app.delete("/api/fridge-items/{name}")
async def delete_ingredient(name: str):
    data = load_data()
    new_data = [entry for entry in data if entry["name"] != name]
    save_data(new_data)
    return new_data

@app.put("/api/fridge-items/{name}/increase")
async def increase_quantity(name: str):
    data = load_data()
    for entry in data:
        if entry["name"] == name:
            entry["quantity"] = int(entry["quantity"]) + 1
    save_data(data)
    return data

@app.put("/api/fridge-items/{name}/decrease")
async def decrease_quantity(name: str):
    data = load_data()
    for entry in data:
        if entry["name"] == name and int(entry["quantity"]) > 1:
            entry["quantity"] = int(entry["quantity"]) - 1
    save_data(data)
    return data

# ----- Recipes and Cooked Recipes -----
@app.post("/get-recipes")
async def get_recipes(fridge_items: List[Dict]):
    # Your Gemini code, not impacted by list/dict change
    selected_dict = {item["name"]: {"quantity": item["quantity"], "expiration": item["expiration"]}
                     for item in fridge_items if item["quantity"] > 0}
    recipes_json = generate_recipes_with_gemini(selected_dict)
    import re
    recipes_json_clean = re.sub(r"^``````$", "", recipes_json.strip())
    recipes = json.loads(recipes_json_clean)
    with open("recipes.json", "w", encoding="utf-8") as f:
        json.dump(recipes, f, ensure_ascii=False, indent=2)
    return {"recipes": recipes["recipes"]}

@app.get("/api/recipes")
async def get_recipes():
    with open("recipes.json") as f:
        return json.load(f)

COOKED_RECIPES_FILE = "./cooked_recipes.json"
RECIPES_FILE = "./recipes.json"

def load_cooked():
    if os.path.exists(COOKED_RECIPES_FILE):
        with open(COOKED_RECIPES_FILE) as f:
            return json.load(f)
    return []

def save_cooked(data):
    with open(COOKED_RECIPES_FILE, "w") as f:
        json.dump(data, f)

def load_recipes():
    if os.path.exists(RECIPES_FILE):
        with open(RECIPES_FILE) as f:
            return json.load(f)
    return {"recipes": []}

def save_recipes(data):
    with open(RECIPES_FILE, "w") as f:
        json.dump(data, f)

@app.post("/api/cooked-recipes")
async def add_cooked_recipe(recipe: dict):
    cooked = load_cooked()
    recipes = load_recipes()
    if not any(r["name"] == recipe["name"] for r in cooked):
        cooked.append(recipe)
        save_cooked(cooked)
    recipes["recipes"] = [r for r in recipes["recipes"] if r["name"] != recipe["name"]]
    save_recipes(recipes)
    return {"cooked": cooked}

@app.get("/api/cooked-recipes")
async def get_cooked_recipes():
    return load_cooked()
