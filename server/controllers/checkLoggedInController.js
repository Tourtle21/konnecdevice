
module.exports = {
    checkLoggedIn: (req, res, next) => {
        if (!req.session.user) return res.status(403).send('Not Logged in');
        next();
    }
}