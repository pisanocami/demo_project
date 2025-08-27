
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTaskStore } from '@/store/taskStore';
import { KanbanColumn } from '@/components/kanban/KanbanColumn';
import { TaskForm } from '@/components/forms/TaskForm';
import { Modal } from '@/components/ui/Modal';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Task } from '@/types';

export const KanbanBoard: React.FC = () => {
  const { tasks, addTask, updateTask, moveTask } = useTaskStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<Task['status']>('todo');

  // Group tasks by status
  const tasksByStatus = {
    todo: tasks.filter(t => t.status === 'todo'),
    'in-progress': tasks.filter(t => t.status === 'in-progress'),
    completed: tasks.filter(t => t.status === 'completed')
  };

  const handleAddTask = (status: Task['status']) => {
    setEditingTask(null);
    setDefaultStatus(status);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setDefaultStatus(task.status);
    setIsModalOpen(true);
  };

  const handleTaskMove = (taskId: string, newStatus: Task['status']) => {
    moveTask(taskId, newStatus);
  };

  const handleSubmit = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const columns = [
    { title: 'To Do', status: 'todo' as const, tasks: tasksByStatus.todo },
    { title: 'In Progress', status: 'in-progress' as const, tasks: tasksByStatus['in-progress'] },
    { title: 'Completed', status: 'completed' as const, tasks: tasksByStatus.completed }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumbs items={[{ label: 'Kanban Board' }]} />
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Kanban Board</h1>
          <p className="text-gray-600">Drag and drop tasks to update their status</p>
        </div>
        <button
          onClick={() => handleAddTask('todo')}
          className="btn-primary inline-flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Task
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto">
        <div className="flex space-x-6 min-w-[900px] h-full pb-6">
          {columns.map((column) => (
            <div key={column.status} className="flex-1 min-w-[280px]">
              <KanbanColumn
                title={column.title}
                status={column.status}
                tasks={column.tasks}
                onTaskMove={handleTaskMove}
                onAddTask={handleAddTask}
                onEditTask={handleEditTask}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Task Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-700">{tasksByStatus.todo.length}</div>
          <div className="text-sm text-gray-500">To Do</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-700">{tasksByStatus['in-progress'].length}</div>
          <div className="text-sm text-blue-600">In Progress</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-700">{tasksByStatus.completed.length}</div>
          <div className="text-sm text-green-600">Completed</div>
        </div>
      </div>

      {/* Task Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
        size="lg"
      >
        <TaskForm
          task={editingTask || undefined}
          defaultStatus={defaultStatus}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};
