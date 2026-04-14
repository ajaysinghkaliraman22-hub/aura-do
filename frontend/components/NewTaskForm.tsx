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
    <form 
      onSubmit={handleSubmit} 
      className="glass-panel !border border-transparent !rounded-xl p-0 inline-flex flex-col sm:flex-row w-full lg:w-fit overflow-hidden transition-all duration-300 shadow-[inset_1px_1px_0_hsla(0,0%,100%,0.2),inset_-1px_-1px_0_rgba(255,255,255,0.02)] hover:shadow-[0_0_25px_rgba(0,243,255,0.3),inset_1px_1px_0_hsla(0,0%,100%,0.2),inset_-1px_-1px_0_rgba(255,255,255,0.02)]"
    >
      <input
        type="text"
        placeholder="Launch New Mission..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 lg:w-[400px] min-h-[56px] text-lg bg-gray-900/10 border-0 border-b sm:border-b-0 sm:border-r border-aura-glassBorder text-white px-5 py-3 rounded-none focus:outline-none focus:bg-aura-neonCyan/10 transition-all"
        disabled={isSubmitting}
      />
      
      <div className="flex flex-col justify-center bg-gray-900/20 border-0 border-b sm:border-b-0 sm:border-r border-aura-glassBorder transition-all px-2 w-full sm:w-auto rounded-none focus-within:bg-aura-neonPurple/10">
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="h-[36px] mt-1 bg-transparent text-gray-300 focus:outline-none cursor-pointer px-2"
          disabled={isSubmitting}
        />
        <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase text-center mb-1">Deadline</span>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !title.trim()}
        className="min-h-[56px] sm:w-auto bg-aura-neonCyan/10 text-aura-neonCyan text-lg hover:bg-aura-neonCyan/20 px-8 py-3 rounded-none transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-[inset_0_0_15px_-5px_#00f3ff]"
      >
        <Plus className="w-5 h-5 mr-1" />
        Trigger
      </button>
    </form>
  );
}
