const fs = require('fs');
const path = './data/tasks.json';

const getTasks = (req, res) => {
    let tasks = JSON.parse(fs.readFileSync(path));

    const { status } = req.query;

    if (status) {
        tasks = tasks.filter(t => t.status === status);
    }

    res.json(tasks);
};

const createTask = (req, res) => {
    if (!req.body.title || req.body.title.trim() === "") {
        return res.status(400).json({ message: "Title is required" });
    }

    const tasks = JSON.parse(fs.readFileSync(path));
    const newTask = {
        id: Date.now(),
        title: req.body.title,
        status: "todo"
    };

    tasks.push(newTask);
    fs.writeFileSync(path, JSON.stringify(tasks, null, 2));

    res.status(201).json(newTask);
};

const updateTask = (req, res) => {
    const tasks = JSON.parse(fs.readFileSync(path));
    const taskId = parseInt(req.params.id);

    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    // Mise à jour
    task.title = req.body.title || task.title;
    task.status = req.body.status || task.status;

    fs.writeFileSync(path, JSON.stringify(tasks, null, 2));

    res.json(task);
};

const deleteTask = (req, res) => {
    let tasks = JSON.parse(fs.readFileSync(path));
    const taskId = parseInt(req.params.id);

    const newTasks = tasks.filter(t => t.id !== taskId);

    if (tasks.length === newTasks.length) {
        return res.status(404).json({ message: "Task not found" });
    }

    fs.writeFileSync(path, JSON.stringify(newTasks, null, 2));

    res.json({ message: "Task deleted" });
};

module.exports = { getTasks, createTask , updateTask, deleteTask };