from fastapi import APIRouter, UploadFile, File
from fastapi import Request
import gemini_integration
import json
import os

router = APIRouter(prefix="/files", tags=["files"])

@router.post("/testing_upload")
async def upload_file(file: UploadFile = File(...)):
    contents = await file.read()
    print(f"✅ Received: {file.filename}, size: {len(contents)} bytes")
    return {"message": f"File {file.filename} received successfully!"}

@router.post("/analyze")
async def analyze_fridge(file: UploadFile = File(...)):
    contents = await file.read()
    result = gemini_integration.analyze_image_with_gemini(contents, file.content_type)
    if isinstance(result, bytes):
        result = result.decode("utf-8")  # Convert bytes → string
    # Debug
    # print("Type of result:", type(result))
    # return {"response": result}
    items_list = json.loads(result)
    with open("fridge_items.json", "w") as f:
        json.dump(items_list, f, indent=2)

@router.get("/fridge_items")
def get_fridge_items():
    """
    Returns the ingredients detected by Gemini (from fridge_items.json)
    """
    try:
        with open("fridge_items.json", "r") as f:
            data = json.load(f)
        return data
    except FileNotFoundError:
        return {"error": "fridge_items.json not found. Please upload and analyze an image first."}
    

@router.post("/update_ingredients")
async def update_ingredients(request: Request):
    updated_data = await request.json()
    with open("fridge_items.json", "w") as f:
        json.dump(updated_data, f, indent=2)
    return {"message": "Ingredients updated successfully", "count": len(updated_data)}


    # return {"message": "Saved fridge items to fridge_items.json", "count": len(items_list)}

    

    