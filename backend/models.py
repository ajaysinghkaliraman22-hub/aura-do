from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class SubTask(BaseModel):
    id: str
    title: str
    completed: bool = False
    estimated_minutes: int = 15

class TaskBase(BaseModel):
    title: str
    deadline: Optional[datetime] = None

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    deadline: Optional[datetime] = None
    completed: Optional[bool] = None

class Task(TaskBase):
    id: str
    completed: bool = False
    priority: str = "Medium" # High, Medium, Low
    sub_tasks: List[SubTask] = []
    
    class Config:
        from_attributes = True
