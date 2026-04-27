const fs = require('fs');
const path = './data/tasks.json';

const getTasks = (req, res) => {
    const data = JSON.parse(fs.readFileSync(path));
    res.json(data);
};

const createTask = (req, res) => {
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

module.exports = { getTasks, createTask };