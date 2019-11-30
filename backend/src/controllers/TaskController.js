const Task = require('../models/Task')

module.exports = {
    async store(req, res) {
        const { title, description, date, status } = req.body;
        console.log(title)
        const task = await Task.create({
            title,
            description,
            date,
            user: req.id,
            status
        });

        return res.json(task);
    },

    async index(req, res) {

        const userTasksToDo = await Task.find({ user: req.id, status: 'toDo', deletedAt: null });
        const userTasksGoing = await Task.find({ user: req.id, status: 'doing', deletedAt: null });
        const userTasksDone = await Task.find({ user: req.id, status: 'done', deletedAt: null });
        const userTasksLate = await Task.find({ user: req.id, status: 'late', deletedAt: null });

        const response = {
            toDo: userTasksToDo,
            doing: userTasksGoing,
            done: userTasksDone,
            late: userTasksLate,
        }
        return res.json(response);
    },

    async search(req, res) {

        const { taskId } = req.params;
        const task = await Task.find({ _id: taskId, deletedAt: null });
        
        return res.json(task);
    },

    async update(req, res) {
        const { taskId } = req.params;
        const { title, description, date, status} = req.body;

        await Task.findByIdAndUpdate(taskId, {
            title: title,
            description: description,
            date: date,
            status: status
        });

        return res.json(await Task.findById(taskId));
    },

    async destroy(req, res) {
        const { taskId } = req.params;

        await Task.findByIdAndUpdate(taskId, {
            deletedAt: new Date()
        });

        return res.json(await Task.findById(taskId));
    },

    async recycle(req, res) {
        const { taskId } = req.params;

        await Task.findByIdAndUpdate(taskId, {
            deletedAt: null
        });

        return res.json(await Task.findById(taskId));
    }
};