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
    <form onSubmit={handleSubmit} className="glass-panel p-4 flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        placeholder="Enter new directive..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 bg-transparent border-b border-aura-glassBorder text-white px-4 py-2 focus:outline-none focus:border-aura-neonCyan focus:shadow-[0_4px_10px_-4px_#00f3ff] transition-all"
        disabled={isSubmitting}
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="bg-gray-900/50 border border-aura-glassBorder text-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-aura-neonPurple focus:shadow-[0_0_10px_-2px_#b537f2] transition-all"
        disabled={isSubmitting}
      />
      <button
        type="submit"
        disabled={isSubmitting || !title.trim()}
        className="bg-aura-neonCyan/10 border border-aura-neonCyan text-aura-neonCyan hover:bg-aura-neonCyan/20 px-6 py-2 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-[0_0_15px_-5px_#00f3ff]"
      >
        <Plus className="w-5 h-5 mr-1" />
        Initialize
      </button>
    </form>
  );
}
