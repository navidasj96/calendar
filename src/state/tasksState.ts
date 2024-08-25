import { atom } from 'recoil';
import {TasksData} from "@/types/task";

// Recoil atom for managing tasks
export const tasksState = atom<TasksData>({
    key: 'tasksState', // Unique ID for this atom
    default: {},
});
