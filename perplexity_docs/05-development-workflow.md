# Step-by-Step Development Workflow

This workflow assumes two parallel Repls on Replit:
- **frontend-repl** – React + Vite (UI & mock data)
- **backend-repl** – FastAPI (real API, built later in Cursor)

Use Replit’s built-in Git integration and Branch Previews.

---
## Phase 0 ⟶ Project Bootstrap (Day 1)
1. **Fork Template Repls**
   - Frontend: `npx create-vite@latest frontend -- --template react-ts`
   - Backend: `poetry new backend && cd backend`
2. Commit initial skeleton to `main`.
3. Push Repls to GitHub for external backups.

---
## Phase 1 ⟶ UI First (Days 1-4)
1. **Design Components in Lovable**
   - Export JSX for C1-C5 (core shell).
2. **Integrate Components**
   - Copy to `frontend/src/components`.
   - Wire routing (`react-router-dom`).
3. **Mock API with MSW**
   - Create handlers matching `04-api-specification.md`.
4. **State Management**
   - Context + `useReducer` for projects & tasks.
5. **Responsive Layout & Theming**
6. **PR → `develop` → Merge when CI passes.**

---
## Phase 2 ⟶ Remaining UI (Days 5-7)
1. Build Forms & Modals (C6-C12).
2. Implement optimistic updates via MSW.
3. Accessibility pass (a11y-lint).
4. Storybook docs for each component.

---
## Phase 3 ⟶ Real API Scaffolding (Days 8-10)
1. Switch to **backend-repl** (Cursor).
2. Generate FastAPI project using Cookiecutter.
3. Paste `04-api-specification.md` into `openapi.yaml`; use `fastapi-codegen` to scaffold routes & Pydantic models.
4. Add SQLite via SQLModel.
5. Enable CORS for frontend domain.
6. Write unit tests (pytest).

---
## Phase 4 ⟶ Front–Back Integration (Days 11-12)
1. Replace MSW base URL with live backend URL from Secrets.
2. Test all CRUD flows end-to-end.
3. Add error boundaries & toast notifications.

---
## Phase 5 ⟶ Deployment & QA (Days 13-14)
1. Set Replit **Autoscale** deployment for each Repl.
2. Configure env vars (DATABASE_URL, SECRET_KEY, CORS_ORIGINS).
3. Lighthouse & API load tests.
4. Tag `v1.0.0` release.

---
## CI/CD Checklist
- **Frontend**: `npm run lint && npm run build`
- **Backend**: `pytest && ruff .` → build Docker image
- Auto-deploy on `main` push.

---
## Project Board Columns
1. Backlog
2. In Progress
3. Review
4. QA
5. Done

Use GitHub Projects or Replit issue tracker linked to commits (`#DOC-06`).