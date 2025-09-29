import React from 'react';
import { Todo } from '@/entities/todo/types';
import { Button } from '@/shared/ui/Button';
import { formatDate, isOverdue } from '@/shared/lib/utils';
import { Check, Edit, Trash2, Calendar, FileText } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleComplete,
  onEdit,
  onDelete,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-20 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new task.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`bg-white border rounded-lg p-4 shadow-sm transition-all hover:shadow-md ${
            todo.completed ? 'opacity-60' : ''
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onToggleComplete(todo.id)}
                  className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    todo.completed
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 hover:border-green-500'
                  }`}
                >
                  {todo.completed && <Check className="w-3 h-3" />}
                </button>
                <h3 className={`text-lg font-medium ${
                  todo.completed ? 'line-through text-gray-700' : 'text-gray-900'
                }`}>
                  {todo.title}
                </h3>
              </div>
              
              {todo.description && (
                <p className={`mt-2 text-sm ${
                  todo.completed ? 'text-gray-600' : 'text-gray-600'
                }`}>
                  {todo.description}
                </p>
              )}
              
              <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
                {todo.deadline && (
                  <div className={`flex items-center space-x-1 ${
                    !todo.completed && isOverdue(todo.deadline) ? 'text-red-600' : ''
                  }`}>
                    <Calendar className="w-4 h-4" />
                    <span>
                      Due: {formatDate(todo.deadline)}
                      {!todo.completed && isOverdue(todo.deadline) && ' (Overdue)'}
                    </span>
                  </div>
                )}
                {todo.file && (
                  <div className="flex items-center space-x-1">
                    <FileText className="w-4 h-4" />
                    <span>{todo.file.name}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(todo)}
                disabled={todo.completed}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(todo.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
