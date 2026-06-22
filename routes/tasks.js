const express = require('express');
const router = express.Router();
const db = require('../database/db');

const isAuthenticated = require('../middleware/auth');
const validateTask = require('../middleware/validateTask');

// 🔐 PROTECT ALL TASK ROUTES
router.use(isAuthenticated);

// LIST TASKS (ONLY USER TASKS)
router.get('/', (req, res) => {
  const tasks = db.prepare(`
    SELECT * FROM tasks
    WHERE user_id = ?
  `).all(req.session.userId);

  res.render('tasks', {
    title: 'My Tasks',
    tasks
  });
});

// CREATE TASK
router.post('/', validateTask, (req, res) => {
  db.prepare(`
    INSERT INTO tasks (name, user_id)
    VALUES (?, ?)
  `).run(req.body.name, req.session.userId);

  res.redirect('/tasks');
});

// NEW TASK FORM
router.get('/new', (req, res) => {
  res.render('new-task', { title: 'New Task' });
});

// VIEW TASK
router.get('/:id', (req, res) => {
  const task = db.prepare(`
    SELECT * FROM tasks
    WHERE id = ? AND user_id = ?
  `).get(req.params.id, req.session.userId);

  if (!task) return res.send('Not found');

  res.render('task', { task });
});

// EDIT FORM
router.get('/:id/edit', (req, res) => {
  const task = db.prepare(`
    SELECT * FROM tasks
    WHERE id = ? AND user_id = ?
  `).get(req.params.id, req.session.userId);

  if (!task) return res.send('Not found');

  res.render('edit-task', { task });
});

// UPDATE TASK
router.post('/:id', validateTask, (req, res) => {
  db.prepare(`
    UPDATE tasks
    SET name = ?
    WHERE id = ? AND user_id = ?
  `).run(req.body.name, req.params.id, req.session.userId);

  res.redirect('/tasks');
});

// DELETE TASK
router.post('/:id/delete', (req, res) => {
  db.prepare(`
    DELETE FROM tasks
    WHERE id = ? AND user_id = ?
  `).run(req.params.id, req.session.userId);

  res.redirect('/tasks');
});

module.exports = router;