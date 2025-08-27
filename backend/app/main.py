from fastapi import FastAPI, HTTPException, status, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Optional
from pydantic import BaseModel, Field
from datetime import datetime
from enum import Enum
import uuid

app = FastAPI(
    title="Project Manager API",
    description="API for managing projects and tasks with in-memory storage",
    version="1.0.0"
)

# In-memory storage
projects_db: Dict[str, dict] = {}
tasks_db: Dict[str, dict] = {}

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Enums
class TaskStatus(str, Enum):
    TODO = "todo"
    IN_PROGRESS = "in_progress"
    DONE = "done"

# Models
class ProjectBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100, example="My Project")
    description: str = Field(default="", max_length=500, example="Project description")

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: str = Field(..., example="550e8400-e29b-41d4-a716-446655440000")
    created_at: datetime = Field(..., example="2023-01-01T12:00:00Z")
    updated_at: datetime = Field(..., example="2023-01-01T12:00:00Z")

    class Config:
        json_schema_extra = {
            "example": {
                "id": "550e8400-e29b-41d4-a716-446655440000",
                "name": "My Project",
                "description": "Project description",
                "created_at": "2023-01-01T12:00:00Z",
                "updated_at": "2023-01-01T12:00:00Z"
            }
        }

class TaskBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=100, example="Implement feature X")
    description: str = Field(default="", max_length=500, example="Task details")
    project_id: str = Field(..., example="550e8400-e29b-41d4-a716-446655440000")
    status: TaskStatus = Field(default=TaskStatus.TODO, example="todo")

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: str = Field(..., example="550e8400-e29b-41d4-a716-446655440000")
    created_at: datetime = Field(..., example="2023-01-01T12:00:00Z")
    updated_at: datetime = Field(..., example="2023-01-01T12:00:00Z")

    class Config:
        json_schema_extra = {
            "example": {
                "id": "550e8400-e29b-41d4-a716-446655440000",
                "title": "Implement feature X",
                "description": "Task details",
                "project_id": "550e8400-e29b-41d4-a716-446655440000",
                "status": "todo",
                "created_at": "2023-01-01T12:00:00Z",
                "updated_at": "2023-01-01T12:00:00Z"
            }
        }

# Helper functions
def get_project_or_404(project_id: str) -> dict:
    """Get project by ID or raise 404 if not found"""
    if project_id not in projects_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with ID {project_id} not found"
        )
    return projects_db[project_id]

def get_task_or_404(task_id: str) -> dict:
    """Get task by ID or raise 404 if not found"""
    if task_id not in tasks_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with ID {task_id} not found"
        )
    return tasks_db[task_id]

def get_current_time() -> str:
    return datetime.utcnow().isoformat()

# Projects endpoints
@app.get(
    "/api/projects",
    response_model=List[Project],
    summary="List all projects",
    description="Retrieve a list of all projects with their details"
)
async def list_projects():
    """List all projects"""
    return list(projects_db.values())

@app.post(
    "/api/projects",
    response_model=Project,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new project",
    description="Create a new project with the given details"
)
async def create_project(project: ProjectCreate):
    """Create a new project"""
    project_id = str(uuid.uuid4())
    now = datetime.utcnow()
    project_data = project.dict()
    project_data.update({
        "id": project_id,
        "created_at": now,
        "updated_at": now
    })
    projects_db[project_id] = project_data
    return project_data

@app.get(
    "/api/projects/{project_id}",
    response_model=Project,
    summary="Get project by ID",
    responses={
        404: {"description": "Project not found"}
    }
)
async def get_project(project_id: str):
    """Get a specific project by its ID"""
    return get_project_or_404(project_id)

@app.put(
    "/api/projects/{project_id}",
    response_model=Project,
    summary="Update a project",
    responses={
        404: {"description": "Project not found"}
    }
)
async def update_project(project_id: str, project: ProjectCreate):
    """Update an existing project"""
    existing_project = get_project_or_404(project_id)
    update_data = project.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    projects_db[project_id] = {**existing_project, **update_data}
    return projects_db[project_id]

