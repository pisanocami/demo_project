
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Calendar, Users } from 'lucide-react';
import { useProjectStore } from '@/store/projectStore';
import { useTaskStore } from '@/store/taskStore';
import { TaskCard } from '@/components/tasks/TaskCard';
import { TaskForm } from '@/components/forms/TaskForm';
import { ProjectForm } from '@/components/forms/ProjectForm';
import { Modal } from '@/components/ui/Modal';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { AvatarGroup } from '@/components/ui/Avatar';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { EmptyState } from '@/components/ui/EmptyState';
import { Task } from '@/types';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, updateProject, deleteProject } = useProjectStore();
  const { tasks, addTask, updateTask, deleteTask } = useTaskStore();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const project = projects.find(p => p.id === id);
  const projectTasks = tasks.filter(t => t.projectId === id);

  if (!project) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Project not found</h1>
          <p className="text-gray-600 mb-4">The project you're looking for doesn't exist.</p>
          <Link to="/projects" className="btn-primary">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleDeleteTask = (task: Task) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  const handleTaskSubmit = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask({ ...taskData, projectId: project.id });
    }
    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  const handleProjectSubmit = (projectData: any) => {
    updateProject(project.id, projectData);
    setIsProjectModalOpen(false);
  };

  const handleDeleteProject = () => {
    if (window.confirm('Are you sure you want to delete this project? All tasks will also be deleted.')) {
      deleteProject(project.id);
      // Navigate back to projects page would happen here
    }
  };

  // Group tasks by status
  const tasksByStatus = {
    todo: projectTasks.filter(t => t.status === 'todo'),
    'in-progress': projectTasks.filter(t => t.status === 'in-progress'),
    completed: projectTasks.filter(t => t.status === 'completed')
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumbs items={[
            { label: 'Projects', href: '/projects' },
            { label: project.name }
          ]} />
          <h1 className="text-2xl font-bold text-gray-900 mt-2">{project.name}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsProjectModalOpen(true)}
            className="btn-secondary inline-flex items-center"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </button>
          <button
            onClick={handleDeleteProject}
            className="bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2 px-4 rounded-lg transition-colors inline-flex items-center"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </button>
        </div>
      </div>

      {/* Project Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
            <p className="text-gray-600">{project.description}</p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Tasks</h2>
              <button
                onClick={handleCreateTask}
                className="btn-primary inline-flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </button>
            </div>

            {projectTasks.length > 0 ? (
              <div className="space-y-6">
                {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
                  <div key={status}>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                      {status === 'in-progress' ? 'In Progress' : status === 'todo' ? 'To Do' : 'Completed'} ({statusTasks.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {statusTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onEdit={handleEditTask}
                          onDelete={handleDeleteTask}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Plus}
                title="No tasks yet"
                description="Get started by adding the first task to this project."
                action={{
                  label: "Add Task",
                  onClick: handleCreateTask
                }}
              />
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Progress</h3>
            <ProgressBar 
              value={project.progress} 
              showLabel
              color={project.progress === 100 ? 'success' : 'primary'}
            />
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Details</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <span className="w-20 text-gray-500">Status:</span>
                <span className={`
                  px-2 py-1 text-xs font-medium rounded-full
                  ${project.status === 'active' ? 'bg-green-100 text-green-800' : 
                    project.status === 'completed' ? 'bg-blue-100 text-blue-800' : 
                    'bg-yellow-100 text-yellow-800'}
                `}>
                  {project.status.replace('-', ' ')}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <span className="w-20 text-gray-500">Created:</span>
                <span className="text-gray-900">{formatDate(project.createdAt)}</span>
              </div>
              {project.dueDate && (
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="w-16 text-gray-500">Due:</span>
                  <span className="text-gray-900">{formatDate(project.dueDate)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h3>
            <div className="space-y-3">
              {project.members.map((member) => (
                <div key={member.id} className="flex items-center space-x-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Task Form Modal */}
      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
        size="lg"
      >
        <TaskForm
          task={editingTask || undefined}
          onSubmit={handleTaskSubmit}
          onCancel={() => setIsTaskModalOpen(false)}
        />
      </Modal>

      {/* Project Form Modal */}
      <Modal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        title="Edit Project"
        size="lg"
      >
        <ProjectForm
          project={project}
          onSubmit={handleProjectSubmit}
          onCancel={() => setIsProjectModalOpen(false)}
        />
      </Modal>
    </div>
  );
};
