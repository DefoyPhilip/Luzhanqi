import express from 'express';
import http from 'http';
import socket from 'socket.io';
import path from 'path';
import User from './models/server/User';

const app = express();
app.set('port', process.env.PORT || 3000);
const server = http.createServer(app).listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
const io = socket.listen(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

let activeUsers = {};

io.on('connection', (sock) => {
  const { id } = sock.handshake.query;
  let user;
  if (id && activeUsers[id]) {
    user = activeUsers[id];
  } else {
    user = new User();
    activeUsers = Object.assign({}, activeUsers, {
      [user.id]: user,
    });
  }
  // sock.join(`user${activeUsers}`);
  sock.emit('connected', user);
  io.emit('global:new users', activeUsers);
  io.emit('global:connected msg', `User ${user.name} connected`);
  sock.on('chat message', (msg) => {
    // io.to('user0').emit('chat message', msg);
    io.emit('global:chat message', msg);
  });
  sock.on('update name', (payload) => {
    user.name = payload.name;
    io.emit('global:update name', user);
  });
  sock.on('disconnect', () => {
    activeUsers = Object.assign({}, activeUsers, {
      [user.id]: user,
    });
    io.emit('global:user disconnected', user.id);
  });
});
