"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task } from '@/lib/api';
import { CheckCircle2, Circle, ChevronDown, ChevronRight, Trash2, Clock } from 'lucide-react';

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string, completed: boolean) => void;
  onToggleSubTask: (taskId: string, subtaskId: string, completed: boolean) => void;
}

export default function TaskItem({ task, onDelete, onToggle, onToggleSubTask }: Props) {
  const [expanded, setExpanded] = useState(false);

  const priorityColors = {
    High: 'text-rose-500 shadow-rose-500/20 border-rose-500/30',
    Medium: 'text-amber-500 shadow-amber-500/20 border-amber-500/30',
    Low: 'text-emerald-500 shadow-emerald-500/20 border-emerald-500/30',
  };

  const pColorClass = priorityColors[task.priority];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className={`glass-panel p-4 flex flex-col transition-all duration-300 ${task.completed ? 'opacity-50 grayscale' : 'hover:shadow-neon'}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <button onClick={() => onToggle(task.id, !task.completed)} className="text-aura-neonCyan hover:scale-110 transition-transform">
            {task.completed ? <CheckCircle2 className="w-6 h-6 drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]" /> : <Circle className="w-6 h-6" />}
          </button>
          
          <div className="flex flex-col">
            <span className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
              {task.title}
            </span>
            {task.deadline && (
              <span className="text-xs text-aura-neonPurple flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3" />
                {new Date(task.deadline).toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className={`text-xs px-2 py-1 rounded-full border ${pColorClass}`}>
            {task.priority}
          </div>
          
          {task.sub_tasks.length > 0 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {expanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          )}

          <button onClick={() => onDelete(task.id)} className="text-gray-500 hover:text-rose-500 transition-colors">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {expanded && task.sub_tasks.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mt-4 pl-9 border-l border-aura-glassBorder"
          >
            <div className="flex flex-col gap-2 py-2">
              {task.sub_tasks.map(st => (
                <div key={st.id} className="flex items-center gap-2 group">
                  <button onClick={() => onToggleSubTask(task.id, st.id, !st.completed)} className="text-aura-neonPurple flex-shrink-0 transition-transform group-hover:scale-110">
                    {st.completed ? <CheckCircle2 className="w-4 h-4 drop-shadow-[0_0_5px_rgba(181,55,242,0.8)]" /> : <Circle className="w-4 h-4" />}
                  </button>
                  <span className={`text-sm ${st.completed ? 'line-through text-gray-500' : 'text-gray-300'}`}>
                    {st.title}
                  </span>
                  <span className="text-xs text-gray-600 ml-auto bg-gray-800/50 px-2 py-0.5 rounded">
                    ~{st.estimated_minutes}m
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
