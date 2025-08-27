import { create } from 'zustand';
import { api, Project, Task } from '../utils/api';

interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  createProject: (name: string, description?: string) => Promise<void>;
  getProjectTasks: (projectId: string) => Promise<Task[]>;
  createTask: (task: {
    title: string;
    description?: string;
    project_id: string;
    status?: 'todo' | 'in_progress' | 'done';
  }) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  loading: false,
  error: null,

  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const projects = await api.getProjects();
      set({ projects, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch projects', loading: false });
    }
  },

  createProject: async (name: string, description = '') => {
    try {
      const newProject = await api.createProject({ name, description });
      set((state) => ({
        projects: [...state.projects, newProject],
      }));
    } catch (error) {
      set({ error: 'Failed to create project' });
      throw error;
    }
  },

  getProjectTasks: async (projectId: string) => {
    try {
      return await api.getProjectTasks(projectId);
    } catch (error) {
      set({ error: 'Failed to fetch tasks' });
      throw error;
    }
  },

  createTask: async (task) => {
    try {
      await api.createTask(task);
    } catch (error) {
      set({ error: 'Failed to create task' });
      throw error;
    }
  },
}));
