// Interface for a single task
export interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

// Interface for tasks data structure (tasks for each day)
export interface TasksData {
    [date: string]: Task[]; // Key is a date string in 'YYYY-MM-DD' format
}
