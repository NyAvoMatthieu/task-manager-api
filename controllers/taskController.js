const fs = require('fs').promises;
const path = './data/tasks.json';

const getTasks = async (req, res) => {
    let tasks = JSON.parse(await fs.readFile('./data/tasks.json'));

    const { status, page = 1, limit = 5 } = req.query;

    // filtre
    if (status) {
        tasks = tasks.filter(t => t.status === status);
    }

    // pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedTasks = tasks.slice(startIndex, endIndex);

    res.json({
        total: tasks.length,
        page: Number(page),
        limit: Number(limit),
        data: paginatedTasks
    });
};

const createTask = async (req, res) => {
    const tasks = JSON.parse(await fs.readFile(path));

    if (!req.body.title || req.body.title.trim() === "") {
        return res.status(400).json({ message: "Title is required" });
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