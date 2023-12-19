let initialTimer = Date.now();
let frequence = 30;
let canvas = document.querySelector("#canvas");
let now;
let gravityFactor = 80;
let heigthJump = 20;

let timeStartJump;
let inJump = false;

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

let player1 = new Player("p1", 100, { x: 50, y: 500 }, "white");
player1.drawPlayer();

let clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

let setPositionPlayer = (player, x, y) => {
  player.position.x += x;
  player.position.y += y;
};

// let animeStarted = false;

let movePlayer = (player, x, y) => {
  try {
    let timerEnterMove = Date.now();
    let newY = y;
    if (timerEnterMove - initialTimer >= frequence) {
      now = timerEnterMove;
      if (player.position.y > 500) {
        newY = 0;
        player.position.y = 500;
        inJump = false;
        console.log("first case / position y", player.position.y);
        window.requestAnimationFrame(() => {
          movePlayer(player, x, newY);
        });
      }
      if (inJump == true) {
        newY = jump(now);
        console.log("2nd case");
        window.requestAnimationFrame(() => {
          movePlayer(player, x, newY);
        });
      }

      setPositionPlayer(player, x, newY);
      clearCanvas();
      player.drawPlayer();

      initialTimer = Date.now();
      // console.log(`plus de ${frequence}`);
      window.requestAnimationFrame(() => {
        movePlayer(player, x, newY);
      });
    } else if (timerEnterMove - initialTimer < frequence) {
      // console.log(`moins de ${frequence}`);
      window.requestAnimationFrame(() => {
        movePlayer(player, x, newY);
      });
    } else {
      console.error("erreur dans l'exe de movePlayer");
      throw new Error("erreur movePlayer : aucun cas valides");
    }
  } catch (error) {
    console.log(error);
  }
};

let jump = (now) => {
  console.log("jumping");
  let y;
  let timeInJump = now - timeStartJump;

  if (inJump == true) {
    y = (gravityFactor * (timeInJump * timeInJump)) / 10 ** 6 - heigthJump;
    // console.log("y :", y);
  } else {
    y = 0;
  }
  return y;
};

//##################
addEventListener("click", () => {
  timeStartJump = Date.now();
  inJump = true;
  console.log("click", timeStartJump, inJump);
});

movePlayer(player1, 1, 0);
