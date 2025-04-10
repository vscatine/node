//const Task = require('../models/Task')

module.exports = class TaskController {
    static showTasks(req, res) {
        res.render('tasks/all')
    }
    
    static createTask(req, res) {
        res.render('tasks/create')
    }
}
