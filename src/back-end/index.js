import express from 'express';
import http from 'http';
import socket from 'socket.io';
import path from 'path';

const app = express();
app.set('port', process.env.PORT || 3000);
const server = http.createServer(app).listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
const io = socket.listen(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

let activeUser = 0;

io.on('connection', (sock) => {
  console.log(`user${activeUser} connected`);
  sock.join(`user${activeUser}`);
  activeUser += 1;
  sock.on('chat message', (msg) => {
    io.to('user0').emit('chat message', msg);
  });
  sock.on('disconnect', () => {
    console.log('user disconnected');
  });
});
