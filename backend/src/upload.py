from fastapi import APIRouter, UploadFile, File
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

    # #to avoid overwriting files
    # filename = f"{os.path.splitext(file.filename)[0]}_items.json"
    # with open(filename, "w") as f:
    #     json.dump(items_list, f, indent=2)
    
    return {"message": "Saved fridge items to fridge_items.json", "count": len(items_list)}

    

    