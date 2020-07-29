require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      checkLoggedInCtrl = require('./controllers/checkLoggedInController'),
      authCtrl = require('./controllers/authController'),
      ideaCtrl = require('./controllers/ideaController'),
      messagesCtrl = require('./controllers/messagesController'),
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
app.get('/auth/quickLogin', checkLoggedInCtrl.checkLoggedIn, authCtrl.quickLogin);
app.get('/auth/logout', authCtrl.logout);

app.get('/api/ideas', ideaCtrl.getIdeas);
app.get('/api/myIdeas', checkLoggedInCtrl.checkLoggedIn, ideaCtrl.getMyIdeas);
app.post('/api/ideas', checkLoggedInCtrl.checkLoggedIn, ideaCtrl.createIdea);
app.put('/api/ideas/live/:id', ideaCtrl.toggleLive);
app.put('/api/ideas/:id', ideaCtrl.editIdea);
app.delete('/api/ideas/:id', ideaCtrl.deleteIdea);

app.get('/api/messages/all', checkLoggedInCtrl.checkLoggedIn, messagesCtrl.getRequests);
app.post('/api/messages/requests', checkLoggedInCtrl.checkLoggedIn, messagesCtrl.addRequest);
app.delete('/api/messages/requests/:id', messagesCtrl.deleteRequest);


app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));