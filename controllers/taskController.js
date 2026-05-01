const fs = require('fs').promises;
const path = './data/tasks.json';

const getTasks = async (req, res) => {
    try {
        let tasks = JSON.parse(await fs.readFile('./data/tasks.json'));

        const { status, page = 1, limit = 5, search, sort, order = "asc" } = req.query;

        // filtre status
        if (status) {
            tasks = tasks.filter(t => t.status === status);
        }

        // 🔍 recherche
        if (search) {
            tasks = tasks.filter(t =>
                t.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        // 🔃 tri
        if (sort) {
            tasks.sort((a, b) => {
                if (order === "desc") {
                    return a[sort] < b[sort] ? 1 : -1;
                }
                return a[sort] > b[sort] ? 1 : -1;
            });
        }

        // pagination
        const startIndex = (page - 1) * limit;
        const paginatedTasks = tasks.slice(startIndex, startIndex + Number(limit));

        res.json({
            total: tasks.length,
            page: Number(page),
            limit: Number(limit),
            data: paginatedTasks
        });

    } catch (error) {
        throw new Error("Server error");
    }
};

const createTask = async (req, res) => {
    const tasks = JSON.parse(await fs.readFile(path));

    if (!req.body.title || req.body.title.trim() === "") {
        // return res.status(400).json({ message: "Title is required" });
        throw new Error("Title is required");
    }

    const newTask = {
        id: Date.now(),
        title: req.body.title,
        status: "todo"
    };

    tasks.push(newTask);

    await fs.writeFile(path, JSON.stringify(tasks, null, 2));

    res.status(201).json(newTask);
};

const updateTask = async (req, res) => {
    const tasks = JSON.parse(await fs.readFile(path));
    const taskId = parseInt(req.params.id);

    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        throw new Error("Task not found");
    }

    task.title = req.body.title || task.title;
    task.status = req.body.status || task.status;

    await fs.writeFile(path, JSON.stringify(tasks, null, 2));

    res.json(task);
};

const deleteTask = async (req, res) => {
    const tasks = JSON.parse(await fs.readFile(path));
    const taskId = parseInt(req.params.id);

    const newTasks = tasks.filter(t => t.id !== taskId);

    if (tasks.length === newTasks.length) {
        throw new Error("Task not found");
    }

    await fs.writeFile(path, JSON.stringify(newTasks, null, 2));

    res.json({ message: "Task deleted" });
};

module.exports = { getTasks, createTask , updateTask, deleteTask };