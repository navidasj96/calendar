"use client";
import React, { useState, useEffect } from "react";
import { Card, List, Typography, Badge, Input, Row, Col } from "antd";
import dayjs from "dayjs";

const TasksPage = (
    {params}:{params:{ year: string; month: string }}
  ) => {

    const { year, month } = params;
    // Convert year and month from string to number
    const selectedYear = parseInt(year, 10);
    const selectedMonth = parseInt(month, 10);

    // State for search input
    const [searchTerm, setSearchTerm] = useState<string>("");
    // State for tasks loaded from local storage
    const [tasks, setTasks] = useState<{ [date: string]: any[] }>({});

    // Load tasks from local storage on initial render
    useEffect(() => {
        const tasksFromLocalStorage = loadTasksFromLocalStorage();
        if (tasksFromLocalStorage) {
            setTasks(tasksFromLocalStorage);
        }
    }, []);

    // Function to load tasks from local storage
    const loadTasksFromLocalStorage = (): { [date: string]: any[] } => {
        const tasksString = localStorage.getItem("tasks");
        return tasksString ? JSON.parse(tasksString) : {};
    };

    // Handle search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Filter tasks by selected year, month, and search term
    const filteredTasks = Object.entries(tasks).filter(([dateString, tasks]) => {
        const date = dayjs(dateString);
        const matchesDate = date.year() === selectedYear && date.month() + 1 === selectedMonth; // month() is 0-based

        const matchesSearchTerm =
            tasks.some((task: any) =>
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.description.toLowerCase().includes(searchTerm.toLowerCase())
            );

        return matchesDate && matchesSearchTerm;
    });

    return (
        <div style={{ padding: "20px" }}>
            <Typography.Title level={2}>
                Tasks for {dayjs(`${selectedYear}-${selectedMonth}-01`).format("MMMM YYYY")}
            </Typography.Title>

            {/* Search Input */}
            <Input
                placeholder="Search tasks"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ marginBottom: "20px", maxWidth: "400px" }}
            />

            {filteredTasks.length > 0 ? (
                <Row gutter={[16, 16]}>
                    {filteredTasks.map(([date, tasks]) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={date}>
                            <Card title={dayjs(date).format("DD MMMM YYYY")}>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={tasks}
                                    renderItem={(task) => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={
                                                    <Typography.Text
                                                        delete={task.completed}
                                                        strong={!task.completed}
                                                    >
                                                        {task.title}
                                                    </Typography.Text>
                                                }
                                                description={task.description}
                                            />
                                            <Badge
                                                status={task.completed ? "success" : "warning"}
                                                text={task.completed ? "Completed" : "Pending"}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <Typography.Text>No tasks available for this month.</Typography.Text>
            )}
        </div>
    );
};

export default TasksPage;
