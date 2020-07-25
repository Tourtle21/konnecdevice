require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      authCtrl = require('./controllers/authController'),
      ideaCtrl = require('./controllers/ideaController'),
      app = express(),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

app.use(express.json());

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    app.set('db', db);
    console.log('DATABASE CONNECTED');
})

app.use(session({
    resave: false,
    saveUninitialized:true,
    secret: SESSION_SECRET
}))

app.post('/auth/login', authCtrl.login);
app.post('/auth/register', authCtrl.register);
app.get('/auth/quickLogin', authCtrl.quickLogin);
app.get('/auth/logout', authCtrl.logout);

app.get('/api/ideas', ideaCtrl.getIdeas);


app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));