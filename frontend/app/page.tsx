"use client";

import { useEffect, useState } from 'react';
import TaskBoard from '@/components/TaskBoard';
import FlowState from '@/components/FlowState';
import { Task, fetchTasks, createTask, deleteTask, updateTask, toggleSubTask } from '@/lib/api';

export default function Home() {
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

  return (
    <div className="flex flex-col lg:flex-row gap-8 mt-12 w-full h-full min-h-[80vh]">
      {/* Left side: Flow State summary linked to real data */}
      <div className="w-full lg:w-1/3">
        <FlowState tasks={tasks} />
      </div>

      {/* Right side: The Task Board */}
      <div className="w-full lg:w-2/3">
        <TaskBoard 
          tasks={tasks}
          loading={loading}
          onCreate={handleCreate}
          onDelete={handleDelete}
          onToggleTask={handleToggleTask}
          onToggleSubTask={handleToggleSubTask}
        />
      </div>
    </div>
  );
}
