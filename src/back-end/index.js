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

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});
