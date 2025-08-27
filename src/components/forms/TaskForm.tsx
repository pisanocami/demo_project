
import React from 'react';
import { useForm } from 'react-hook-form';
import { Task, User } from '@/types';
import { mockUsers } from '@/data/mockData';
import { useProjectStore } from '@/store/projectStore';

interface TaskFormData {
  title: string;
  description: string;
  status: Task['status'];
  priority: Task['priority'];
  assigneeId?: string;
  projectId: string;
  dueDate?: string;
}

interface TaskFormProps {
  task?: Task;
  defaultStatus?: Task['status'];
  onSubmit: (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  task,
  defaultStatus = 'todo',
  onSubmit,
  onCancel
}) => {
  const { projects } = useProjectStore();
  const { register, handleSubmit, formState: { errors } } = useForm<TaskFormData>({
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      status: task?.status || defaultStatus,
      priority: task?.priority || 'medium',
      assigneeId: task?.assignee?.id || '',
      projectId: task?.projectId || projects[0]?.id || '',
      dueDate: task?.dueDate ? task.dueDate.toISOString().split('T')[0] : ''
    }
  });

  const onFormSubmit = (data: TaskFormData) => {
    const assignee = data.assigneeId ? mockUsers.find(u => u.id === data.assigneeId) : undefined;
    
    const taskData = {
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      assignee,
      projectId: data.projectId,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined
    };

    onSubmit(taskData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Task Title
        </label>
        <input
          {...register('title', { required: 'Task title is required' })}
          className="input"
          placeholder="Enter task title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          {...register('description')}
          rows={3}
          className="input resize-none"
          placeholder="Enter task description"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select {...register('status')} className="input">
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <select {...register('priority')} className="input">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project
          </label>
          <select {...register('projectId', { required: 'Project is required' })} className="input">
            <option value="">Select project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
          {errors.projectId && (
            <p className="mt-1 text-sm text-red-600">{errors.projectId.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assignee
          </label>
          <select {...register('assigneeId')} className="input">
            <option value="">Unassigned</option>
            {mockUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Due Date
        </label>
        <input
          type="date"
          {...register('dueDate')}
          className="input"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary"
        >
          {task ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};
