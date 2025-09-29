import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const deadline = formData.get('deadline') as string;
    const file = formData.get('file') as File | null;

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    let fileInfo = null;
    if (file && file.size > 0) {
      fileInfo = {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      };
    }

    const newTodo = {
      id: Date.now().toString(),
      title,
      description: description || '',
      deadline: deadline ? new Date(deadline) : null,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      file: fileInfo,
    };

    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const todos = [
    {
      id: '1',
      title: 'Купить продукты',
      description: 'Молоко, хлеб, яйца, овощи для ужина',
      deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      completed: false,
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    },
    {
      id: '2',
      title: 'Сходить в спортзал',
      description: 'Тренировка с тренером в 18:00',
      deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      completed: true,
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
  ];

  return NextResponse.json(todos);
}
