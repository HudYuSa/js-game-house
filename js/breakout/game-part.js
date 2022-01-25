const breakoutCanvas = document.getElementById("breakout-canvas");
const ctx = breakoutCanvas.getContext("2d");
const bCanvasW = breakoutCanvas.width;
const bCanvasH = breakoutCanvas.height;

const startBtn = document.querySelector("#b-start-btn");
const bLeftBtn = document.querySelector("#b-left");
const bRightBtn = document.querySelector("#b-right");

let width, x, y, dy, dx, interval;
let pWidth, pHeight, px, py;
pWidth = 50;
pHeight = 7;
let pSpace = 22;
py = bCanvasH - pSpace;
px = bCanvasW / 2 - pWidth / 2 + 20;

function setVariables(inWidth, xP, yP, setDx, setDy) {
  width = inWidth;
  x = xP;
  y = yP;
  dx = setDx;
  dy = setDy;
}
let initX = 1;
let initY = -1.3;
// pSpace between red line and the paddle
setVariables(4, bCanvasW / 2, bCanvasH - pSpace - 10, initX, initY);
drawCircle(x, y, width);
drawPaddle(px, py, pWidth, pHeight);
paddleNav();
// startGame(dx, dy);

// paddle navigation
let rPressed = false;
let lPressed = false;
function paddleNav() {
  // keydown event function
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);

  function handleKeyDown(e) {
    if (e.key === "ArrowRight") {
      rPressed = true;
    } else if (e.key === "ArrowLeft") {
      lPressed = true;
    }
  }
  function handleKeyUp(e) {
    if (e.key === "ArrowRight") {
      rPressed = false;
    } else if (e.key === "ArrowLeft") {
      lPressed = false;
    }
  }

  bLeftBtn.addEventListener("mousedown", () => {
    lPressed = true;
  });
  bRightBtn.addEventListener("mousedown", () => {
    rPressed = true;
  });

  bLeftBtn.addEventListener("mouseup", () => {
    lPressed = false;
  });
  bRightBtn.addEventListener("mouseup", () => {
    rPressed = false;
  });

  bLeftBtn.addEventListener("touchstart", () => {
    lPressed = true;
  });
  bRightBtn.addEventListener("touchstart", () => {
    rPressed = true;
  });

  bLeftBtn.addEventListener("touchend", () => {
    lPressed = false;
  });
  bRightBtn.addEventListener("touchend", () => {
    rPressed = false;
  });
}

function shadowAndColor(color, blur) {
  ctx.shadowBlur = blur;
  ctx.shadowColor = color;
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
}

function drawPaddle(px, py, pWidth, pHeight) {
  ctx.beginPath();
  ctx.rect(px, py, pWidth, pHeight);
  shadowAndColor("#ffbf1b", 1);
  ctx.fill();
  ctx.closePath();
}

function drawCircle(x, y, width) {
  ctx.beginPath();
  ctx.arc(x, y, width, 0, 2 * Math.PI);
  shadowAndColor("#59dc1d", 10);
  ctx.fill();
  ctx.closePath();
}

let brickW = 32.5;
let brickH = 10;
let brickOffsetX = 15;
let brickOffsetY = 20;
// fx = first x cordinat fy = first y cordinat
let fX = 15;
let fY = -975;
// let fY = 5;
let bricks = [];
let brickRow = 50;
let brickColumn = 6;

createBrickArray();
drawBricks(fX, fY, brickW, brickH, brickOffsetX, brickOffsetY);

