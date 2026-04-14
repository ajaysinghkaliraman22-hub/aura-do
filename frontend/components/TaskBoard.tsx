"use client";

import { useEffect, useState } from 'react';
import { Task, fetchTasks, createTask, deleteTask, updateTask, toggleSubTask } from '@/lib/api';
import TaskItem from './TaskItem';
import NewTaskForm from './NewTaskForm';

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreate = async (title: string, deadline?: string) => {
    try {
      const newTask = await createTask(title, deadline);
      setTasks([...tasks, newTask]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleTask = async (id: string, completed: boolean) => {
    try {
      const updated = await updateTask(id, { completed });
      setTasks(tasks.map(t => t.id === id ? updated : t));
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleSubTask = async (taskId: string, subtaskId: string, completed: boolean) => {
    try {
      const updatedTask = await toggleSubTask(taskId, subtaskId, completed);
      setTasks(tasks.map(t => t.id === taskId ? updatedTask : t));
    } catch (err) {
      console.error(err);
    }
  };

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
      <div className="flex justify-between items-end mb-4">
        <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-aura-neonCyan to-aura-neonPurple">
          Active Directives
        </h1>
      </div>

      <NewTaskForm onSubmit={handleCreate} />

      {loading ? (
        <div className="text-gray-400 p-8 text-center animate-pulse">Initializing quantum state...</div>
      ) : (
        <div className="flex flex-col gap-4 mt-6">
          {sortedTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onToggle={handleToggleTask}
              onToggleSubTask={handleToggleSubTask}
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
