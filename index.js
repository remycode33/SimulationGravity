let old = Date.now();
let frequence = 500;
let canvas = document.querySelector("#canvas");
// set canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext("2d");
console.log("🚀 ~ file: index.js:5 ~ ctx:", ctx);

class Player {
  constructor(name, size, position, color) {
    this.name = name;
    this.size = size;
    this.position = position;
    this.color = color;
  }
  drawPlayer(size = this.size, position = this.position) {
    ctx.fillStyle = "white";
    ctx.fillRect(position.x, position.y, size, size);
  }
}

let player1 = new Player("p1", 100, { x: 50, y: 300 }, "white");
player1.drawPlayer();

let clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

let setPositionPlayer = (player, x, y) => {
  player.position.x += x;
  player.position.y += y;
};

let movePlayer = (player = player1, x = 0, y = 0) => {
  clearCanvas();
  setPositionPlayer(player, x, y);
  player1.drawPlayer();
};

let jump = (t, player) => {
  let y;
  if (player.y >= 500) {
    y = -t * -t;
  }
  return y;
};

let durationJump = 1000;
let durationDown = 1000;

let movePlayer1 = (player, x, y) => {
  let now = Date.now();

  if (now - old >= frequence) {
    movePlayer(player, x, y);
    window.requestAnimationFrame(() => movePlayer1(player, x, y));
    console.log("option 1");
    old = Date.now();
  } else {
    console.warn(new Date(old), new Date(now));
    window.requestAnimationFrame(() => movePlayer1(player, x, y));
  }
};

// movePlayer1(player1, 10, 0);
