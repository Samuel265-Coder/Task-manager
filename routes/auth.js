const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../database/db');



router.get('/register', (req, res) => {

    res.render('register', {
        title: 'Register'
    });

});


router.post('/register', async (req, res) => {

    const {
        username,
        email,
        password
    } = req.body;

   const hashedPassword = await bcrypt.hash(password, 10);


    if (!username || !email || !password) {

        return res.render('register', {
            title: 'Register',
            error: 'All fields are required'
        });

    }



    const existingUser = db.prepare(
        `
        SELECT *
        FROM users
        WHERE email = ?
        `
    ).get(email);

    if (existingUser) {

        return res.render('register', {
            title: 'Register',
            error: 'Email already exists'
        });

    }

    db.prepare(
        `
        INSERT INTO users(
            username,
            email,
            password
        )
        VALUES(?,?,?)
        `
    ).run(
        username.trim(),
        email.trim(),
        hashedPassword
    );

    res.redirect('/login');

});


router.get('/login', (req, res) => {
  res.render('login');
});


router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 1. Find user
  const user = db.prepare(`
    SELECT * FROM users WHERE username = ?
  `).get(username);

  // 2. Check if user exists
  if (!user) {
    return res.send('User not found');
  }

  // 3. Check password
  const isValid = bcrypt.compareSync(password, user.password);

  if (!isValid) {
    return res.send('Invalid password');
  }

  // 4. Create session
  req.session.userId = user.id;

  // 5. Redirect to dashboard/tasks
  res.redirect('/tasks');
});

module.exports = router;