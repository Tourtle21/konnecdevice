const bcrypt = require('bcryptjs');

module.exports = {
    login: async (req, res) => {
        const db = req.app.get('db'),
              {username, password} = req.body;

        const checkUsername = await db.auth.checkUser({username});
        if (!checkUsername[0]) return res.status(401).send('Username or Password is incorrect')
        const authorization = bcrypt.compareSync(password, checkUsername[0].password);
        if (!authorization) return res.status(401).send('Username or Password is incorrect');
        delete checkUsername[0].password;
        req.session.user = checkUsername[0];
        return res.status(200).send(req.session.user);
    },
    register: async (req, res) => {
        const db = req.app.get('db'),
              {username, password, description, displayName} = req.body,
              checkUsername = await db.auth.checkUser({username});

        if (checkUsername[0]) return res.status(403).send('Username already taken');
        const hash = bcrypt.hashSync(password, 10);
        const newUser = await db.auth.createUser({username, hash, description, displayName});

        delete newUser[0].password;
        req.session.user = newUser[0];
        return res.status(200).send(req.session.user);
              
    },
    quickLogin: async (req, res) => {
        const db = req.app.get('db'),
            {username} = req.session.user;
        const userInfo = await db.auth.checkUser({username:req.session.user.username});
        if (!userInfo[0]) {
            req.session.destroy();
            return res.status(404).send('No User Logged in')
        }
        return res.status(200).send(req.session.user);
    },
    logout: (req, res) => {
        req.session.destroy();
        return res.sendStatus(200);
    }
}