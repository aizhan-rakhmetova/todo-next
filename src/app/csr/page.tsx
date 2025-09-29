'use client';

import { useState, useEffect } from 'react';
import { Plus, Loader2 } from 'lucide-react';

import { Todo, CreateTodoData } from '@/entities/todo/types';
import { todoApi } from '@/entities/todo/api';
import { TodoList } from '@/features/todo-list/TodoList';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { TodoForm } from '@/features/todo-form/TodoForm';


export default function CSRPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await todoApi.getAll();
        setTodos(fetchedTodos);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleCreateTodo = async (data: CreateTodoData) => {
    setIsLoading(true);
    try {
      const newTodo = await todoApi.create(data);
      setTodos(prev => [newTodo, ...prev]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to create todo:', error);
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

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading todos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Client-Side Rendering (CSR)
          </h1>
          <p className="text-gray-600">
            This page is rendered entirely on the client side. 
            All data fetching happens in the browser after the page loads.
          </p>
          <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-800">
              <strong>Rendering Type:</strong> Client-Side Rendering (CSR)<br/>
              <strong>Data Fetching:</strong> Client-side with useEffect<br/>
              <strong>SEO:</strong> Poor - content not available to crawlers initially<br/>
              <strong>Performance:</strong> Slower initial load, but good for interactive apps
            </p>
          </div>
        </div>

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
      </div>
    </div>
  );
}
