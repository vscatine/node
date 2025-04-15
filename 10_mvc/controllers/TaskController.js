const { where } = require('sequelize')
const Task = require('../models/Task')

module.exports = class TaskController {
    static async showTasks(req, res) {
        const tasks = await Task.findAll({ raw : true})

        res.render('tasks/all', {tasks})
    }
    
    static createTask(req, res) {
        res.render('tasks/create')
    }

    static async addTask(req, res) {
        const task = {
            title: req.body.title,
            description: req.body.description,
            done: false
        }

        await Task.create(task)

        res.status(200).redirect('/tasks')
    }

    static async updateTask(req, res) {
        const reqId = req.params.id

        const task = await Task.findOne({
            raw: true,
            where: {
                id: reqId
            }
        })

        res.render('tasks/edit', {task})
    }

    static async updateTaskDB(req, res) {
        const task = {
            id: req.body.id,
            title: req.body.title,
            description: req.body.description,
            done: !req.body.done ? false : true
        }       

        await Task.update(task, {
            where: {id: task.id}
        })

        res.redirect('/tasks')
    }

    static async updateStatusToggle(req, res) {
        const id = req.body.id
        const task = {
            done: req.body.done === '0'? true : false
        }

        console.log(task)

        await Task.update(task, {where: {
            id : id
        }})
        
        res.redirect('/tasks')
    }

    static async removeTask(req, res) {
        const id = req.body.id

        await Task.destroy({where: {
            id: id
        }})

        res.redirect('/tasks')
    }
}
