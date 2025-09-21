const express = require('express');
const fs = require('fs'); // Import fs module
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to get all data from task.json with filtering and sorting
app.get('/tasks', (req, res) => {
    const { completed, sort } = req.query;

    fs.readFile('task.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read task.json' });
        }

        let tasks;
        try {
            tasks = JSON.parse(data);
            if (!Array.isArray(tasks.tasks)) {
                throw new Error('Data is not an array');
            }
        } catch (parseError) {
            return res.status(500).json({ error: 'Invalid task data format' });
        }

        let filteredTasks = tasks.tasks;

        // Filter by completion status
        if (completed !== undefined) {
            const isCompleted = completed === 'true';
            filteredTasks = filteredTasks.filter(task => task.completed === isCompleted);
        }

        // Sort by creation date
        if (sort === 'date') {
            filteredTasks = filteredTasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }

        res.send(filteredTasks);
    });
});

// Route to retrieve tasks by priority level
app.get('/tasks/priority/:level', (req, res) => {
    const { level } = req.params;

    fs.readFile('task.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read task.json' });
        }

        let tasks;
        try {
            tasks = JSON.parse(data);
            if (!Array.isArray(tasks.tasks)) {
                throw new Error('Data is not an array');
            }
        } catch (parseError) {
            return res.status(500).json({ error: 'Invalid task data format' });
        }

        const filteredTasks = tasks.tasks.filter(task => task.priority === level);
        res.send(filteredTasks);
    });
});

// Route to get a specific task by ID
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);

    fs.readFile('task.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read task.json' });
        }

        let tasks;
        try {
            tasks = JSON.parse(data);
            if (!Array.isArray(tasks.tasks)) {
                throw new Error('Data is not an array');
            }
        } catch (parseError) {
            return res.status(500).json({ error: 'Invalid task data format' });
        }

        const task = tasks.tasks.find(t => t.id === taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.send(task);
    });
});

// Route to create a new task
app.post('/tasks', (req, res) => {
    const { title, description, completed, priority } = req.body;

    if (!title || !description || typeof completed !== 'boolean' || !['low', 'medium', 'high'].includes(priority)) {
        return res.status(400).json({ error: 'Invalid task data. Title, description, completed, and priority (low, medium, high) are required.' });
    }

    fs.readFile('task.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read task.json' });
        }

        let tasks;
        try {
            tasks = JSON.parse(data);
            if (!Array.isArray(tasks.tasks)) {
                throw new Error('Data is not an array');
            }
        } catch (parseError) {
            return res.status(500).json({ error: 'Invalid task data format' });
        }

        const newTask = {
            id: tasks.tasks.length > 0 ? tasks.tasks[tasks.tasks.length - 1].id + 1 : 1,
            title,
            description,
            completed,
            priority,
            createdAt: new Date().toISOString()
        };

        tasks.tasks.push(newTask);

        fs.writeFile('task.json', JSON.stringify(tasks, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ error: 'Failed to save new task' });
            }
            res.status(201).json(newTask);
        });
    });
});

// Route to update an existing task by ID
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const { title, description, completed, priority } = req.body;

    if (!title || !description || typeof completed !== 'boolean' || !['low', 'medium', 'high'].includes(priority)) {
        return res.status(400).json({ error: 'Invalid task data. Title, description, completed, and priority (low, medium, high) are required.' });
    }

    fs.readFile('task.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read task.json' });
        }

        let tasks;
        try {
            tasks = JSON.parse(data);
            if (!Array.isArray(tasks.tasks)) {
                throw new Error('Data is not an array');
            }
        } catch (parseError) {
            return res.status(500).json({ error: 'Invalid task data format' });
        }

        const taskIndex = tasks.tasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Task not found' });
        }

        tasks.tasks[taskIndex] = { 
            ...tasks.tasks[taskIndex], 
            title, 
            description, 
            completed, 
            priority 
        };

        fs.writeFile('task.json', JSON.stringify(tasks, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ error: 'Failed to update task' });
            }
            res.json(tasks.tasks[taskIndex]);
        });
    });
});

// Route to delete a task by ID
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);

    fs.readFile('task.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read task.json' });
        }

        let tasks;
        try {
            tasks = JSON.parse(data);
            if (!Array.isArray(tasks.tasks)) {
                throw new Error('Data is not an array');
            }
        } catch (parseError) {
            return res.status(500).json({ error: 'Invalid task data format' });
        }

        const taskIndex = tasks.tasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Task not found' });
        }

        tasks.tasks.splice(taskIndex, 1);

        fs.writeFile('task.json', JSON.stringify(tasks, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ error: 'Failed to delete task' });
            }
            res.status(204).send();
        });
    });
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

module.exports = app;