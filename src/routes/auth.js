const { Router } = require('express');
const { Passport } = require('passport');
const router = Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedin } = require('../lib/auth')


//REGISTER FORM
router.get('/register', isNotLoggedin, (req, res) => {
    res.render('auth/register')
});


//REGISTER DATA
router.post('/register', isNotLoggedin, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/register',
    failureFlash: true
}));


//LOGIN
router.get('/signin', isNotLoggedin, (req, res) => {
    res.render('auth/login')
})


//LOGIN DATA
router.post('/signin', isNotLoggedin, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
})


//PROFILE
router.get('/profile', isLoggedIn, (req, res) => {
    res.render('auth/profile')
})

//LOGOUT
router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    res.redirect('/signin')
})

module.exports = router;