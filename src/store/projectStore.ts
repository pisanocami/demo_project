
import { create } from 'zustand';
import { ProjectState } from '@/types';
import { mockProjects } from '@/data/mockData';

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: mockProjects,
  currentProject: null,
  addProject: (projectData) => {
    const newProject = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({
      projects: [...state.projects, newProject],
    }));
  },
  updateProject: (id, updates) => {
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === id
          ? { ...project, ...updates, updatedAt: new Date() }
          : project
      ),
    }));
  },
  deleteProject: (id) => {
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== id),
      currentProject: state.currentProject?.id === id ? null : state.currentProject,
    }));
  },
  setCurrentProject: (project) => {
    set({ currentProject: project });
  },
}));
