
import { create } from 'zustand';
import { TaskState } from '@/types';
import { mockTasks } from '@/data/mockData';

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: mockTasks,
  addTask: (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({
      tasks: [...state.tasks, newTask],
    }));
  },
  updateTask: (id, updates) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      ),
    }));
  },
  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },
  moveTask: (taskId, newStatus) => {
    const { updateTask } = get();
    updateTask(taskId, { status: newStatus });
  },
}));
