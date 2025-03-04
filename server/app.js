#!/usr/bin/env node

"use strict";

const http = require('http');
const path = require('path');
const express = require('express');

const args = process.argv.slice(2);
const port = normalizePort(args[0] || process.env.PORT || 8350);

const app = express();
app.set('port', port);
app.use(function(req, res, next) {
    next();
});

app.use("/", express.static(path.join(__dirname, '..', 'ui', 'build')));
app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, '..', 'ui', 'build', 'index.html'));
});

//Run server
const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
    console.log(process.cwd(), __dirname, __filename);
}