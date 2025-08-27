
import React from 'react';
import { Calendar, AlertCircle, User } from 'lucide-react';
import { Task } from '@/types';
import { Avatar } from '@/components/ui/Avatar';

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
  isDragging?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onEdit, 
  onDelete, 
  isDragging = false 
}) => {
  const priorityColors = {
    low: 'border-l-green-400 bg-green-50',
    medium: 'border-l-yellow-400 bg-yellow-50',
    high: 'border-l-red-400 bg-red-50'
  };

  const priorityIcons = {
    low: 'text-green-600',
    medium: 'text-yellow-600',
    high: 'text-red-600'
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <div className={`
      bg-white rounded-lg border-l-4 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer
      ${priorityColors[task.priority]}
      ${isDragging ? 'opacity-50 transform rotate-2' : ''}
    `}>
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900 text-sm line-clamp-2">
          {task.title}
        </h4>
        <div className="flex items-center ml-2">
          <AlertCircle className={`w-4 h-4 ${priorityIcons[task.priority]}`} />
        </div>
      </div>

      {task.description && (
        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {task.assignee ? (
            <Avatar 
              src={task.assignee.avatar} 
              name={task.assignee.name} 
              size="sm" 
            />
          ) : (
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-400" />
            </div>
          )}
        </div>
        
        {task.dueDate && (
          <div className={`
            flex items-center text-xs
            ${isOverdue ? 'text-red-600' : 'text-gray-500'}
          `}>
            <Calendar className="w-3 h-3 mr-1" />
            <span>{formatDate(task.dueDate)}</span>
          </div>
        )}
      </div>
    </div>
  );
};
