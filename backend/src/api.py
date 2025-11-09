import random
from fastapi import FastAPI
from upload import router as upload_router
import json
from fastapi.responses import PlainTextResponse
from fastapi import Request, HTTPException



app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

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

DATA_FILE = "../fridge_items.json"

@app.get("/api/fridge-items")
async def get_fridge_items():
    with open(DATA_FILE, "r") as f:
        data = json.load(f)
    return data  # FastAPI will send this as a JSON response

def load_data():
    with open(DATA_FILE) as f:
        return json.load(f)

def save_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f)

@app.post("/api/fridge-items")
async def add_ingredient(item: dict):
    data = load_data()
    name = item["name"]
    expiration = item["expiration"]
    data[name] = expiration
    save_data(data)
    return data

@app.delete("/api/fridge-items/{name}")
async def delete_ingredient(name: str):
    data = load_data()
    if name in data:
        del data[name]
        save_data(data)
        return data
    raise HTTPException(status_code=404, detail="Ingredient not found")