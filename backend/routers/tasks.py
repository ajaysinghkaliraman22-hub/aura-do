from fastapi import APIRouter, HTTPException
from typing import List
import uuid
from models import Task, TaskCreate, TaskUpdate, SubTask
from services.ai_service import determine_priority, generate_subtasks

router = APIRouter(prefix="/tasks", tags=["tasks"])

# In-memory storage for demonstration purposes
db_tasks = {}

@router.post("/", response_model=Task)
async def create_task(task_in: TaskCreate):
    task_id = str(uuid.uuid4())
    
    priority = determine_priority(task_in.deadline)
    sub_tasks_raw = generate_subtasks(task_in.title)
    
    sub_tasks = [SubTask(**st) for st in sub_tasks_raw]
    
    task = Task(
        id=task_id,
        title=task_in.title,
        deadline=task_in.deadline,
        priority=priority,
        sub_tasks=sub_tasks
    )
    
    db_tasks[task_id] = task
    return task

@router.get("/", response_model=List[Task])
async def get_tasks():
    return list(db_tasks.values())

@router.get("/{task_id}", response_model=Task)
async def get_task(task_id: str):
    if task_id not in db_tasks:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_tasks[task_id]

@router.put("/{task_id}", response_model=Task)
async def update_task(task_id: str, task_in: TaskUpdate):
    if task_id not in db_tasks:
        raise HTTPException(status_code=404, detail="Task not found")
    
    existing_task = db_tasks[task_id]
    
    if task_in.title is not None:
        existing_task.title = task_in.title
    if task_in.deadline is not None:
        existing_task.deadline = task_in.deadline
        # Re-evaluate priority
        existing_task.priority = determine_priority(task_in.deadline)
    if task_in.completed is not None:
        existing_task.completed = task_in.completed
        
    return existing_task

@router.delete("/{task_id}")
async def delete_task(task_id: str):
    if task_id not in db_tasks:
        raise HTTPException(status_code=404, detail="Task not found")
    
    del db_tasks[task_id]
    return {"status": "success"}

@router.put("/{task_id}/subtasks/{subtask_id}")
async def toggle_subtask(task_id: str, subtask_id: str, completed: bool):
    if task_id not in db_tasks:
        raise HTTPException(status_code=404, detail="Task not found")
    
    task = db_tasks[task_id]
    for st in task.sub_tasks:
        if st.id == subtask_id:
            st.completed = completed
            return task
            
    raise HTTPException(status_code=404, detail="Subtask not found")