function createBrickArray() {
  for (let j = 0; j < brickRow; j++) {
    bricks[j] = [];
    for (let i = 0; i < brickColumn; ++i) {
      bricks[j].push({
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        isVisible: true,
      });
    }
  }
}
function drawBricks(fX, fY, w, h, xP, yP) {
  for (let j = 0; j < brickRow; j++) {
    for (let i = 0; i < brickColumn; ++i) {
      if (bricks[j][i].isVisible) {
        ctx.beginPath();
        let xCoordinate = fX + i * (w + xP);
        let yCoordinate = fY + j * yP;
        ctx.rect(xCoordinate, yCoordinate, w, h);
        // bricks[j].push({
        //   x: xCoordinate,
        //   y: yCoordinate,
        //   w = w,
        //   h = h,
        // });
        bricks[j][i].x = xCoordinate;
        bricks[j][i].y = yCoordinate;
        bricks[j][i].w = w;
        bricks[j][i].h = h;

        // console.log(fY * j + j * yP);

        shadowAndColor("#ffbf1b", 1);
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

const scoreEl = document.querySelector(".breakout-score");
let interval4;
let score = 0;
let bestScore = 0;

let bestScoreData = JSON.parse(localStorage.getItem("bestScore"));
if (bestScoreData) {
  bestScore = bestScoreData;
}
scoreEl.textContent = bestScore;
function scoreInc() {
  interval4 = setInterval(() => {
    score++;
    scoreEl.textContent = score;
    // if (score > bestScore) bestScore = score;
    console.log(bestScore);
    console.log(score);
  }, 1000);
}

function xCollision() {
  // make the ball bounce
  x + dx >= bCanvasW - 5 || x + dx <= 5 ? (dx = -dx) : dx;
  return dx;
}
function yCollision() {
  // make the ball bounce
  y + dy >= bCanvasH - 2 || y + dy <= 5 ? (dy = -dy) : dy;
  return dy;
}
function paddleCollision() {
  // dari titik mulai paddle sampe titik akhir dan sesuai tinngi paddle
  if (
    y + dy >= bCanvasH - pSpace &&
    y + dy <= bCanvasH - pSpace + -initY + 0.2
  ) {
    if (x + dx >= px && x + dx <= px + pWidth) {
      if (x + dx >= px && x + dx <= px + (2 / 9) * pWidth) {
        dx -= 1;
      } else if (x + dx >= px + (7 / 9) * pWidth && x + dx <= px + pWidth) {
        dx += 1;
      } else if (
        x + dx >= px + (2 / 9) * pWidth &&
        x + dx <= px + (3 / 9) * pWidth
      ) {
        dx -= 0.5;
      } else if (
        x + dx >= px + (6 / 9) * pWidth &&
        x + dx <= px + (7 / 9) * pWidth
      ) {
        dx += 0.5;
      }

      return (dy = -dy);
    }
  }
  if (x + dx >= px && x + dx <= px + pWidth) {
    if (y + dy >= py && y + dy <= py + pHeight) {
      return (dx = -dx);
    }
  }

  // if (
  //   y + dy >= bCanvasH - pSpace &&
  //   y + dy <= bCanvasH - pSpace + -initY + 0.2
  // ) {
  // }
}

function ballCollision() {
  for (let j = 0; j < bricks.length; j++) {
    for (let i = 0; i < bricks[j].length; i++) {
      // console.log(bricks[b][i]);
      const brick = bricks[j][i];
      // console.log(brick);
      if (
        (y + dy >= brick.y && y + dy <= brick.y + 2) ||
        (y + dy >= brick.y + brick.h - 2 && y + dy <= brick.y + brick.h)
      ) {
        if (x + dx >= brick.x && x + dx <= brick.x + brick.w) {
          brick.isVisible = false;
          brick.x = 0;
          brick.y = 0;
          dy = -dy;
          // console.log(bricks[j][i]);
          console.log(bricks[j]);
        }
      }

      if (
        (x + dx >= brick.x && x + dx <= brick.x + 2) ||
        (x + dx >= brick.x + brick.w - 2 && x + dx <= brick.x + brick.w)
      ) {
        if (y + dy >= brick.y && y + dy <= brick.y + brick.h) {
          brick.isVisible = false;
          brick.x = 0;
          brick.y = 0;
          dx = -dx;
          console.log(bricks);
        }
      }
    }
  }
  // bricks.forEach((row, idx) => {
  //   row.forEach((brick) => {
  //     console.log(brick);
  //   });
  // });
}

let pS = 2;
let gameS = 10;
let interval2;
let interval3;

function speedUp() {
  if (!interval2) {
    interval2 = setInterval(() => {
      clearInterval(interval);
      pS += 0.001;
      if (gameS > 1) {
        gameS -= 0.02;
      }

      interval = setInterval(transitionAll, gameS);
    }, 1000);
  }
}

function startGame() {
  if (!interval) {
    interval = setInterval(transitionAll, gameS);
  }
}
function transitionAll() {
  // move the paddle
  if (rPressed) {
    if (px + pWidth + pS <= bCanvasW) px += pS;
  }
  if (lPressed) {
    if (px + pS >= 0) px -= pS;
  }

  // make the ball bounce
  dx = xCollision();
  dy = yCollision();
  paddleCollision();
  ballCollision();

  // game over
  checkGameOver();
  // animate
  x += dx;
  y += dy;
  // console.log(time);

  ctx.clearRect(0, 0, bCanvasW, bCanvasH);

  drawCircle(x, y, width);
  drawPaddle(px, py, pWidth, pHeight);
  drawBricks(fX, fY, brickW, brickH, brickOffsetX, brickOffsetY);
}

function checkGameOver() {
  if (y >= bCanvasH - 4) {
    if (score >= bestScore) {
      alert("New Best Score!!");
    } else {
      alert("you are " + (bestScore - score) + " point from the best score");
    }
    setVariables(5, bCanvasW / 2, bCanvasH - pSpace - 10, initX, initY);
    px = bCanvasW / 2 - pWidth / 2;
    clearInterval(interval2);
    clearInterval(interval);
    clearInterval(interval3);
    clearInterval(interval4);
    interval = null;
    interval2 = null;
    interval3 = null;
    interval4 = null;
    // fY = 5;
    if (score > bestScore) {
      localStorage.setItem("bestScore", score);
    }
    bestScore = localStorage.getItem("bestScore");
    console.log(bestScore);
    scoreEl.textContent = bestScore;
  }
}

function bricksDown() {
  if (!interval3) {
    interval3 = setInterval(() => {
      fY += 22;
    }, 6000);
  }
}

startBtn.addEventListener("click", start);
function start() {
  lPressed = false;
  rPressed = false;
  pS = 2;
  gameS = 10;
  score = 0;
  scoreEl.textContent = score;

  brickW = 32.5;
  brickH = 10;
  brickOffsetX = 15;
  brickOffsetY = 20;
  // fx = first x cordinat fy = first y cordinat
  fX = 15;
  fY = -975;
  // let fY = 5;
  bricks = [];
  brickRow = 50;
  brickColumn = 6;

  createBrickArray();
  drawBricks(fX, fY, brickW, brickH, brickOffsetX, brickOffsetY);
  bricksDown();
  speedUp();
  startGame();
  scoreInc();
}
