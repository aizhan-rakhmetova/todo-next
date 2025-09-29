import { todoApi } from '@/entities/todo/api';
import { StaticTodoManager } from './StaticTodoManager';

export default async function SSGPage() {
  const initialTodos = await todoApi.getAll();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Static Site Generation (SSG)
          </h1>
          <p className="text-gray-600">
            This page is pre-rendered at build time. 
            Data is fetched during the build process and served as static HTML.
          </p>
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Rendering Type:</strong> Static Site Generation (SSG)<br/>
              <strong>Data Fetching:</strong> Build-time with getStaticProps equivalent<br/>
              <strong>SEO:</strong> Excellent - content is pre-rendered<br/>
              <strong>Performance:</strong> Fastest - served as static files
            </p>
          </div>
        </div>

        <StaticTodoManager initialTodos={initialTodos} />
      </div>
    </div>
  );
}
