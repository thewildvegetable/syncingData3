// Character class
class Player {
  constructor(hash) {
    this.hash = hash;
    this.lastUpdate = new Date().getTime();
    this.x = Math.floor((Math.random() * 600) + 1); // x location on screen
    this.y = Math.floor((Math.random() * 400) + 1); // y location on screen
    this.prevX = this.x; // last known x location
    this.prevY = this.y; // last known y location
    this.destX = this.x; // destination x location
    this.destY = this.y; // destination y location
    this.upVelocity = 0;
    this.height = 100;
    this.width = 100;
    this.alpha = 0; // lerp amount (from prev to dest, 0 to 1)
    this.color = `rgb(${Math.floor((Math.random() * 255) + 1)},${Math.floor((Math.random() * 255) + 1)},${Math.floor((Math.random() * 255) + 1)})`;
    this.direction = 0; // direction character is facing
    //done to avoid checking if direction is multiple different values that move horizontally/vertically
    this.moveLeft = false;
    this.moveRight = false;
    this.moveDown = false;
    this.moveUp = false;
  }
}

module.exports = Player;