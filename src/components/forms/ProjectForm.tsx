
import React from 'react';
import { useForm } from 'react-hook-form';
import { Project } from '@/types';
import { mockUsers } from '@/data/mockData';

interface ProjectFormData {
  name: string;
  description: string;
  status: Project['status'];
  dueDate?: string;
  memberIds: string[];
}

interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
  onSubmit,
  onCancel
}) => {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<ProjectFormData>({
    defaultValues: {
      name: project?.name || '',
      description: project?.description || '',
      status: project?.status || 'active',
      dueDate: project?.dueDate ? project.dueDate.toISOString().split('T')[0] : '',
      memberIds: project?.members.map(m => m.id) || []
    }
  });

  const selectedMemberIds = watch('memberIds');

  const onFormSubmit = (data: ProjectFormData) => {
    const selectedMembers = mockUsers.filter(user => data.memberIds.includes(user.id));
    
    const projectData = {
      name: data.name,
      description: data.description,
      status: data.status,
      progress: project?.progress || 0,
      members: selectedMembers,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined
    };

    onSubmit(projectData);
  };

  const toggleMember = (userId: string) => {
    const currentIds = selectedMemberIds;
    const newIds = currentIds.includes(userId)
      ? currentIds.filter(id => id !== userId)
      : [...currentIds, userId];
    setValue('memberIds', newIds);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Name
        </label>
        <input
          {...register('name', { required: 'Project name is required' })}
          className="input"
          placeholder="Enter project name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          {...register('description', { required: 'Description is required' })}
          rows={3}
          className="input resize-none"
          placeholder="Enter project description"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select {...register('status')} className="input">
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
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
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Team Members
        </label>
        <div className="space-y-2">
          {mockUsers.map((user) => (
            <label key={user.id} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedMemberIds.includes(user.id)}
                onChange={() => toggleMember(user.id)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <div className="flex items-center space-x-2">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm text-gray-700">{user.name}</span>
              </div>
            </label>
          ))}
        </div>
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
          {project ? 'Update Project' : 'Create Project'}
        </button>
      </div>
    </form>
  );
};
