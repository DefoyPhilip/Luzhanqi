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
  sock.on('chat message', ({ msg, room }) => {
    if (room === 'lobby') {
      io.emit('global:chat message', { msg, room });
    } else {
      io.emit(`${room}:chat message`, { msg, room: user.id });
      io.emit(`${user.id}:chat message`, { msg, room });
    }
  });
  sock.on('update name', (payload) => {
    user.name = payload.name;
    io.emit('global:update name', user);
  });
  sock.on('player ready', (payload) => {
    const { room, state } = payload;
    if (state) {
      if (activeUsers[room].isReadyWith === id) {
        console.log('start game');
      } else {
        user.isReadyWith = room;
        activeUsers = Object.assign({}, activeUsers, {
          [id]: user,
        });
      }
    } else {
      user.isReadyWith = '';
      activeUsers = Object.assign({}, activeUsers, {
        [id]: user,
      });
    }
  });
  sock.on('disconnect', () => {
    activeUsers = Object.assign({}, activeUsers, {
      [user.id]: user,
    });
    io.emit('global:user disconnected', user.id);
  });
});
