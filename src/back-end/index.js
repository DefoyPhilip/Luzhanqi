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

let activeUser = {};

io.on('connection', (sock) => {
  const { id } = sock.handshake.query;
  let user;
  if (id && activeUser[id]) {
    user = activeUser[id];
  } else {
    user = new User();
    activeUser = Object.assign({}, activeUser, {
      [user.id]: user,
    });
  }
  // sock.join(`user${activeUser}`);
  sock.emit('connected', user);
  io.emit('chat message', `User ${user.name} connected`);
  sock.on('chat message', (msg) => {
    // io.to('user0').emit('chat message', msg);
    io.emit('chat message', msg);
  });
  sock.on('disconnect', () => {
    console.log('user disconnected');
  });
});
