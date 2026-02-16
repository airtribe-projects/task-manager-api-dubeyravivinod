const { v4: uuidv4 } = require('uuid');

let task = []

class TaskModel {
    static getAllTasks() {
        return task;
    }

    static getTaskById(id) {
        return task.find(t => t.id === id);
    }

    static createTask(data) {
        const newTask = {
            id: uuidv4(),
            title: data.title,
            description: data.description,
            completed: data.completed || false,
        }
        task.push(newTask);
        return newTask;
    }

    static updateTask(id, data) {
        const task = this.getTaskById(id);
        console.log('Updating task with ID:', id);
        if (task) {
            task.title = data.title || task.title;
            task.description = data.description || task.description;
            task.completed = data.completed !== undefined ? data.completed : task.completed;
            return task;
        }
        else {
            return null;
        }
    }

    static deleteTask(id) {
        const index = task.findIndex(t => t.id === id);
        if (index === -1) return null;

        const deleteTask = task[index];
        task.splice(index, 1);
        return deleteTask;
    }
}

module.exports = TaskModel;