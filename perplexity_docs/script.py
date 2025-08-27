import json
import os
from datetime import datetime

# Create a comprehensive development plan structure
development_plan = {
    "project_name": "Simple Project Manager",
    "tech_stack": {
        "frontend": "React + Vite",
        "backend": "FastAPI",
        "hosting": "Replit",
        "frontend_builder": "Lovable",
        "backend_builder": "Cursor"
    },
    "created_date": datetime.now().isoformat(),
    "version": "1.0.0"
}

# Save the plan overview
with open("project_plan_overview.json", "w") as f:
    json.dump(development_plan, f, indent=2)

print("Development plan overview created")
print(f"Project: {development_plan['project_name']}")
print(f"Tech Stack: {development_plan['tech_stack']}")