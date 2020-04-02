const express = require('express')
const path = require('path');
const http = require('http');
const SocketIO = require('socket.io');

// global variables
const app = express()
const port = process.env.PORT || 3000;
const server = http.createServer(app);

// IO = este es la comunicacion con el backend
module.exports.io = SocketIO(server);

// importar sockets
require('../server/sockets/socket.io');


// static files
app.use(express.static(path.resolve(__dirname ,'../public')));



server.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`))