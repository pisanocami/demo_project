from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Optional
from pydantic import BaseModel
from datetime import datetime
import uuid

app = FastAPI(title="Project Manager API")

# In-memory storage
projects_db: Dict[str, dict] = {}
tasks_db: Dict[str, dict] = {}

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class ProjectBase(BaseModel):
    name: str
    description: str = ""

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: str
    created_at: datetime
    updated_at: datetime

class TaskBase(BaseModel):
    title: str
    description: str = ""
    project_id: str
    status: str = "todo"  # todo, in_progress, done

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: str
    created_at: datetime
    updated_at: datetime

# Helper functions
def get_current_time() -> str:
    return datetime.utcnow().isoformat()

# Projects endpoints
@app.get("/api/projects", response_model=List[Project])
async def list_projects():
    return list(projects_db.values())

@app.post("/api/projects", response_model=Project, status_code=status.HTTP_201_CREATED)
async def create_project(project: ProjectCreate):
    project_id = str(uuid.uuid4())
    now = get_current_time()
    db_project = {
        "id": project_id,
        **project.dict(),
        "created_at": now,
        "updated_at": now
    }
    projects_db[project_id] = db_project
    return db_project

# Tasks endpoints
@app.get("/api/projects/{project_id}/tasks", response_model=List[Task])
async def list_tasks(project_id: str):
    return [task for task in tasks_db.values() if task["project_id"] == project_id]

@app.post("/api/tasks", response_model=Task, status_code=status.HTTP_201_CREATED)
async def create_task(task: TaskCreate):
    if task.project_id not in projects_db:
        raise HTTPException(status_code=404, detail="Project not found")
        
    task_id = str(uuid.uuid4())
    now = get_current_time()
    db_task = {
        "id": task_id,
        **task.dict(),
        "created_at": now,
        "updated_at": now
    }
    tasks_db[task_id] = db_task
    return db_task

@app.get("/")
async def root():
    return {"message": "Welcome to Project Manager API - Using In-Memory Storage"}
