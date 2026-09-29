import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.tools import tool

load_dotenv()

llm = ChatGroq(
    model="qwen/qwen3.8-27b",
    temperature=0.7,
    groq_api_key=os.getenv("GROQ_API_KEY")
)

# ✅ FIXED POSITION
system_prompt = SystemMessage(
    content="""
You are Karina, a smart AI CAREER ASSISTANT.

Rules:
- Be friendly
- Give structured and easy-to-understand answers
- Help with career guidance
- Always follow the JSON format strictly when generating roadmaps
- Do NOT add extra text outside JSON
"""
)

# ✅ TOOL 1
@tool
def roadmap_tool(user_input: str) -> str:
    """Generate career roadmap"""

    prompt = f"""
User Profile:

{user_input}

Analyze the user's existing skills.
Skip fundamentals already covered.
Create roadmap based on skill gaps.


Return ONLY this JSON with EXACTLY 6 phases. No text outside JSON:

{{
  "careerDestination": {{
    "bestRole": "best role here",
    "roles": ["role1", "role2", "role3"]
  }},
  "roadmap": [
    {{
      "id": "01",
      "title": "Phase title here",
      "description": "2 line description",
      "outcome": "1 line outcome",
      "tasks": ["task 1", "task 2", "task 3", "task 4"],
      "duration": "2 weeks",
      "learningSources": ["Source name - https://url.com", "Source name - https://url.com"]
    }},
    {{
      "id": "02",
      "title": "Phase 2 title",
      "description": "2 line description",
      "outcome": "1 line outcome",
      "tasks": ["task 1", "task 2", "task 3", "task 4"],
      "duration": "2 weeks",
      "learningSources": ["Source name - https://url.com", "Source name - https://url.com"]
    }},
    {{
      "id": "03",
      "title": "Phase 3 title",
      "description": "2 line description",
      "outcome": "1 line outcome",
      "tasks": ["task 1", "task 2", "task 3", "task 4"],
      "duration": "2 weeks",
      "learningSources": ["Source name - https://url.com", "Source name - https://url.com"]
    }},
    {{
      "id": "04",
      "title": "Phase 4 title",
      "description": "2 line description",
      "outcome": "1 line outcome",
      "tasks": ["task 1", "task 2", "task 3", "task 4"],
      "duration": "2 weeks",
      "learningSources": ["Source name - https://url.com", "Source name - https://url.com"]
    }},
    {{
      "id": "05",
      "title": "Phase 5 title",
      "description": "2 line description",
      "outcome": "1 line outcome",
      "tasks": ["task 1", "task 2", "task 3", "task 4"],
      "duration": "2 weeks",
      "learningSources": ["Source name - https://url.com", "Source name - https://url.com"]
    }},
    {{
      "id": "06",
      "title": "Phase 6 title",
      "description": "2 line description",
      "outcome": "1 line outcome",
      "tasks": ["task 1", "task 2", "task 3", "task 4"],
      "duration": "2 weeks",
      "learningSources": ["Source name - https://url.com", "Source name - https://url.com"]
    }}
  ]
}}
"""

    response = llm.invoke([system_prompt, HumanMessage(content=prompt)])
    return response.content

# ✅ TOOL 2
@tool
def chat_tool(user_input: str) -> str:
    """Handle normal conversations"""

    response = llm.invoke([system_prompt, HumanMessage(content=user_input)])
    return response.content

# ✅ TOOL 3
@tool
def skill_tool(user_input: str) -> str:
    """Analyze skills and suggest improvements"""

    prompt = f"Analyze skills and suggest improvements: {user_input}"
    response = llm.invoke([system_prompt, HumanMessage(content=prompt)])
    return response.content

# ✅ DECISION
def decide_action(user_input):
    text = user_input.lower()

    # structured input from FreeTrial form always has "goal:"
    if "goal" in text or "roadmap" in text or "become" in text or "age" in text:
        return "roadmap"
    elif "skill" in text:
        return "skill"
    else:
        return "chat"

# ✅ AGENT
def karina_agent(user_input):
    action = decide_action(user_input)

    if action == "roadmap":
        return roadmap_tool.invoke({"user_input": user_input})

    elif action == "skill":
        return skill_tool.invoke({"user_input": user_input})

    else:
        return chat_tool.invoke({"user_input": user_input})

