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

module.exports = router;