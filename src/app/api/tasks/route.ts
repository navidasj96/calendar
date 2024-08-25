import { NextResponse } from 'next/server';
import { TasksData } from '@/types/task';

const route: TasksData = {
    '2024-08-01': [
        { id: 1, title: 'Static Task 1', description: 'Description for Static Task 1', completed: false },
        { id: 2, title: 'Static Task 2', description: 'Description for Static Task 2', completed: true },
    ],
    '2024-08-02': [
        { id: 3, title: 'Static Task 3', description: 'Description for Static Task 3', completed: false },
    ],
};

export async function GET() {
    return NextResponse.json(route);
}
