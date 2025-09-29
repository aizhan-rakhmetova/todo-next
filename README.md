# TODO Manager

A comprehensive TODO application built with Next.js 15, showcasing different rendering strategies and modern React patterns.

## 🚀 Features

### Core TODO Features
- ✅ Add tasks with titles and descriptions
- ✅ Edit existing tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Delete tasks
- ✅ File attachments for tasks
- ✅ Overdue task highlighting

### Technical Features
- ✅ **4 Different Rendering Strategies**: SSR, SSG, ISR, CSR
- ✅ **FSD Architecture**: Feature-Sliced Design for scalable code organization
- ✅ **React Portal Modal**: Modal with text and file inputs
- ✅ **API Integration**: JSONPlaceholder API for data fetching
- ✅ **WebSocket Support**: Real-time updates (simulated)
- ✅ **Form Validation**: React Hook Form with Zod validation
- ✅ **Responsive Design**: Tailwind CSS with modern UI components
- ✅ **Storybook**: Component documentation and testing

## 🏗️ Architecture

The project follows **Feature-Sliced Design (FSD)** architecture:

```
src/
├── app/                    # Next.js app router pages
│   ├── ssr/               # Server-Side Rendering page
│   ├── ssg/               # Static Site Generation page
│   ├── isr/               # Incremental Static Regeneration page
│   └── csr/               # Client-Side Rendering page
├── shared/                # Shared utilities and components
│   ├── ui/                # Reusable UI components
│   ├── lib/               # Utility functions
│   ├── api/               # API client configuration
│   └── hooks/             # Custom React hooks
├── entities/              # Business entities
│   └── todo/             # Todo-related types and API
├── features/              # Feature-specific components
│   ├── todo-form/        # Todo creation/editing form
│   └── todo-list/        # Todo list display
└── widgets/              # Complex UI blocks
```

## 🎨 Rendering Strategies

### 1. Server-Side Rendering (SSR)
- **Route**: `/ssr`
- **Data Fetching**: Server-side with `getServerSideProps` equivalent
- **Use Case**: Dynamic content that changes frequently
- **SEO**: Excellent
- **Performance**: Slower initial load, good for dynamic content

### 2. Static Site Generation (SSG)
- **Route**: `/ssg`
- **Data Fetching**: Build-time with `getStaticProps` equivalent
- **Use Case**: Content that doesn't change often
- **SEO**: Excellent
- **Performance**: Fastest, served as static files

### 3. Incremental Static Regeneration (ISR)
- **Route**: `/isr`
- **Data Fetching**: Build-time with periodic revalidation (60s)
- **Use Case**: Content that changes occasionally
- **SEO**: Excellent
- **Performance**: Fast with automatic updates

### 4. Client-Side Rendering (CSR)
- **Route**: `/csr`
- **Data Fetching**: Client-side with `useEffect`
- **Use Case**: Interactive applications
- **SEO**: Poor (content not available to crawlers initially)
- **Performance**: Slower initial load, good for interactive apps

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **WebSocket**: Socket.io-client
- **Icons**: Lucide React
- **Component Documentation**: Storybook
- **Architecture**: Feature-Sliced Design (FSD)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open Storybook** (optional)
   ```bash
   npm run storybook
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run storybook` - Start Storybook
- `npm run lint` - Run ESLint

## 📱 Usage

1. **Navigate to different pages** to see different rendering strategies
2. **Add new tasks** using the "Add Task" button
3. **Edit tasks** by clicking the edit icon
4. **Mark tasks as complete** by clicking the checkbox
5. **Delete tasks** using the delete button
6. **Attach files** to tasks using the file input

## 🧪 Testing Components

Storybook provides interactive documentation for all UI components:

- **Button**: Various variants and sizes
- **Input**: Different types and states
- **Modal**: Different content types
- **TodoForm**: Create and edit forms
- **TodoList**: Different list states

## 🔧 API Integration

The app integrates with JSONPlaceholder API:
- **GET** `/posts` - Fetch all todos
- **GET** `/posts/:id` - Fetch single todo
- **POST** `/posts` - Create new todo
- **PUT** `/posts/:id` - Update todo
- **DELETE** `/posts/:id` - Delete todo

## 🌐 WebSocket Support

WebSocket functionality is implemented for real-time updates:
- Connection status indicator in navigation
- Simulated real-time todo updates
- Event-driven architecture for scalability

## 📚 Component Documentation

All components are documented in Storybook with:
- Interactive controls
- Multiple variants and states
- Usage examples
- Accessibility testing
- Visual regression testing

## 🎯 Key Features Demonstrated

1. **Modern React Patterns**: Hooks, Context, Portal
2. **Form Handling**: Validation, error states, file uploads
3. **State Management**: Local state with API integration
4. **Responsive Design**: Mobile-first approach
5. **Accessibility**: ARIA labels, keyboard navigation
6. **Performance**: Optimized rendering strategies
7. **Developer Experience**: TypeScript, ESLint, Storybook

## 🚧 Improvements & Next Steps

- This project was built quickly for a technical assessment, so some rough edges and bugs are expected; polishing is needed.
- ESLint and TypeScript errors are present and should be fixed.
- Add translations (i18n) for multiple languages in the future.
- Add UI widgets.
- Extract a reusable `Textarea` into `shared/ui`.
- Fix and enforce import order across all files.
- Note: semantic HTML is used throughout the project.
- Improve Storybook.
- Split `page.tsx` into smaller, focused components.
- Changes are not persisted across route navigation yet (state/edits are lost); persistence needs to be added.
- Adding a deadline to the task needs to be fixed 


## 📄 Assessment Notice (No License)

This repository is provided solely for evaluation during a technical assessment.  
You may view, clone, and run it locally. Redistribution, modification, or commercial use are prohibited.  
All rights reserved.