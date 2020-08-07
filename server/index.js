require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      http = require('http'),
      path = require('path'),
      socketio = require('socket.io'),
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
app.post('/auth/email', authCtrl.sendEmail);
app.get('/auth/quickLogin', checkLoggedInCtrl.checkLoggedIn, authCtrl.quickLogin);
app.get('/auth/logout', authCtrl.logout);
app.get('/auth/isAdmin/:id', authCtrl.isAdmin);

app.get('/api/ideas', ideaCtrl.getIdeas);
app.get('/api/myIdeas', checkLoggedInCtrl.checkLoggedIn, ideaCtrl.getMyIdeas);
app.get('/api/ideas/projects', checkLoggedInCtrl.checkLoggedIn, ideaCtrl.getProjects);
app.get('/api/ideas/:id', checkLoggedInCtrl.checkCorrectUser, ideaCtrl.getIdea);
app.get('/api/ideas/collaborators/:id', checkLoggedInCtrl.checkCorrectUser, ideaCtrl.getCollaborators);
app.post('/api/ideas', checkLoggedInCtrl.checkLoggedIn, ideaCtrl.createIdea);
app.put('/api/ideas/live/:id', ideaCtrl.toggleLive);
app.put('/api/ideas/:id', ideaCtrl.editIdea);
app.put('/api/ideas/plan/:id', ideaCtrl.editPlan);
app.delete('/api/ideas/:id', ideaCtrl.deleteIdea);

app.get('/api/messages/all', checkLoggedInCtrl.checkLoggedIn, messagesCtrl.getRequests);
app.get('/api/messages/:id', checkLoggedInCtrl.checkCorrectUser, messagesCtrl.getMessages);
app.post('/api/messages/requests', checkLoggedInCtrl.checkLoggedIn, messagesCtrl.addRequest);
app.post('/api/messages/:id', checkLoggedInCtrl.checkLoggedIn, messagesCtrl.sendMessage);
app.put('/api/messages/requests/:id', messagesCtrl.acceptRequest);
app.delete('/api/messages/requests/:id', messagesCtrl.deleteRequest);

app.post('/api/ideas/tasks/:id', ideaCtrl.createTask);
app.get('/api/ideas/tasks/:id', ideaCtrl.getTasks);
app.put('/api/ideas/tasks/:id', ideaCtrl.toggleComplete);
app.delete('/api/ideas/tasks/:id', ideaCtrl.deleteTask);

app.get('/api/users', authCtrl.getUsers);
const router = require('./router');

const server = http.createServer(app);
const io = socketio(server);

var allowedOrigins = "http://localhost:* http://167.172.193.114:*";
io.origins(['http://1167.172.193.114:3000']);

io.on('connection', (socket) => {
    console.log('We have a new connection!!!');
    socket.on('join', room => {
        socket.join(room);
    })

    socket.on('sendMessage', ({room, message}) => {
        io.to(room).emit('message', message);
    })

    socket.on('disconnect', () => {
        console.log('User has left.')
    })
})



app.use(express.static(__dirname + '/../build'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})
server.listen(SERVER_PORT, () => console.log(`Server has started on port ${SERVER_PORT}`));


// app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));