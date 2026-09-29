from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from karina import karina_agent, roadmap_tool
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Request(BaseModel):
    user_input: str


@app.get("/")
def read_root():
    return {"message": "Welcome to Karina AI"}


@app.post("/generate-roadmap")
def generate_roadmap(req: Request):
    # always call roadmap tool directly — no need to decide
    result = roadmap_tool.invoke({"user_input": req.user_input})

    print("RAW RESULT FROM KARINA:", result)

    try:
        clean = result.replace("```json", "").replace("```", "").strip()
        parsed = json.loads(clean)
        print("PARSED RESULT:", parsed)
        
        # Validate required fields
        if "careerDestination" not in parsed or "roadmap" not in parsed:
            return {"error": "Missing required fields in response", "raw": result}
        
        if len(parsed["roadmap"]) != 6:
            return {"error": "Expected 6 phases in roadmap", "actual": len(parsed["roadmap"]), "raw": result}
        
        return parsed
    except Exception as e:
        print("PARSE ERROR:", str(e))
        print("RAW:", result)
        return {"error": str(e), "raw": result}