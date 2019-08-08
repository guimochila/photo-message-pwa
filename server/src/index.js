const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const fs = require('fs');

const messageData = fs.readFileSync(`${__dirname}/db.json`).toString();
const messages = messageData ? JSON.parse(messageData) : [];

// Listen for new socket client
io.on('connection', socket => {
  socket.emit('all_messages', messages);

  socket.on('new_message', message => {
    messages.unshift(message);
    socket.broadcast.emit('new_message', message);
    fs.writeFileSync(`${__dirname}/db.json`, JSON.stringify(messages));
  });
});

// Static content
app.use(express.static(path.join(__dirname, '../../build')));
app.use('/modules', express.static(path.join(__dirname, '../../node_modules')));

// Start server
const port = process.env.PORT || 8000;
http.listen(port, () => console.log(`Server is running on port ${port}`));
