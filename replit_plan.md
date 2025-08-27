<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

## 🎯 **Simple Project Manager App - Development Plan**

### **Tech Stack**

- **Frontend:** React + Vite + Tailwind (Lovable)
- **Backend:** FastAPI + SQLite (Cursor)
- **Platform:** Replit for hosting and testing
- **Version Control:** GitHub with regular commits

***

## 📋 **Loom Video Organization Plan**

### **Phase 1: Strategic Planning with Perplexity (30 seconds)**

*Screen: Perplexity AI*

**Prompt to use:**

```
"Create a comprehensive development plan for a simple project manager app using React Vite frontend and FastAPI backend, hosted on Replit. 

Please provide:
1. Project structure and setup instructions for Replit
2. Complete project documentation outline
3. Frontend components list (to be built with Lovable)
4. API endpoints specification with request/response examples
5. Step-by-step development workflow

The frontend should be built exclusively with Lovable focusing on components and UI, while preparing documented endpoint placeholders. Then backend API implementation will follow with Cursor."
```

- Show generated plan and project structure
- **Output:** Complete development roadmap


### **Phase 2: Frontend Development with Lovable (45 seconds)**

*Screen: Lovable*

- Create React components based on Perplexity's plan
- Build: Dashboard, ProjectList, ProjectCard, ProjectForm, Header
- **Key focus:** Document API endpoint integration points
- Show code comments explaining where endpoints will be added:

```javascript
// TODO: Connect to GET /api/projects
// TODO: Connect to POST /api/projects
// TODO: Connect to PUT /api/projects/{id}
// TODO: Connect to DELETE /api/projects/{id}
```


### **Phase 3: Replit Setup \& Initial Commit (20 seconds)**

*Screen: Replit + GitHub*

- Create new Replit project with frontend code
- Push initial commit to GitHub
- Show Replit file structure


### **Phase 4: Backend API with Cursor (50 seconds)**

*Screen: Cursor*

- Implement FastAPI backend following the documented plan
- Create endpoints matching frontend documentation
- Show real-time coding with AI assistance
- **Regular commits:** Show git commits as features are completed


### **Phase 5: Integration \& Testing in Replit (25 seconds)**

*Screen: Replit + Browser*

- Connect frontend to backend
- Test full CRUD functionality live in Replit
- Show working application with real data flow
- Final commit with working version


### **Phase 6: Final Documentation Update (10 seconds)**

*Screen: GitHub/Documentation*

- Show updated README with setup instructions
- Display final project structure
- Quick demo of completed app

***

## 🛠 **Expected Project Structure**

```
project-manager/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
├── backend/
│   ├── main.py
│   ├── models/
│   ├── routes/
│   └── requirements.txt
├── .replit
├── replit.nix
└── README.md
```


## ⚡ **Key Commands for Video**

```bash
# Replit console
npm create vite@latest frontend --template react
pip install fastapi uvicorn sqlalchemy
git add . && git commit -m "feat: initial setup"
```

**Total Duration: ~3 minutes**

Ready to start recording with this plan? 🚀

