const API_BASE_URL = '/api';

export interface Project {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  project_id: string;
  status: 'todo' | 'in_progress' | 'done';
  created_at: string;
  updated_at: string;
}

export const api = {
  // Projects
  getProjects: async (): Promise<Project[]> => {
    const response = await fetch(`${API_BASE_URL}/projects`);
    return response.json();
  },

  createProject: async (data: { name: string; description?: string }): Promise<Project> => {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Tasks
  getProjectTasks: async (projectId: string): Promise<Task[]> => {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks`);
    return response.json();
  },

  createTask: async (data: {
    title: string;
    description?: string;
    project_id: string;
    status?: 'todo' | 'in_progress' | 'done';
  }): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        status: data.status || 'todo',
      }),
    });
    return response.json();
  },
};
