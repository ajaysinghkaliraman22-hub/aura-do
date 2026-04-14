"use client";

import { Task } from '@/lib/api';
import TaskItem from './TaskItem';
import NewTaskForm from './NewTaskForm';

interface Props {
  tasks: Task[];
  loading: boolean;
  onCreate: (title: string, deadline?: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onToggleTask: (id: string, completed: boolean) => Promise<void>;
  onToggleSubTask: (taskId: string, subtaskId: string, completed: boolean) => Promise<void>;
}

export default function TaskBoard({ tasks, loading, onCreate, onDelete, onToggleTask, onToggleSubTask }: Props) {
  // Sort tasks: High priority first, incomplete first
  const priorityWeight = { High: 3, Medium: 2, Low: 1 };
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) {
      return priorityWeight[b.priority] - priorityWeight[a.priority];
    }
    return a.completed ? 1 : -1;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col mb-4">
        <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-aura-neonCyan to-aura-neonPurple">
          Active Directives
        </h1>
        <p className="text-aura-neonCyan/70 mt-1 italic tracking-wide">
          Organize your future with aura
        </p>
      </div>

      <NewTaskForm onSubmit={onCreate} />

      {loading ? (
        <div className="text-gray-400 p-8 text-center animate-pulse">Initializing quantum state...</div>
      ) : (
        <div className="flex flex-col gap-4 mt-6">
          {sortedTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDelete}
              onToggle={onToggleTask}
              onToggleSubTask={onToggleSubTask}
            />
          ))}
          {sortedTasks.length === 0 && (
            <div className="glass-panel p-8 text-center text-gray-500 italic">
              No active tasks. Awaiting input.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
