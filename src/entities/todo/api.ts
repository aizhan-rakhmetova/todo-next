import { apiClient } from '@/shared/api/client';
import { Todo, CreateTodoData, UpdateTodoData } from './types';

export const todoApi = {
  getAll: async (): Promise<Todo[]> => {
    const response = await apiClient.get('/posts');
    const now = new Date();
    const baseDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const russianTodos = [
      {
        id: '1',
        title: 'Купить продукты',
        description: 'Молоко, хлеб, яйца, овощи для ужина',
        deadline: new Date(baseDate.getTime() + 2 * 24 * 60 * 60 * 1000),
        completed: false,
        createdAt: new Date(baseDate.getTime() - 10 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(baseDate.getTime() - 10 * 24 * 60 * 60 * 1000),
      },
      {
        id: '2',
        title: 'Сходить в спортзал',
        description: 'Тренировка с тренером в 18:00',
        deadline: new Date(baseDate.getTime() + 1 * 24 * 60 * 60 * 1000),
        completed: true,
        createdAt: new Date(baseDate.getTime() - 15 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(baseDate.getTime() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        id: '3',
        title: 'Поход в горы',
        description: 'Восхождение на гору Эльбрус с группой',
        deadline: new Date(baseDate.getTime() + 4 * 24 * 60 * 60 * 1000),
        completed: false,
        createdAt: new Date(baseDate.getTime() - 12 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(baseDate.getTime() - 12 * 24 * 60 * 60 * 1000),
      },
      {
        id: '4',
        title: 'Встреча с друзьями',
        description: 'Ужин в ресторане в центре города',
        deadline: new Date(baseDate.getTime() + 0 * 24 * 60 * 60 * 1000),
        completed: false,
        createdAt: new Date(baseDate.getTime() - 13 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(baseDate.getTime() - 13 * 24 * 60 * 60 * 1000),
      },
      {
        id: '5',
        title: 'Читать книгу',
        description: 'Дочитать "Война и мир" до конца месяца',
        deadline: new Date(baseDate.getTime() + 5 * 24 * 60 * 60 * 1000),
        completed: false,
        createdAt: new Date(baseDate.getTime() - 14 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(baseDate.getTime() - 14 * 24 * 60 * 60 * 1000),
      },
    ];
    
    return russianTodos;
  },

  getById: async (id: string): Promise<Todo> => {
    const response = await apiClient.get(`/posts/${id}`);
    const post = response.data;
    return {
      id: post.id.toString(),
      title: post.title,
      description: post.body,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  },

  create: async (data: CreateTodoData): Promise<Todo> => {
    const formData = new FormData();
    formData.append('title', data.title);
    
    if (data.description) {
      formData.append('description', data.description);
    }
    
    if (data.deadline) {
      formData.append('deadline', data.deadline.toISOString().split('T')[0]);
    }
    
    if (data.file) {
      formData.append('file', data.file);
    }

    const response = await apiClient.post('/api/todos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  update: async (id: string, data: UpdateTodoData, existingTodo?: Todo): Promise<Todo> => {
    await new Promise(resolve => setTimeout(resolve, 300));

    return {
      id: existingTodo?.id || id,
      title: data.title || existingTodo?.title || 'Untitled',
      description: data.description || existingTodo?.description || '',
      deadline: data.deadline || existingTodo?.deadline,
      completed: data.completed !== undefined ? data.completed : (existingTodo?.completed || false),
      createdAt: existingTodo?.createdAt || new Date(),
      updatedAt: new Date(),
      file: data.file || existingTodo?.file,
    };
  },

  delete: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    console.log(`Simulated deletion of todo with id: ${id}`);
  },
};
