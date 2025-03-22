module.exports = {
    isAuthenticated: (req, res, next) => {
        if (req.session.admin) return next();
        res.redirect('/login');
    },
    isSuperAdmin: (req, res, next) => {
        if (req.session.admin && req.session.admin.role === 'superadmin') return next();
        res.redirect('/dashboard')
    }
};