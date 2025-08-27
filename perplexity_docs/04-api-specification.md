# API Endpoints Specification (Placeholder)

> The backend will be implemented later in Cursor. This specification defines placeholder endpoints for the React frontend to consume. Once the backend is ready, update examples and schemas accordingly.

OpenAPI 3.1 excerpt (YAML):
```yaml
openapi: 3.1.0
info:
  title: Simple Project Manager API
  version: 0.1.0
  description: RESTful API for managing projects, tasks, and users.
servers:
  - url: https://{subdomain}.repl.co/api/v1
    variables:
      subdomain:
        default: your-repl-name
paths:
  /auth/register:
    post:
      summary: Create a new user account
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserCreate'
      responses:
        '201':
          description: User registered
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthTokens'
  /auth/login:
    post:
      summary: User login
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserLogin'
      responses:
        '200':
          description: Login successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthTokens'
  /projects:
    get:
      summary: Get all projects
      responses:
        '200':
          description: List of projects
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Project'
    post:
      summary: Create a project
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ProjectCreate'
      responses:
        '201':
          description: Project created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Project'
  /projects/{projectId}:
    get:
      summary: Get a project by ID
      parameters:
        - in: path
          name: projectId
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: Project details
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Project'
    put:
      summary: Update a project
      parameters:
        - in: path
          name: projectId
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ProjectUpdate'
      responses:
        '200':
          description: Project updated
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Project'
    delete:
      summary: Delete a project
      parameters:
        - in: path
          name: projectId
          required: true
          schema:
            type: integer
      responses:
        '204':
          description: Deleted
  /projects/{projectId}/tasks:
    get:
      summary: List tasks in a project
      parameters:
        - in: path
          name: projectId
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: List of tasks
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Task'
    post:
      summary: Create task in project
      parameters:
        - in: path
          name: projectId
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TaskCreate'
      responses:
        '201':
          description: Task created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Task'
components:
  schemas:
    UserCreate:
      type: object
      required: [email, password]
      properties:
        email:
          type: string
          format: email
        password:
          type: string
          minLength: 8
    UserLogin:
      type: object
      required: [email, password]
      properties:
        email:
          type: string
          format: email
        password:
          type: string
    AuthTokens:
      type: object
      properties:
        access_token:
          type: string
        token_type:
          type: string
          example: bearer
    Project:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        description:
          type: string
        status:
          type: string
          enum: [active, completed, archived]
        progress:
          type: integer
          minimum: 0
          maximum: 100
    ProjectCreate:
      allOf:
        - $ref: '#/components/schemas/Project'
        - required: [name]
    ProjectUpdate:
      allOf:
        - $ref: '#/components/schemas/Project'
    Task:
      type: object
      properties:
        id:
          type: integer
        title:
          type: string
        description:
          type: string
        status:
          type: string
          enum: [todo, doing, done]
        due_date:
          type: string
          format: date-time
        assignees:
          type: array
          items:
            type: integer
    TaskCreate:
      allOf:
        - $ref: '#/components/schemas/Task'
        - required: [title]
```

## Example Requests

1. **Create Project**
```http
POST /api/v1/projects
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "Website Redesign",
  "description": "Refresh company landing page",
  "status": "active"
}
```

2. **List Tasks**
```http
GET /api/v1/projects/42/tasks
Authorization: Bearer <token>
```

3. **Move Task to Done**
```http
PUT /api/v1/projects/42/tasks/99
Content-Type: application/json
Authorization: Bearer <token>

{
  "status": "done"
}
```

> **Note:** Until the backend is implemented, the frontend should mock these endpoints with MSW (Mock Service Worker) or similar.