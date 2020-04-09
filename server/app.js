import express from 'express';
import socketio from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import { initRouter } from './router';
import { addUser, removeUser, getUser, getUserInRoom } from './users';

// env config Global
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// thiết lập router
initRouter(app);

io.on('connection', function (socket) {

  console.log('a user connected');
  socket.on('join', ({ name, room }, cb) => {

    // add user when user login.
    // khái báo bằng cách phân rã biến trong es6
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return cb(error);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room, ${user.room}` });
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined !`, })
    socket.join(user.room);
    cb();

  });

  socket.on('sendMessage', (message, cb) => {

    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });
    cb();

  })


  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

});

server.listen(3100, function () {
  console.log(`Server is running on...${3100}`);
});