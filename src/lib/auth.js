require('passport')

module.exports = {

    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            return res.redirect('/signin')
        }
    },

    isNotLoggedin(req, res, next) {

        if (!req.isAuthenticated()) {
            return next()
        } else {
            req.flash('message', 'You are already signed in!')
            return res.redirect('/profile')

        }
    }

}