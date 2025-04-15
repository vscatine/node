const express = require('express')
const router = express.Router()

const TaskController  = require('../controllers/TaskController')
const Task = require('../models/Task')

router.get('/', TaskController.showTasks)
router.get('/add', TaskController.createTask)

router.post('/add', TaskController.addTask)

router.get('/edit/:id', TaskController.updateTask)
router.post('/edit', TaskController.updateTaskDB)

router.post('/updatestatus', TaskController.updateStatusToggle)

router.post('/remove', TaskController.removeTask)

module.exports = router
