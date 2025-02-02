import { global } from './global.js';
import { MainCharacter } from '../gameObjects/mainCharacter.js';
import { Enemy } from '../gameObjects/enemy.js';
import { MoveTrigger } from '../gameObjects/moveTrigger.js';
import { BlockObject } from '../gameObjects/blockObject.js';
import { Floor } from '../gameObjects/floor.js';
import { Cloud } from '../gameObjects/cloud.js';
import { map } from '../gameObjects/map.js';
import { FinishLine } from '../gameObjects/finishLine.js';

function gameLoop(totalRunningTime) {
  global.deltaTime = totalRunningTime - global.prevTotalRunningTime;
  global.deltaTime /= 1000;
  global.prevTotalRunningTime = totalRunningTime;
  global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);

  for (var i = 0; i < global.allGameObjects.length; i++) {
    if (global.allGameObjects[i].active == true) {
      global.allGameObjects[i].storePositionOfPreviousFrame();
      global.allGameObjects[i].update();
      global.checkCollisionWithAnyOther(global.allGameObjects[i]);
      global.allGameObjects[i].applyGravity();
      global.allGameObjects[i].draw();
    }
  }
  requestAnimationFrame(gameLoop);
}

window.addEventListener('load', () => {
  const startScreen = document.getElementById('start-screen');
  const startButton = document.getElementById('start-button');
  const gameOverScreen = document.getElementById('gameOver-screen');
  const winScreen = document.getElementById('win-screen');
  gameOverScreen.style.display = 'none';
  winScreen.style.display = 'none';
  startButton.addEventListener('click', () => {
    startScreen.style.display = 'none'; 
    startGame();
  });
});

function startGame() {
  const healthScoreUI = document.getElementById('healthScore');
  const cloudsCollectedUI = document.getElementById('cloudsCollected');
  healthScoreUI.innerText = '';
  cloudsCollectedUI.innerText = '';

  new Floor(0, global.canvas.height - 150, 9000, 42);
  new Floor(0, 0, 9000, 2);
  for (let i = 0; i < map.length; i++) {
    const innerarray = map[i];
    for (let j = 0; j < innerarray.length; j++) {
      const element = innerarray[j];
      if (element == 1) {
        new BlockObject(j * 100, i * 50, 100, 50);
      }
      if (element == 2) {
        new Cloud(j * 100, i * 50, 44, 32);
        global.totalClouds++;
      }
      if (element == 3) {
        new Enemy(j * 100, i * 50, 80, 80);
      }
      if (element == 4) {
        new FinishLine(j * 100, i * 50, 100, 50);
      }
    }
    // console.log('pop' + memories);
  }
  global.playerObject = new MainCharacter(300, 700, 80, 80);
  global.leftMoveTrigger = new MoveTrigger(100, -100, 20, 900, global.canvas.height + 100);
  global.rightMoveTrigger = new MoveTrigger(800, -100, 20, global.canvas.height + 100);

  global.prevTotalRunningTime = performance.now();
  requestAnimationFrame(gameLoop);
}

export { gameLoop };
