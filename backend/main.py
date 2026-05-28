from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from googletrans import Translator
import uvicorn

app = FastAPI(title="NEXUS AI Translator")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

translator = Translator()

class TranslateRequest(BaseModel):
    text: str
    source_language: str = "auto"
    target_language: str

@app.get("/")
def home():
    return {
        "message": "NEXUS Translator API is Running 🚀",
        "status": "healthy"
    }

@app.post("/translate")
async def translate_text(request: TranslateRequest):
    try:
        translated = translator.translate(
            text=request.text,
            src=request.source_language,
            dest=request.target_language
        )
        
        return {
            "success": True,
            "original_text": request.text,
            "translated_text": translated.text,
            "source_language": request.source_language,
            "target_language": request.target_language,
            "detected_language": translated.src
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "message": "Translation failed. Please try again."
        }

# Run with: uvicorn main:app --reload
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
    