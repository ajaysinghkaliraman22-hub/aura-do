import TaskBoard from '@/components/TaskBoard';
import FlowState from '@/components/FlowState';

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 mt-12 w-full h-full min-h-[80vh]">
      {/* Left side: Flow State summary */}
      <div className="w-full lg:w-1/3">
        <FlowState />
      </div>

      {/* Right side: The Task Board */}
      <div className="w-full lg:w-2/3">
        <TaskBoard />
      </div>
    </div>
  );
}
