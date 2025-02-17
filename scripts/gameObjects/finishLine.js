import { BlockObject } from './block.js';
import { global } from '../modules/global.js';

class FinishLine extends BlockObject {
  name = 'finishLine';
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.loadImages(['../../images/block.png']);
  }
  reactToCollision = function (collidingObject) {
    if (collidingObject.name == 'MainCharacter') {
      this.win();
    }
  };
  win = function () {
    const winScreen = document.getElementById('win-screen');
    const winButton = document.getElementById('win-button');
    const startScreen = document.getElementById('start-screen');

    winScreen.style.display = 'flex';
    winButton.addEventListener('click', () => {
      winScreen.style.display = 'none';
      startScreen.style.display = 'flex';
    });

    global.stopScrolling = true;

    global.resetglobal();
    window.cancelAnimationFrame(gameLoop);
  };
}

export { FinishLine };
