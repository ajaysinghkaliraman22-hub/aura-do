"use client";

import { motion } from 'framer-motion';
import { Task } from '@/lib/api';

interface Props {
  tasks: Task[];
}

export default function FlowState({ tasks }: Props) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  
  // Calculate dynamically
  const syncPercentage = totalTasks === 0 ? 100 : Math.round((completedTasks / totalTasks) * 100);
  
  let quotaStatus = "Pending";
  if (totalTasks === 0) quotaStatus = "Standby";
  else if (syncPercentage === 100) quotaStatus = "Optimal";
  else if (syncPercentage > 50) quotaStatus = "Nominal";
  else quotaStatus = "Critical";

  return (
    <div className="glass-panel p-6 flex flex-col gap-6 sticky top-8">
      <h2 className="text-2xl font-bold text-white mb-2 pb-4 border-b border-aura-glassBorder flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-aura-neonCyan animate-pulse shadow-neon"></span>
        Flow State
      </h2>

      <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
        {/* Pulsing rings */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: 360 }}
          transition={{ duration: syncPercentage === 100 ? 5 : 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-aura-neonCyan/30 border-dashed"
        />
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: -360 }}
          transition={{ duration: syncPercentage === 100 ? 7 : 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 rounded-full border-[3px] border-aura-neonPurple/40"
        />
        
        <div className="text-center z-10">
          <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
            Aura
          </div>
          <div className={`text-sm tracking-[0.2em] font-mono mt-1 ${syncPercentage === 100 ? 'text-aura-neonCyan drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]' : 'text-gray-400'}`}>
            {totalTasks === 0 ? 'STANDBY' : (syncPercentage === 100 ? 'ACTIVE' : 'SYNCING')}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <div className="bg-gray-900/50 p-4 rounded-xl border border-aura-glassBorder flex justify-between items-center">
          <span className="text-gray-400 font-mono text-sm">System Sync</span>
          <motion.span 
            key={syncPercentage}
            initial={{ scale: 1.5, color: '#fff' }}
            animate={{ scale: 1, color: syncPercentage === 100 ? '#4ade80' : '#00f3ff' }}
            className="font-mono text-sm"
          >
            {syncPercentage}%
          </motion.span>
        </div>
        <div className="bg-gray-900/50 p-4 rounded-xl border border-aura-glassBorder">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 font-mono text-sm">Daily Quota</span>
            <span className={`font-mono text-sm ${syncPercentage === 100 ? 'text-green-400' : 'text-aura-neonPurple'}`}>
              {quotaStatus}
            </span>
          </div>
          <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
            <motion.div
              layout
              initial={{ width: 0 }}
              animate={{ width: `${syncPercentage}%` }}
              transition={{ type: "spring", stiffness: 50 }}
              className={`h-full ${syncPercentage === 100 ? 'bg-green-400 shadow-[0_0_10px_#4ade80]' : 'bg-aura-neonPurple shadow-neon-purple'}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
