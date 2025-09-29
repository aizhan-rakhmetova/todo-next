export interface Todo {
  id: string;
  title: string;
  description?: string;
  deadline?: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  file?: File | FileInfo;
}

export interface FileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: number;
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
