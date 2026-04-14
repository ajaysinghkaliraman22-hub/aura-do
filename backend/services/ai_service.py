from datetime import datetime, timezone
import uuid
import re
from typing import List

def determine_priority(deadline: datetime | None) -> str:
    if not deadline:
        return "Low"
    
    # Simple rule-based priority for now
    now = datetime.now(timezone.utc)
    # Ensure deadline is timezone aware for comparison if now is tz aware, or strip both
    if deadline.tzinfo is None:
        now = now.replace(tzinfo=None)
        
    time_diff = deadline - now
    
    if time_diff.total_seconds() < 24 * 3600: # Less than 24 hours
        return "High"
    elif time_diff.total_seconds() < 7 * 24 * 3600: # Less than 7 days
        return "Medium"
    return "Low"

def generate_subtasks(title: str) -> List[dict]:
    # Mock LLM API call
    # In a real scenario, this would call OpenAI or Gemini
    # with a prompt like "Break down this task into 15-minute actionable sub-tasks"
    
    print(f"Mock LLM: Generating subtasks for '{title}'")
    
    # Some generic sub-tasks based on the title length as a dummy logic
    words = title.split()
    sub_tasks = []
    
    if len(words) <= 2:
        sub_tasks.append({
            "id": str(uuid.uuid4()),
            "title": f"Initial research on {title}",
            "completed": False,
            "estimated_minutes": 15
        })
        sub_tasks.append({
            "id": str(uuid.uuid4()),
            "title": f"Execute main steps for {title}",
            "completed": False,
            "estimated_minutes": 15
        })
    else:
        sub_tasks.append({
            "id": str(uuid.uuid4()),
            "title": "Analyze and outline approach",
            "completed": False,
            "estimated_minutes": 15
        })
        sub_tasks.append({
            "id": str(uuid.uuid4()),
            "title": "Gather necessary resources",
            "completed": False,
            "estimated_minutes": 15
        })
        sub_tasks.append({
            "id": str(uuid.uuid4()),
            "title": "Draft initial implementation",
            "completed": False,
            "estimated_minutes": 15
        })
        
    return sub_tasks
