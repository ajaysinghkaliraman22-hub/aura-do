"use client";

import { useState } from 'react';
import { Plus } from 'lucide-react';

interface Props {
  onSubmit: (title: string, deadline?: string) => Promise<void>;
}

export default function NewTaskForm({ onSubmit }: Props) {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    let isoDeadline: string | undefined = undefined;
    if (deadline) {
      isoDeadline = new Date(deadline).toISOString();
    }

    try {
      await onSubmit(title, isoDeadline);
      setTitle('');
      setDeadline('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-stretch">
      <input
        type="text"
        placeholder="Launch New Mission..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 min-h-[56px] text-lg bg-gray-900/30 border border-aura-glassBorder rounded-xl text-white px-5 py-3 focus:outline-none focus:border-aura-neonCyan focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all"
        disabled={isSubmitting}
      />
      
      <div className="flex flex-col w-full sm:w-auto">
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="min-h-[56px] bg-gray-900/50 border border-aura-glassBorder rounded-xl px-4 py-3 text-gray-300 focus:outline-none focus:border-aura-neonPurple focus:shadow-[0_0_15px_rgba(181,55,242,0.3)] transition-all cursor-pointer"
          disabled={isSubmitting}
        />
        <span className="text-[11px] text-gray-500 font-mono tracking-widest uppercase text-center mt-1.5">Deadline</span>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !title.trim()}
        className="min-h-[56px] h-fit sm:h-auto bg-aura-neonCyan/10 border border-aura-neonCyan text-aura-neonCyan text-lg hover:bg-aura-neonCyan/20 px-8 py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-[0_0_15px_-5px_#00f3ff]"
      >
        <Plus className="w-5 h-5 mr-1" />
        Trigger
      </button>
    </form>
  );
}
