const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

const app = express();
const server = require('http').createServer(app);
var io = require('socket.io')(server);
const usersRouter = require('./routes/users');

const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/chat";
const connect = mongoose.connect(url);
connect.then(
  db => {
    console.log("Connected correctly to server");
    console.log(mongoose.connection.readyState);
  },
  err => {
    console.log(err);
  }
);

io.on('connect', (socket) => {
  console.log("websocket connection established.");
  socket.on("newMessage", (data) =>{
    io.emit("newMessage", data);
  });
});

require('./passport/passport-facebook');

//app.use(express.static('public'));
app.use(logger('dev'));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(session({
    name: 'session-id',
    secret: 'iugyfjctsusus',
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({mongooseConnection: mongoose.connection})
  }));
app.use(passport.initialize());
app.use(passport.session());

app.use(usersRouter);
server.listen(8000, () => console.log(`Server up and running on port 8000 !`));

module.exports = app;