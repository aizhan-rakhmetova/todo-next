import { todoApi } from '@/entities/todo/api';

import { ISRTodoManager } from './ISRTodoManager';

export const revalidate = 60;

export default async function ISRPage() {
  const initialTodos = await todoApi.getAll();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Incremental Static Regeneration (ISR)
          </h1>
          <p className="text-gray-600">
            This page is statically generated but can be regenerated on-demand. 
            Data is fetched at build time and updated periodically.
          </p>
          <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-sm text-purple-800">
              <strong>Rendering Type:</strong> Incremental Static Regeneration (ISR)<br/>
              <strong>Data Fetching:</strong> Build-time with periodic revalidation (60s)<br/>
              <strong>SEO:</strong> Excellent - content is pre-rendered<br/>
              <strong>Performance:</strong> Fast with automatic updates
            </p>
          </div>
        </div>

        <ISRTodoManager initialTodos={initialTodos} />
      </div>
    </div>
  );
}
