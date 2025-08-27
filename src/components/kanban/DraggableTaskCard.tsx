
import React from 'react';
import { useDrag } from 'react-dnd';
import { Task } from '@/types';
import { TaskCard } from '@/components/tasks/TaskCard';

interface DraggableTaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export const DraggableTaskCard: React.FC<DraggableTaskCardProps> = ({
  task,
  onEdit
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div 
      ref={drag}
      onClick={() => onEdit(task)}
      className="cursor-move"
    >
      <TaskCard 
        task={task} 
        isDragging={isDragging}
      />
    </div>
  );
};
