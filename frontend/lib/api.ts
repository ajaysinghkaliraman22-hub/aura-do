const IS_BROWSER = typeof window !== 'undefined';
let API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

if (IS_BROWSER && window.location.hostname !== 'localhost') {
  API_URL = '/_/backend';
}


export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
  estimated_minutes: number;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  deadline?: string;
  priority: 'High' | 'Medium' | 'Low';
  sub_tasks: SubTask[];
}

export const fetchTasks = async (): Promise<Task[]> => {
  const res = await fetch(`${API_URL}/tasks/`);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
};

export const createTask = async (title: string, deadline?: string): Promise<Task> => {
  const body = deadline ? { title, deadline } : { title };
  const res = await fetch(`${API_URL}/tasks/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
};

export const updateTask = async (id: string, updates: Partial<Task>): Promise<Task> => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
};

export const deleteTask = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete task');
};

export const toggleSubTask = async (taskId: string, subtaskId: string, completed: boolean): Promise<Task> => {
  const res = await fetch(`${API_URL}/tasks/${taskId}/subtasks/${subtaskId}?completed=${completed}`, {
    method: 'PUT',
  });
  if (!res.ok) throw new Error('Failed to toggle subtask');
  return res.json();
};
