    // -- 'Safety Search' -- //

   // -- Data -- //
let player;
let enemies = [];


  // Map Setup //
let tileSize = 20;
let cols = 20;
let rows = 20;
let maze = [ 
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1],
[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1],
[1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,1,1],
[1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,1,1,0,1,1],
[1,1,1,1,1,0,1,1,1,1,1,1,0,1,0,0,0,1,0,0,0,0,1,1],
[1,1,0,1,1,0,1,1,1,0,0,0,0,1,1,1,1,1,0,1,1,1,1,1],
[1,1,0,0,0,0,1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,1],
[1,1,1,1,1,1,1,0,0,1,1,1,0,0,0,0,1,1,1,1,1,1,0,1],
[1,1,0,0,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1],
[1,1,0,1,0,0,0,0,1,1,1,0,0,0,1,1,1,1,0,0,0,0,0,1],
[1,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0,1],
[1,0,0,1,1,1,1,0,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,1],
[1,0,1,1,0,0,0,0,0,0,0,0,1,1,0,1,1,1,0,1,1,1,0,1],
[1,0,1,1,0,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,1,1,1,1],
[1,0,1,1,0,0,0,0,1,1,1,1,1,1,1,1,0,1,1,0,0,0,0,1],
[1,0,1,1,1,1,1,0,1,1,0,0,0,0,1,1,0,0,1,1,1,1,0,1],
[1,0,1,1,1,1,1,0,0,0,0,1,1,0,1,1,1,0,1,1,1,0,0,1],
[1,0,1,0,0,0,1,1,1,1,1,1,1,0,0,0,1,0,1,1,1,0,1,1],
[1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,1,1],
[1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,1,0,1,1,1,1,1],
[1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,0,1,1,0,0,0,0,1,1],
[1,0,0,0,0,1,1,1,0,1,1,1,0,0,1,0,1,1,1,1,1,0,0,1],
[1,0,1,1,0,1,1,1,0,1,1,1,0,1,1,0,0,0,1,1,1,1,0,1],
[1,0,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,0,1,1,0,0,0,1],
[1,0,1,1,0,1,1,0,0,1,1,1,0,0,0,1,1,0,1,1,0,1,1,1],
[1,0,1,1,0,1,1,0,0,0,0,1,1,1,0,1,1,0,1,1,0,1,1,1],
[1,0,1,1,0,0,0,0,1,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1],
[1,0,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

   // -- Fuctions -- //
  // Window Resize //
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  tileSize = floor(min(width / cols, height / rows));
}

  // Setup //
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);

  cols = maze[0].length;
  rows = maze.length;
  tileSize = floor(min(width / cols, height / rows));

  player = new Player(10, 28); // Player starting position 
 
  enemies.push(new Enemy(8, 1));// Enemies starting position 
  enemies.push(new Enemy(7, 9));// Add more here if wanted
}


  // Maze Creation //
function drawMaze() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {

      if (maze[y][x] === 1) {
        fill(0,0,255); // Wall colour
      } 
      else if (maze[y][x] === 3) {
        fill(0,255,0); // Win tile colour
      }
      else {
        fill(0); // Empty space colour
      }

      rect(x*tileSize, y*tileSize, tileSize, tileSize);
    }
  }
}


  // Player Controls //
