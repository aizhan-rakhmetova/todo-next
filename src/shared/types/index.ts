export interface Todo {
  id: string;
  title: string;
  description?: string;
  deadline?: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  file?: File;
}

export interface CreateTodoData {
  title: string;
  description?: string;
  deadline?: Date;
  file?: File;
}

export interface UpdateTodoData {
  title?: string;
  description?: string;
  deadline?: Date;
  completed?: boolean;
  file?: File;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
