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

module.exports = validateTask