const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    status: {
        type: String,
        enum: ['toDo', 'doing', 'done', 'late'],
        default: 'toDo',
    },
    deletedAt: {
        type: Date,
        default: null
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},{
    toJSON: {
        virtuals: true,
    }
});

// TaskSchema.virtual('date2').get(function () {
//     return this.date.getDate()
// })

module.exports = mongoose.model('Task', TaskSchema);