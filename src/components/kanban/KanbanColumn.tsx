
import React from 'react';
import { useDrop } from 'react-dnd';
import { Plus } from 'lucide-react';
import { Task } from '@/types';
import { DraggableTaskCard } from './DraggableTaskCard';

interface KanbanColumnProps {
  title: string;
  status: Task['status'];
  tasks: Task[];
  onTaskMove: (taskId: string, newStatus: Task['status']) => void;
  onAddTask: (status: Task['status']) => void;
  onEditTask: (task: Task) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  status,
  tasks,
  onTaskMove,
  onAddTask,
  onEditTask
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'task',
    drop: (item: { id: string; status: Task['status'] }) => {
      if (item.status !== status) {
        onTaskMove(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const statusConfig = {
    'todo': {
      color: 'bg-gray-50 border-gray-200',
      headerColor: 'text-gray-700',
      count: tasks.length
    },
    'in-progress': {
      color: 'bg-blue-50 border-blue-200',
      headerColor: 'text-blue-700',
      count: tasks.length
    },
    'completed': {
      color: 'bg-green-50 border-green-200',
      headerColor: 'text-green-700',
      count: tasks.length
    }
  };

  const config = statusConfig[status];

  return (
    <div 
      ref={drop}
      className={`
        flex flex-col h-full min-h-[600px] rounded-lg border-2 border-dashed transition-colors
        ${isOver ? 'border-primary-400 bg-primary-50' : config.color}
      `}
    >
      {/* Column Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className={`font-semibold ${config.headerColor}`}>
            {title}
          </h3>
          <span className="bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-600">
            {config.count}
          </span>
        </div>
        <button
          onClick={() => onAddTask(status)}
          className="w-full flex items-center justify-center py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg border border-dashed border-gray-300 hover:border-gray-400 transition-colors"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Task
        </button>
      </div>

      {/* Tasks */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {tasks.map((task) => (
          <DraggableTaskCard
            key={task.id}
            task={task}
            onEdit={onEditTask}
          />
        ))}
        
        {tasks.length === 0 && !isOver && (
          <div className="flex items-center justify-center h-32 text-gray-400">
            <div className="text-center">
              <div className="w-8 h-8 mx-auto mb-2 bg-gray-200 rounded-full"></div>
              <p className="text-sm">No tasks</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
