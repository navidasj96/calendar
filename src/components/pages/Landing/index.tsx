"use client";
import React, { useEffect, useState } from "react";
import { Calendar, Badge, Button } from "antd";
import type { Dayjs } from "dayjs";
import { useRecoilState } from "recoil";
import { tasksState } from "@/state/tasksState";
import { Task, TasksData } from "@/types/task";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import TaskModal from "@/components/TaskModal";

const fetchTasks = async (): Promise<TasksData> => {
    const response = await axios.get("/api/tasks");
    return response.data;
};

const TaskCalendar: React.FC = () => {
    const [tasks, setTasks] = useRecoilState(tasksState);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
    const router = useRouter();

    const { data, refetch } = useQuery({
        queryKey: ["tasks"],
        queryFn: fetchTasks,

    });

    useEffect(() => {
        const savedTasks = loadTasksFromLocalStorage();
        if (savedTasks) {
            setTasks(savedTasks);
        } else if (data) {
            setTasks(data);
        }
    }, [data, setTasks]);

    const saveTasksToLocalStorage = (tasks: TasksData) => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const loadTasksFromLocalStorage = (): TasksData | null => {
        const tasksString = localStorage.getItem("tasks");
        return tasksString ? JSON.parse(tasksString) : null;
    };

    const handleDateClick = (value: Dayjs) => {
        const dateString = value.format("YYYY-MM-DD");
        setSelectedDate(dateString);
        setSelectedYear(value.year());
        setSelectedMonth(value.month() + 1);
        setIsModalOpen(true);
    };

    const dateCellRender = (value: Dayjs) => {
        const dateString = value.format("YYYY-MM-DD");
        const dayTasks = tasks[dateString] || [];

        return (
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {dayTasks.map((task) => (
                    <li key={task.id}>
                        <Badge status={task.completed ? "success" : "warning"} text={task.title} />
                    </li>
                ))}
            </ul>
        );
    };

    const handleNavigation = () => {
        router.push(`tasks/${selectedYear}/${selectedMonth}`);
    };

    return (
        <div className="m-5">
            <div className="w-full flex justify-end items-center ml-auto">
                <Button className="" type="primary" onClick={handleNavigation} style={{ marginTop: "10px" }}>
                    View Tasks for {selectedMonth}/{selectedYear}
                </Button>
            </div>
            <Calendar cellRender={dateCellRender} onSelect={handleDateClick} />

            <TaskModal
                selectedDate={selectedDate}
                tasks={tasks}
                setTasks={setTasks}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </div>
    );
};

export default TaskCalendar;
