// components/TaskModal.tsx
"use client";
import React, { useState } from "react";
import { Modal, Button, Input, List } from "antd";
import { Task, TasksData } from "@/types/task";

interface TaskModalProps {
    selectedDate: string;
    tasks: TasksData;
    setTasks: React.Dispatch<React.SetStateAction<TasksData>>;
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskModal: React.FC<TaskModalProps> = ({ selectedDate, tasks, setTasks, isModalOpen, setIsModalOpen }) => {
    const [newTaskTitle, setNewTaskTitle] = useState<string>("");
    const [newTaskDescription, setNewTaskDescription] = useState<string>("");

    const saveTasksToLocalStorage = (tasks: TasksData) => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const addTask = () => {
        if (newTaskTitle.trim() === "") return;

        const newTask: Task = {
            id: Date.now(),
            title: newTaskTitle,
            description: newTaskDescription,
            completed: false,
        };

        setTasks((prevTasks) => {
            const updatedTasks = { ...prevTasks };
            updatedTasks[selectedDate] = [...(updatedTasks[selectedDate] || []), newTask];

            saveTasksToLocalStorage(updatedTasks); // Save to local storage
            return updatedTasks;
        });

        setNewTaskTitle("");
        setNewTaskDescription("");
    };

    const removeTask = (taskId: number) => {
        setTasks((prevTasks) => {
            const updatedTasks = { ...prevTasks };
            updatedTasks[selectedDate] = updatedTasks[selectedDate].filter((task) => task.id !== taskId);

            saveTasksToLocalStorage(updatedTasks); // Save to local storage
            return updatedTasks;
        });
    };

    return (
        <Modal
            title={`Tasks for ${selectedDate}`}
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={[
                <Button key="close" onClick={() => setIsModalOpen(false)}>
                    Close
                </Button>,
            ]}
        >
            <List
                dataSource={tasks[selectedDate] || []}
                renderItem={(task) => (
                    <List.Item
                        actions={[
                            <Button key={task.id} danger onClick={() => removeTask(task.id)}>
                                Remove
                            </Button>,
                        ]}
                    >
                        <List.Item.Meta title={task.title} description={task.description} />
                    </List.Item>
                )}
                className="max-h-[300px] overflow-y-auto"
            />

            <Input
                placeholder="Task Title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                style={{ marginTop: "10px" }}
            />
            <Input
                placeholder="Task Description"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                style={{ marginTop: "10px" }}
            />
            <Button type="primary" onClick={addTask} style={{ marginTop: "10px" }}>
                Add Task
            </Button>
        </Modal>
    );
};

export default TaskModal;
