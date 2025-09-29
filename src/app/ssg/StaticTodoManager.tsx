'use client';

import { useState } from 'react';
import { Todo, CreateTodoData, todoApi } from '@/entities/todo';
import { TodoList } from '@/features/todo-list';
import { Button, Modal } from '@/shared/ui';
import { TodoForm } from '@/features/todo-form';
import { Plus } from 'lucide-react';
import { toastService } from '@/shared/lib';

interface StaticTodoManagerProps {
  initialTodos: Todo[];
}

export function StaticTodoManager({ initialTodos }: StaticTodoManagerProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateTodo = async (data: CreateTodoData) => {
    setIsLoading(true);
    const loadingToast = toastService.loading('Creating task...');
    
    try {
      const newTodo = await todoApi.create(data);
      setTodos(prev => [newTodo, ...prev]);
      setIsModalOpen(false);
      
      const fileInfo = data.file ? ` with file "${data.file.name}"` : '';
      toastService.dismiss(loadingToast);
      toastService.success(`Created (201) — id: ${newTodo.id}${fileInfo}`);
    } catch (error: any) {
      console.error('Failed to create todo:', error);
      toastService.dismiss(loadingToast);
      
      const errorMessage = error.response?.data?.error || error.message || 'Unknown error';
      const statusCode = error.response?.status || 'Network';
      toastService.error(`Failed (${statusCode}) — ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTodo = async (data: CreateTodoData) => {
    if (!editingTodo) return;
    
    setIsLoading(true);
    try {
      const updatedTodo = await todoApi.update(editingTodo.id, data);
      setTodos(prev => prev.map(todo => 
        todo.id === editingTodo.id ? updatedTodo : todo
      ));
      setEditingTodo(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to update todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleComplete = async (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    setIsLoading(true);
    try {
      const updatedTodo = await todoApi.update(id, { completed: !todo.completed }, todo);
      setTodos(prev => prev.map(t => t.id === id ? updatedTodo : t));
    } catch (error) {
      console.error('Failed to update todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    setIsLoading(true);
    try {
      await todoApi.delete(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Failed to delete todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">TODO Tasks</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      <TodoList
        todos={todos}
        onToggleComplete={handleToggleComplete}
        onEdit={handleEdit}
        onDelete={handleDeleteTodo}
        isLoading={isLoading}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={editingTodo ? 'Edit Task' : 'Add New Task'}
      >
        <TodoForm
          onSubmit={editingTodo ? handleEditTodo : handleCreateTodo}
          onCancel={handleModalClose}
          initialData={editingTodo}
          isLoading={isLoading}
        />
      </Modal>
    </div>
  );
}
