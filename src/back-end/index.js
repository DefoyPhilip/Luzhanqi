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

io.on('connection', (sock) => {
  // sock.join(`user${activeUser}`);
  const user = new User();
  console.log(`${user.name} connected`);
  sock.emit('connected', user);
  sock.on('chat message', (msg) => {
    // io.to('user0').emit('chat message', msg);
    io.emit('chat message', msg);
  });
  sock.on('disconnect', () => {
    console.log('user disconnected');
  });
});
