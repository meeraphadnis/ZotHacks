import random
from fastapi import FastAPI
from upload import router as upload_router
import json
from fastapi.responses import PlainTextResponse


app = FastAPI()

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

@app.get("/api/fridge-items")
async def get_fridge_items():
    with open("../fridge_items.json") as f:
        data = json.load(f)
    return data  # FastAPI will send this as a JSON response