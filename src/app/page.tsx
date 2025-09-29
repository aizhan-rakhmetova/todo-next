import Link from 'next/link';
import { CheckSquare, Clock, Zap, Globe, CircleCheckBig } from 'lucide-react';


const FEATURES = [
  { id: 'tasks', text: 'Add tasks' },
  { id: 'edit-complete', text: 'Edit and complete tasks' },
  { id: 'attachments', text: 'File attachments' },
  { id: 'modal-portal', text: 'Modal forms with React Portal' },
  { id: 'jsonplaceholder', text: 'JSONPlaceholder API integration' },
  // { id: 'ws', text: 'WebSocket real-time updates' }, // need improvements
  { id: 'fsd', text: 'FSD Architecture' },
  { id: 'tailwind', text: 'Tailwind CSS styling' },
  { id: 'react-hook-form', text: 'React Hook Form with Zod validation' },
  { id: 'react-hot-toast', text: 'Notifications with React Hot Toast' },

] as const;

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ToDo Application (Next.js Demo)
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            ToDo Manager with Different Rendering Strategies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/ssr">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 mx-auto">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Server-Side Rendering</h3>
              <p className="text-gray-600 text-sm">
                Pages rendered on the server for each request
              </p>
            </div>
          </Link>

          <Link href="/ssg">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4 mx-auto">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Static Site Generation</h3>
              <p className="text-gray-600 text-sm">
                Pre-built pages at build time for optimal performance
              </p>
            </div>
          </Link>

          <Link href="/isr">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4 mx-auto">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Incremental Static Regeneration</h3>
              <p className="text-gray-600 text-sm">
                Static pages with periodic updates
              </p>
            </div>
          </Link>

          <Link href="/csr">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4 mx-auto">
                <CheckSquare className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Client-Side Rendering</h3>
              <p className="text-gray-600 text-sm">
                Interactive pages rendered in the browser
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Features</h2>
          <ul className="grid grid-cols-1 gap-3 text-sm text-gray-700 md:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(({ id, text }) => (
                <li key={id} className="flex gap-2">
                  <CircleCheckBig className="w-4 h-4 text-black" />
                  <span>{text}</span>
                </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}