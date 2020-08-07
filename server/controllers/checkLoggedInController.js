
module.exports = {
    checkLoggedIn: (req, res, next) => {
        if (!req.session.user) return res.status(403).send('Not Logged in');
        next();
    },
    checkCorrectUser: async (req, res, next) => {
        const db = req.app.get('db');
        const correctUser = await db.auth.check_user(req.session.user.id, req.params.id);

        if (!correctUser[0]) return res.status(403).send('Not Authorized here');
        next();
    }
}