@app.delete(
    "/api/projects/{project_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a project",
    responses={
        404: {"description": "Project not found"}
    }
)
async def delete_project(project_id: str):
    """Delete a project and all its tasks"""
    get_project_or_404(project_id)
    del projects_db[project_id]
    # Delete all tasks associated with this project
    for task_id in list(tasks_db.keys()):
        if tasks_db[task_id]["project_id"] == project_id:
            del tasks_db[task_id]
    return None

# Tasks endpoints
@app.get(
    "/api/tasks",
    response_model=List[Task],
    summary="List tasks",
    description="List all tasks, optionally filtered by project_id or status"
)
async def list_tasks(
    project_id: Optional[str] = Query(None, description="Filter tasks by project ID"),
    status: Optional[TaskStatus] = Query(None, description="Filter tasks by status")
):
    """List tasks with optional filtering by project_id and/or status"""
    tasks = list(tasks_db.values())
    if project_id:
        tasks = [t for t in tasks if t["project_id"] == project_id]
    if status:
        tasks = [t for t in tasks if t["status"] == status]
    return tasks

@app.post(
    "/api/tasks",
    response_model=Task,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new task",
    responses={
        404: {"description": "Project not found"}
    }
)
async def create_task(task: TaskCreate):
    """Create a new task"""
    # Verify project exists
    get_project_or_404(task.project_id)
    
    task_id = str(uuid.uuid4())
    now = datetime.utcnow()
    task_data = task.dict()
    task_data.update({
        "id": task_id,
        "created_at": now,
        "updated_at": now,
        "status": task.status.value  # Store the enum value
    })
    tasks_db[task_id] = task_data
    return task_data

@app.get(
    "/api/tasks/{task_id}",
    response_model=Task,
    summary="Get task by ID",
    responses={
        404: {"description": "Task not found"}
    }
)
async def get_task(task_id: str):
    """Get a specific task by its ID"""
    return get_task_or_404(task_id)

@app.put(
    "/api/tasks/{task_id}",
    response_model=Task,
    summary="Update a task",
    responses={
        404: {"description": "Task or project not found"}
    }
)
async def update_task(task_id: str, task: TaskCreate):
    """Update an existing task"""
    existing_task = get_task_or_404(task_id)
    # Verify project exists if project_id is being updated
    if task.project_id != existing_task["project_id"]:
        get_project_or_404(task.project_id)
    
    update_data = task.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    tasks_db[task_id] = {**existing_task, **update_data}
    return tasks_db[task_id]

@app.patch(
    "/api/tasks/{task_id}/status",
    response_model=Task,
    summary="Update task status",
    responses={
        404: {"description": "Task not found"},
        422: {"description": "Invalid status value"}
    }
)
async def update_task_status(
    task_id: str,
    status: TaskStatus = Query(..., description="New status for the task")
):
    """Update only the status of a task"""
    task = get_task_or_404(task_id)
    task["status"] = status.value
    task["updated_at"] = datetime.utcnow()
    tasks_db[task_id] = task
    return task

@app.delete(
    "/api/tasks/{task_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a task",
    responses={
        404: {"description": "Task not found"}
    }
)
async def delete_task(task_id: str):
    """Delete a task"""
    get_task_or_404(task_id)
    del tasks_db[task_id]
    return None

# Health check endpoint
@app.get(
    "/health",
    summary="Health check",
    description="Check if the API is running"
)
async def health_check():
    """Health check endpoint"""
    return {
        "status": "ok",
        "timestamp": datetime.utcnow().isoformat(),
        "projects_count": len(projects_db),
        "tasks_count": len(tasks_db)
    }

# Root endpoint
@app.get(
    "/",
    summary="API Root",
    description="Root endpoint with API information"
)
async def root():
    """Root endpoint"""
    return {
        "message": "Project Manager API is running",
        "documentation": "/docs",
        "version": "1.0.0"
    }
