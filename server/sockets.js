const xxh = require('xxhashjs');
// custom class for the player
const Pharacter = require('./classes/Player.js');
// gravity stuff
const physics = require('./physics.js');

// object of user users
const users = {};

// our socketio instance
let io;

// Possible directions a user can move
const directions = {
  DOWNLEFT: 0,
  DOWN: 1,
  DOWNRIGHT: 2,
  LEFT: 3,
  UPLEFT: 4,
  RIGHT: 5,
  UPRIGHT: 6,
  UP: 7,
};

// function to setup our socket server
const setupSockets = (ioServer) => {
  // set our io server instance
  io = ioServer;

  // on socket connections
  io.on('connection', (sock) => {
    const socket = sock;

    socket.join('room1'); // join user to our socket room

    const hash = xxh.h32(`${socket.id}${new Date().getTime()}`, 0xDEADBEEF).toString(16);

    // create a new user and store it by its unique id
    users[hash] = new user(hash);

    // add the id to the user's socket object for quick reference
    socket.hash = hash;

    // emit a joined event to the user and send them their user
    socket.emit('joined', users[hash]);

    // user has moved
    socket.on('movementUpdate', (data) => {
      // update the user's info
      users[socket.hash] = data;
      users[socket.hash].lastUpdate = new Date().getTime();
        
      // update physics simulation
      physics.setuser(users[socket.hash]);

      // tell everyone someone has moved
      io.sockets.in('room1').emit('updatedMovement', users[socket.hash]);
    });
      

    // when the user disconnects
    socket.on('disconnect', () => {
      // let everyone know this user left
      io.sockets.in('room1').emit('left', users[socket.hash]);
      // remove this user from our object
      delete users[socket.hash];
      // update the user list in our physics calculations
      physics.setuserList(users);

      // remove this user from the socket room
      socket.leave('room1');
    });
  });
};

module.exports.setupSockets = setupSockets;
