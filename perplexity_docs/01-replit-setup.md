# Replit Setup Instructions for Simple Project Manager

## Overview
This document provides comprehensive setup instructions for deploying a React Vite frontend with FastAPI backend project on Replit.

## Project Structure
```
simple-project-manager/
├── frontend/                 # React Vite application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Route-level components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API integration layer
│   │   ├── utils/          # Utility functions
│   │   ├── styles/         # Global styles and themes
│   │   ├── assets/         # Static assets
│   │   └── main.tsx        # Application entry point
│   ├── public/             # Public static files
│   ├── package.json        # Frontend dependencies
│   ├── vite.config.js      # Vite configuration
│   └── index.html          # HTML entry point
├── backend/                 # FastAPI application
│   ├── app/
│   │   ├── main.py         # FastAPI entry point
│   │   ├── models/         # Pydantic models
│   │   ├── routers/        # API route handlers
│   │   ├── services/       # Business logic
│   │   ├── database/       # Database configuration
│   │   ├── core/           # Configuration and security
│   │   └── dependencies.py # Shared dependencies
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Environment variables
├── replit.nix             # Replit environment setup
├── .replit                # Replit configuration
├── README.md              # Project documentation
└── run.sh                 # Startup script

```

## Replit Configuration

### 1. Environment Setup (.replit)
```toml
modules = ["python-3.11", "nodejs-20"]

[nix]
channel = "stable-24_05"

[deployment]
run = ["sh", "run.sh"]
deploymentTarget = "cloudrun"

[[ports]]
localPort = 3000
externalPort = 80

[[ports]]
localPort = 8000
externalPort = 8080
```

### 2. Package Configuration (replit.nix)
```nix
{ pkgs }: {
  deps = [
    pkgs.python311
    pkgs.nodejs_20
    pkgs.npm
    pkgs.python311Packages.pip
    pkgs.python311Packages.virtualenv
  ];
  env = {
    PYTHON_LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
      pkgs.python311
    ];
    PYTHONHOME = "${pkgs.python311}";
    PYTHONPATH = "${pkgs.python311}/lib/python3.11/site-packages";
  };
}
```

### 3. Startup Script (run.sh)
```bash
#!/bin/bash

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
pip install -r requirements.txt

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd ../frontend
npm install

# Build frontend for production
echo "Building frontend..."
npm run build

# Copy built frontend to backend static folder
echo "Copying frontend build..."
mkdir -p ../backend/static
cp -r dist/* ../backend/static/

# Start the backend server
echo "Starting FastAPI server..."
cd ../backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 &

# Start the frontend development server (for development mode)
echo "Starting frontend development server..."
cd ../frontend
npm run dev --host 0.0.0.0 --port 3000
```

## Setup Steps

### Step 1: Create New Replit Project
1. Sign in to Replit
2. Click "Create Repl"
3. Select "Python" template
4. Name your project "simple-project-manager"
5. Click "Create Repl"

### Step 2: Configure Environment
1. Create the `.replit` configuration file
2. Create the `replit.nix` file for dependencies
3. Create the `run.sh` startup script
4. Make the startup script executable: `chmod +x run.sh`

### Step 3: Setup Backend Structure
```bash
# Create backend directory structure
mkdir -p backend/app/{models,routers,services,database,core}
touch backend/app/{__init__.py,main.py,dependencies.py}
touch backend/app/models/__init__.py
touch backend/app/routers/__init__.py
touch backend/app/services/__init__.py
touch backend/app/database/__init__.py
touch backend/app/core/__init__.py
touch backend/requirements.txt
touch backend/.env
```

### Step 4: Setup Frontend Structure
```bash
# Create React Vite project
cd frontend
npm create vite@latest . -- --template react-ts
```

### Step 5: Configure Environment Variables
Create `backend/.env`:
```env
# Database Configuration
DATABASE_URL=sqlite:///./app.db

# Security
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS Configuration
CORS_ORIGINS=["http://localhost:3000", "https://your-repl-name.replit.dev"]

# API Configuration
API_VERSION=v1
```

### Step 6: Configure CORS for Development
In `backend/app/main.py`:
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",
    "https://your-repl-name.replit.dev",
    "https://*.replit.dev",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Development Workflow

### Frontend Development (Using Lovable)
1. Use Lovable to design and generate React components
2. Import components into the `frontend/src/components` directory
3. Configure routing in `frontend/src/router/routes.tsx`
4. Test components locally with `npm run dev`

### Backend Development (Using Cursor)
1. Use Cursor to implement API endpoints
2. Follow the modular structure in `backend/app/routers`
3. Test endpoints using FastAPI's automatic docs at `/docs`
4. Implement database models and business logic

### Testing Integration
1. Start both frontend and backend servers
2. Test API calls from frontend to backend
3. Verify CORS configuration is working
4. Test all CRUD operations end-to-end

## Deployment Configuration

### Production Deployment
1. Set deployment target to "Autoscale" for better performance
2. Configure environment variables in Replit Secrets
3. Update CORS origins to include production URL
4. Set up database persistence if needed

### Environment Variables in Replit Secrets
- `DATABASE_URL`: Database connection string
- `SECRET_KEY`: JWT secret key
- `CORS_ORIGINS`: Allowed origins for CORS

## Troubleshooting

### Common Issues
1. **Port conflicts**: Ensure frontend (3000) and backend (8000) use different ports
2. **CORS errors**: Check CORS configuration in FastAPI
3. **Module not found**: Verify Python path and virtual environment
4. **Build failures**: Check Node.js and Python versions compatibility

### Debugging Tips
- Use Replit's built-in debugger for Python
- Check browser console for frontend errors
- Monitor Replit logs for backend issues
- Test API endpoints directly using `/docs` interface

## Performance Optimization

### Frontend Optimization
- Enable Vite's build optimization
- Use lazy loading for routes
- Implement code splitting
- Optimize bundle size

### Backend Optimization
- Use FastAPI's async capabilities
- Implement proper database indexing
- Add response caching where appropriate
- Use connection pooling for database

This setup provides a solid foundation for developing and deploying your project manager application on Replit.