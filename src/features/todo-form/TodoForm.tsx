import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input } from '@/shared/ui';
import { CreateTodoData } from '@/entities/todo';

const todoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  deadline: z.string().optional(),
  file: z.any().optional(),
});

type TodoFormData = z.infer<typeof todoSchema>;

interface TodoFormProps {
  onSubmit: (data: CreateTodoData) => void;
  onCancel: () => void;
  initialData?: Partial<CreateTodoData>;
  isLoading?: boolean;
}

export const TodoForm: React.FC<TodoFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      deadline: initialData?.deadline?.toISOString().split('T')[0] || '',
    },
  });

  const handleFormSubmit = (data: TodoFormData) => {
    const formData: CreateTodoData = {
      title: data.title,
      description: data.description,
      deadline: data.deadline ? new Date(data.deadline) : undefined,
      file: data.file?.[0] || undefined,
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <Input
          label="Title"
          placeholder="Enter task title"
          {...register('title')}
          error={errors.title?.message}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          Description
        </label>
        <textarea
          className="mt-1 flex h-24 w-full rounded-lg border-2 border-gray-200 bg-white/80 px-4 py-3 text-sm placeholder:text-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200
                     hover:border-gray-300 resize-none"
          placeholder="Enter task description (optional)"
          {...register('description')}
        />
        {errors.description && (
          <p className="text-sm text-red-600 font-medium">{errors.description.message}</p>
        )}
      </div>

      {/* Commented temporarily because of a bug */}
      {/*<div className="space-y-2">*/}
      {/*  <Input*/}
      {/*    label="Deadline"*/}
      {/*    type="date"*/}
      {/*    {...register('deadline')}*/}
      {/*    error={errors.deadline?.message}*/}
      {/*  />*/}
      {/*</div>*/}

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          File Attachment
        </label>
        <div className="relative">
          <input
            type="file"
            className="mt-1 block w-full text-sm text-gray-600 
                       file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 
                       file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-50 file:to-indigo-50 
                       file:text-blue-700 hover:file:from-blue-100 hover:file:to-indigo-100
                       file:transition-all file:duration-200 file:cursor-pointer
                       border-2 border-gray-200 rounded-lg p-2 hover:border-gray-300 transition-all duration-200"
            {...register('file')}
          />
        </div>
        {errors.file && (
          <p className="text-sm text-red-600 font-medium">{errors.file.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          className="px-6"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isLoading}
          className="px-6 min-w-[120px]"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </div>
          ) : (
            'Save Task'
          )}
        </Button>
      </div>
    </form>
  );
};