function keyPressed() {
  // Arrow keys 
  if (keyCode === LEFT_ARROW)  player.move(-1, 0);
  if (keyCode === RIGHT_ARROW) player.move(1, 0);
  if (keyCode === UP_ARROW)    player.move(0, -1);
  if (keyCode === DOWN_ARROW)  player.move(0, 1);

  // WASD keys 
  if (key === 'a' || key === 'A') player.move(-1, 0); 
  if (key === 'd' || key === 'D') player.move(1, 0);  
  if (key === 'w' || key === 'W') player.move(0, -1); 
  if (key === 's' || key === 'S') player.move(0, 1);  
}

  // Game Creation //
 function draw() {
  background(0);
  drawMaze();

  player.show();

  for (let enemy of enemies) {
    enemy.chase(player);
    enemy.show();

// Win condition
if (maze[player.y][player.x] === 3) {
  noLoop();
  fill(0,255,0); // Colour
  textSize(32);
  textAlign(CENTER, CENTER);
  text("You Win!", width/2, height/2);
}

// Lose condition
    if (enemy.x === player.x && enemy.y === player.y) {
      noLoop(); 
      fill(255,0,0); // Colour
      textSize(32);
      textAlign(CENTER, CENTER);
      text("Game Over!", width/2, height/2);
    }
  }
}

  
   // -- Enemy and Player -- //
class Player {
constructor(x, y) {
  this.x = x;
  this.y = y;
  this.dx = 0;   
  this.dy = 0; 
}
  // Player's model //
  show() { 
    fill(255, 255, 0); // Player colour
    ellipse(
      this.x * tileSize + tileSize / 2,
      this.y * tileSize + tileSize / 2,
      tileSize * 0.8
    );
  }
 // Update position based on dx/dy
  update() {
    this.tryMove(this.dx, this.dy);
  }

  // Move manually
  move(dx, dy) {
    this.tryMove(dx, dy);
  }

  // Check if a tile is walkable
  canMoveTo(x, y) {
    return maze[y] && (maze[y][x] === 0 || maze[y][x] === 3);
  }

  // Handle movement and collisions
  tryMove(dx, dy) {
    let newX = this.x + dx;
    let newY = this.y + dy;

    if (this.canMoveTo(newX, newY)) {
      this.x = newX;
      this.y = newY;
    }
  }
}

class Enemy {
   constructor (x, y) {
    this.x = x;
    this.y = y;
    this.moveCooldown = 0; // frames until next move
    this.lockOnDistance = 5; // distance at which enemy will start chasing
  }
 
   // Enemy Model //
  show() {
    fill(255, 0, 0); // Enemy colour
    rect(this.x * tileSize, this.y * tileSize, tileSize, tileSize);
  }

  chase(player) {
    if (this.moveCooldown > 0) {
      this.moveCooldown--;
      return; 
    }

    this.moveCooldown = 20; // Move once every X frames

    // Calculate distance to player
    let dx = player.x - this.x;
    let dy = player.y - this.y;
    let distance = sqrt(dx * dx + dy * dy);

    // Decide behavior based on distance
    if (distance <= this.lockOnDistance) {
      // If player is close, chase
      if (dx * dx > dy * dy) {
        if (dx > 0 && maze[this.y][this.x + 1] === 0) this.x++;
        else if (dx < 0 && maze[this.y][this.x - 1] === 0) this.x--;
        else if (dy > 0 && maze[this.y + 1][this.x] === 0) this.y++;
        else if (dy < 0 && maze[this.y - 1][this.x] === 0) this.y--;
      } else {
        if (dy > 0 && maze[this.y + 1][this.x] === 0) this.y++;
        else if (dy < 0 && maze[this.y - 1][this.x] === 0) this.y--;
        else if (dx > 0 && maze[this.y][this.x + 1] === 0) this.x++;
        else if (dx < 0 && maze[this.y][this.x - 1] === 0) this.x--;
      }
    } 

    // If player is far, move randomly
    else {
      let moves = [];
      if (maze[this.y][this.x + 1] === 0) moves.push([1, 0]);
      if (maze[this.y][this.x - 1] === 0) moves.push([-1, 0]);
      if (maze[this.y + 1] && maze[this.y + 1][this.x] === 0) moves.push([0, 1]);
      if (maze[this.y - 1] && maze[this.y - 1][this.x] === 0) moves.push([0, -1]);

      if (moves.length > 0) {
        let move = moves[floor(random(moves.length))];
        this.x += move[0];
        this.y += move[1];
      }
    }
  }
}


