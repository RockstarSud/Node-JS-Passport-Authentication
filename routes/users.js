// Setting express router
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// User model
const User = require('../models/User');

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register handle
router.post('/register', (req, res) => {
    // represents the data entered during registration in console. 
    // console.log(req.body)
    // res.send('Hello');

    const {name, email, password, password2} = req.body;
    let errors = [];

    // Validations 
    // Check required fields
    if(!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    // Check passwords match
    if(password !== password2) {
        errors.push({ msg: 'Passwords do not match.' });
    }

    // Check password length
    if(password.length < 6) {
        errors.push({ msg: 'Password should be atleast 6 characters' });
    }

    // If there's an issue/any of the above condition is true , then we need to re-render the registration form
    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email, 
            password,
            password2
        });
    }
    else {
        // res.send('pass');
        // Validation Passed
            //  This one would be going to return promise, hence we used then 
        User.findOne({ email: email})
            .then(user => {
                if(user) {
                    // User exists
                    errors.push({ msg: 'Email is already registered' });
                    res.render('register', {
                        errors,
                        name,
                        email, 
                        password,
                        password2
                    });
                }
                else {
                    const newUser = new User({
                        name, 
                        email,
                        password
                    });
                    // console.log(newUser);
                    // res.send('hello');

                    // Hash Password
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;

                        // Set passord to hashed
                        newUser.password = hash;

                        // Save User
                        newUser.save()
                            .then(user => {
                                req.flash('success_msg', 'You are now registered and can login');
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));

                    }))

                }
            })
    }
});

// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect(/users/login);
});

module.exports = router;