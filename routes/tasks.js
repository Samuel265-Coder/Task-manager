const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const db = require('../database/db')

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


// Validation Middleware
function validateTask(req, res, next) {

    const { name } = req.body;

    if (!name || name.trim() === '') {
        return res.render('new-task', {
            title: 'Create Task',
            error: 'Task name is required',
            taskName: ''
        });
    }

    if (name.trim().length < 3) {
        return res.render('new-task', {
            title: 'Create Task',
            error: 'Task name must be at least 3 characters',
            taskName: name
        });
    }

    if (name.trim().length > 100) {
        return res.render('new-task', {
            title: 'Create Task',
            error: 'Task name cannot exceed 100 characters',
            taskName: name
        });
    }

    next();
}


/* ===========================
   LOAD ALL TASKS
=========================== */

router.get('/', (req, res) => {

        const tasks = db
            .prepare('SELECT * FROM tasks')
            .all();
        
        res.render('tasks',{
            title:'Task Manager',
            tasks:tasks
        })

});

/* ===========================
   SHOW CREATE FORM
=========================== */

router.get('/new', (req, res) => {

    res.render('new-task', {
        title: 'Create New Task'
    });

});

/* ===========================
   CREATE TASK
=========================== */

router.post('/', validateTask, (req, res) => {

    db.prepare('insert into tasks(name) values(?)').run(req.body.name);
    res.redirect('/tasks');

});

/* ===========================
   SHOW EDIT FORM
=========================== */

router.get('/:id/edit', (req, res) => {

    const task = db.prepare('select * from tasks where id=?').get(req.params.id)


    if (!task) {
        return res.status(404).render('error', {
            message: 'Task not found'
        });
    }

    res.render('edit-task', {
        title: 'Edit Task',
        task
    });

});

/* ===========================
   UPDATE TASK
=========================== */

router.post('/:id', validateTask,  (req, res) => {

    const task = db.prepare('select * from tasks where id=?').get(req.params.id)


    if (!task) {
        return res.status(404).render('error', {
            message: 'Task not found'
        });
    }

    db.prepare(
            'UPDATE tasks SET name = ? WHERE id = ?'
        ).run(
            req.body.name.trim(),
            req.params.id
        );

    res.redirect('/tasks');

});

/* ===========================
   VIEW SINGLE TASK
=========================== */

router.get('/:id', (req, res) => {

  const task = db.prepare('select * from tasks where id=?').get(req.params.id)


    if (!task) {
        return res.status(404).render('error', {
            message: 'Task not found'
        });
    }

    res.render('task', {
        title: 'Task Details',
        task
    });

});

/* ===========================
   DELETE TASK
=========================== */

router.post('/:id/delete', (req, res) => {

    db.prepare('delete from tasks where id=?').run(req.params.id)

    res.redirect('/tasks');

});

module.exports = router;