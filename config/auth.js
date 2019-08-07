// Any route that we want to be protected, the below procedure is mandatory.

module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAunthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Please login to view this resource');
        res.redirect('/users/login');
    }
}