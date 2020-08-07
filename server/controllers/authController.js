const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
require('dotenv').config();
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
              {username, password, description, displayName, file} = req.body,
              checkUsername = await db.auth.checkUser({username});
        if (checkUsername[0]) return res.status(403).send('Username already taken');
        const hash = bcrypt.hashSync(password, 10);
        const newUser = await db.auth.createUser({username, hash, description, displayName, file});

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
    },
    sendEmail: (req, res) => {
        async function main() {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
    
        
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
            host: "imap.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'kardlargin@gmail.com', // generated ethereal user
                pass: process.env.USERPASS, // generated ethereal password
            },
            tls: {rejectUnauthorized: false}
            });
        
            // send mail with defined transport object
            let info = await transporter.sendMail({
            from: '"Konnecdevice" <kardlargin@gmail.com>', // sender address
            to: `User, kadenkleinonline@gmail.com`, // list of receivers
            subject: "Welcome!", // Subject line
            text: "", // plain text body
            html: `
            <span>Your confirmation code is: <b>${req.body.number}</b></span>
            `, // html body
            });
        }
        res.sendStatus(200);
        
        main().catch(console.error);
    },
    getUsers: async (req, res) => {
        const db = req.app.get('db');

        const allUsers = await db.auth.get_users();
        res.status(200).send(allUsers);
    },
    isAdmin: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const admin = await db.auth.get_admin(id);

        res.status(200).send(admin[0]);
    }  
}