const taskModel = require('../models/taskModel');

exports.getAllTasks = (req, res) => {
    const tasks = taskModel.getAllTasks();
    res.status(200).json(tasks);
}

exports.getTaskById = (req, res) => {
    const task = taskModel.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(task);
}

exports.createTask = (req, res) => {
    const { title, description, completed } = req.body;
    console.log('Received task data:', req.body);
    console.log('Title:', title, 'Description:', description, 'Completed:', completed);
    if (!title || !description || completed === undefined) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const newTask = taskModel.createTask(req.body);
    res.status(201).json({ message: 'Task created successfully', newTask });
}

exports.updateTask = (req, res) => {
    const updatedTask = taskModel.updateTask(req.params.id, req.body);
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ message: 'Task updated successfully', updatedTask });
}

exports.deleteTask = (req, res) => {
    const deletedTask = taskModel.deleteTask(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ message: 'Task deleted successfully', deletedTask });
}
