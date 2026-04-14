import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from '../components/TaskItem';

const mockTask = {
  id: '1',
  title: 'Test Component',
  completed: false,
  priority: 'High' as const,
  sub_tasks: [
    { id: '1-1', title: 'Subtask 1', completed: false, estimated_minutes: 15 }
  ]
};

describe('TaskItem component', () => {
  it('renders task title correctly', () => {
    render(<TaskItem task={mockTask} onDelete={jest.fn()} onToggle={jest.fn()} onToggleSubTask={jest.fn()} />);
    expect(screen.getByText('Test Component')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
  });

  it('calls onToggle when main checkbox is clicked', () => {
    const handleToggle = jest.fn();
    render(<TaskItem task={mockTask} onDelete={jest.fn()} onToggle={handleToggle} onToggleSubTask={jest.fn()} />);
    
    // the checkbox is the first button in the component
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    expect(handleToggle).toHaveBeenCalledWith('1', true);
  });

  it('calls onDelete when delete button is clicked', () => {
    const handleDelete = jest.fn();
    render(<TaskItem task={mockTask} onDelete={handleDelete} onToggle={jest.fn()} onToggleSubTask={jest.fn()} />);
    
    // delete is the last button in the component header
    const deleteButton = screen.getAllByRole('button').find(btn => btn.className.includes('text-gray-500 hover:text-rose-500'));
    if(deleteButton) fireEvent.click(deleteButton);
    expect(handleDelete).toHaveBeenCalledWith('1');
  });
});
