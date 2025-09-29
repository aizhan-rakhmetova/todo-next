import { todoApi } from '@/entities/todo/api';

import { ServerSideTodoManager } from './ServerSideTodoManager';

export default async function SSRPage() {
  const initialTodos = await todoApi.getAll();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Server-Side Rendering (SSR)
          </h1>
          <p className="text-gray-600">
            This page is rendered on the server for each request. 
            Initial data is fetched server-side and hydrated on the client.
          </p>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Rendering Type:</strong> Server-Side Rendering (SSR)<br/>
              <strong>Data Fetching:</strong> Server-side with getServerSideProps equivalent<br/>
              <strong>SEO:</strong> Excellent - content is available immediately<br/>
              <strong>Performance:</strong> Slower initial load, but good for dynamic content
            </p>
          </div>
        </div>

        <ServerSideTodoManager initialTodos={initialTodos} />
      </div>
    </div>
  );
}
