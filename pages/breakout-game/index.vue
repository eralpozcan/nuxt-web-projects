<template>
  <div class="breakout">
    <h1>Breakout!</h1>
    <button class="btn rules-btn" @click="toggleRules">Show Rules</button>
    <Sidebar :showContent="showContent" @toggleRules="toggleRules"/>
    <canvas ref="canvas" id="canvas" width="800" height="600"></canvas>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue';
import { useEventListener } from '@vueuse/core'
useSeoMeta({
  title: 'Breakout Game',
})

const showContent = ref(false);
const score = ref(0);
const canvas = ref();
const ctx = ref(null);
const ball = ref(null);
const paddle = ref(null);
const brickInfo = ref(null);
const bricks = ref([]);
const brickColumnCount = 5;
const brickRowCount = 9;
const delay = 500;
const toggleRules = () => {
  showContent.value = !showContent.value;
};

function initData() {
  ctx.value = canvas.value.getContext('2d');

  ball.value = {
    x: canvas.value.width / 2,
    y: canvas.value.height - 30,
    dx: 2,
    dy: -2,
    radius: 10,
    visible: true
  };

  paddle.value = {
    x: canvas.value.width / 2 - 40,
    y: canvas.value.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0,
    visible: true
  };

  brickInfo.value = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
  };

  createBricks();
}

function createBricks() {
  for (let i = 0; i < brickRowCount; i++) {
    bricks.value[i] = [];
    for (let j = 0; j < brickColumnCount; j++) {
      const x = i * (brickInfo.value.w + brickInfo.value.padding) + brickInfo.value.offsetX;
      const y = j * (brickInfo.value.h + brickInfo.value.padding) + brickInfo.value.offsetY;
      bricks.value[i][j] = { x, y, ...brickInfo.value };
    }
  }
}

function drawBall() {
  ctx.value.beginPath();
  ctx.value.arc(ball.value.x, ball.value.y, ball.value.radius, 0, Math.PI * 2);
  ctx.value.fillStyle = ball.value.visible ? '#0095dd' : 'transparent';
  ctx.value.fill();
  ctx.value.closePath();
}

function drawPaddle() {
  ctx.value.beginPath();
  ctx.value.rect(paddle.value.x, paddle.value.y, paddle.value.w, paddle.value.h);
  ctx.value.fillStyle = paddle.value.visible ? '#0095dd' : 'transparent';
  ctx.value.fill();
  ctx.value.closePath();
}

function drawBricks() {
  bricks.value.forEach((column) => {
    column.forEach((brick) => {
      ctx.value.beginPath();
      ctx.value.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.value.fillStyle = brick.visible ? '#0095DD' : 'transparent';
      ctx.value.fill();
      ctx.value.closePath();
    });
  });
}

function drawScore() {
  ctx.value.font = '20px Arial';
  ctx.value.fillText(`Score: ${score.value}`, canvas.value.width - 100, 30);
}

function movePaddle() {
  paddle.value.x += paddle.value.dx;
  if (paddle.value.x + paddle.value.w > canvas.value.width) {
    paddle.value.x = canvas.value.width - paddle.value.w;
  }
  if (paddle.value.x < 0) {
    paddle.value.x = 0;
  }
}

function moveBall() {
  ball.value.x += ball.value.dx;
  ball.value.y += ball.value.dy;

  // Wall collision (right/left)
  if (ball.value.x + ball.value.radius > canvas.value.width || ball.value.x - ball.value.radius < 0) {
    ball.value.dx *= -1;
  }

  // Wall collision (top/bottom)
  if (ball.value.y + ball.value.radius > canvas.value.height || ball.value.y - ball.value.radius < 0) {
    ball.value.dy *= -1;
  }

  // Paddle collision
  if (
    ball.value.x > paddle.value.x &&
    ball.value.x < paddle.value.x + paddle.value.w &&
    ball.value.y + ball.value.radius > paddle.value.y
  ) {
    ball.value.dy = -ball.value.dy;
  }

  // Brick collision
  bricks.value.forEach(column => {
    column.forEach(brick => {
      if (brick.visible) {
        if (
          ball.value.x + ball.value.radius > brick.x && // left brick side check
          ball.value.x - ball.value.radius < brick.x + brick.w && // right brick side check
          ball.value.y + ball.value.radius > brick.y && // top brick side check
          ball.value.y - ball.value.radius < brick.y + brick.h // bottom brick side check
        ) {
          ball.value.dy *= -1;
          brick.visible = false;
          increaseScore();
        }
      }
    });
  });

  // Hit bottom wall - Lose
  if (ball.value.y + ball.value.radius > canvas.value.height) {
    resetGame();
  }
}

function increaseScore() {
  score.value++;
  if (score.value % (brickRowCount * brickColumnCount) === 0) {
    ball.value.visible = false;
    paddle.value.visible = false;

    //After 0.5 sec restart the game
    setTimeout(() => {
      showAllBricks();
      score.value = 0;
      paddle.value.x = canvas.value.width / 2 - 40;
      paddle.value.y = canvas.value.height - 20;
      ball.value.x = canvas.value.width / 2;
      ball.value.y = canvas.value.height - 30;
      ball.value.visible = true;
      paddle.value.visible = true;
    }, delay);
  }
}

function showAllBricks() {
  bricks.value.forEach(column => {
    column.forEach(brick => (brick.visible = true));
  });
}

function resetGame() {
  showAllBricks();
  score.value = 0;
  paddle.value.x = canvas.value.width / 2 - 40;
  paddle.value.y = canvas.value.height - 20;
  ball.value.x = canvas.value.width / 2;
  ball.value.y = canvas.value.height - 30;
  ball.value.visible = true;
  paddle.value.visible = true;
}

function keyDown(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.value.dx = paddle.value.speed;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.value.dx = -paddle.value.speed;
  }
}

function keyUp(e) {
  if (
    e.key === 'Right' ||
    e.key === 'ArrowRight' ||
    e.key === 'Left' ||
    e.key === 'ArrowLeft'
  ) {
    paddle.value.dx = 0;
  }
}

function update() {
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
  movePaddle();
  moveBall();
  requestAnimationFrame(update);
}

onMounted(() => {
  initData();
  update();
});

useEventListener(document, 'keydown', (e) => {
  keyDown(e);
});

useEventListener(document, 'keyup', (e) => {
  keyUp(e);
});
</script>

<style scoped>

/* aka body element  */
.breakout {
  background-color: #0095dd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Arial, Helvetica, sans-serif;
  min-height: 100vh;
  margin: 0;
}

h1 {
  font-size: 45px;
  color: #fff;
}

canvas {
  background: #f0f0f0;
  display: block;
  border-radius: 5px;
}

.btn {
  cursor: pointer;
  border: 0;
  padding: 10px 20px;
  background: #000;
  color: #fff;
  border-radius: 5px;
}

.btn:focus {
  outline: 0;
}

.btn:hover {
  background: #222;
}

.btn:active {
  transform: scale(0.98);
}

.rules-btn {
  position: absolute;
  top: 30px;
  left: 30px;
}


</style>
