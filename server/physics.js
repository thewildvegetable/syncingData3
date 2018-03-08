const sockets = require('./sockets.js');

let userList = {}; // list of users

const gravity = -1.2;   //the value of gravity that will be applied

// update our entire userlist
const setUserList = (users) => {
  userList = users;
};

// update an individual user
const setUser = (user) => {
  userList[user.hash] = user;
};

//put the effects of gravity on the user
const applyGravity = (user) => {
    
};

// applies gravity to all the users in the room
const gravity = () => {
    //make sure there are users
    if (userList.length < 0){
        return;
    }
    
    // get all users
    const keys = Object.keys(userList);
    
};

// apply gravity every 20ms
setInterval(() => {
  gravity();
}, 20);

module.exports.setUserList = setUserList;
module.exports.setUser = setUser;