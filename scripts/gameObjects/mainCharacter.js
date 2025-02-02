import { BaseGameObject } from './basegameObject.js';
import { global } from '../modules/global.js';
import { gameLoop } from '../modules/main.js';

class MainCharacter extends BaseGameObject {
  name = 'MainCharacter';
  xVelocity = 0;
  yVelocity = 0;
  useGravityForces = true;

  constructor(x, y, width, height) {
    super(x, y, width, height);
    //this.loadImages(["./images/apple.png"]);
    this.health = 100;
    this.loadImagesFromSpritesheet('./images/sprites.png', 2, 3);
  }

  getBoxBounds = function () {
    let bounds = {
      left: this.x + 18,
      right: this.x + this.width - 22,
      top: this.y + 14,
      bottom: this.y + this.height - 3,
    };
    return bounds;
  };

  update = function () {
    // console.log(this.physicsData.fallVelocity);
    this.x += this.xVelocity * global.deltaTime;
    this.y += this.yVelocity * global.deltaTime;
    if (this.xVelocity == 0) {
      global.playerObject.switchCurrentSprites(
        this.animationData.firstSpriteIndex,
        this.animationData.firstSpriteIndex,
      );
    } else if (
      this.xVelocity > 0 &&
      global.playerObject.physicsData.isGrounded &&
      (global.playerObject.animationData.firstSpriteIndex != 2 ||
        global.playerObject.animationData.lastSpriteIndex != 3)
    ) {
      // console.log(this.animationData.firstSpriteIndex, this.animationData.lastSpriteIndex);
      // console.log(this.physicsData.isGrounded);
      this.switchCurrentSprites(2, 3);
    } else if (
      this.xVelocity < 0 &&
      global.playerObject.physicsData.isGrounded &&
      (global.playerObject.animationData.firstSpriteIndex != 4 ||
        global.playerObject.animationData.lastSpriteIndex != 5)
    ) {
      this.switchCurrentSprites(4, 5);
    } else if (!this.physicsData.isGrounded) {
      if (this.xVelocity > 0) {
        // console.log('test');
        this.switchCurrentSprites(3, 3);
      } else if (this.xVelocity < 0) {
        this.switchCurrentSprites(5, 5);
      }
    }
    const healthscore = document.getElementById('healthScore');
    healthscore.innerText = `Health: ${this.health}`;
  };

  takeDamage = function (amount) {
    this.health -= amount;
    console.log(`Player took ${amount} damage! Health: ${this.health}`);
    if (this.health <= 0) {
      console.log('Player has died!');
      this.onDeath();
    }
  };
  onDeath = function () {
    const gameOverScreen = document.getElementById('gameOver-screen');
    const gameOverButton = document.getElementById('gameOver-button');
    const startScreen = document.getElementById('start-screen');

    gameOverScreen.style.display = 'flex';
    gameOverButton.addEventListener('click', () => {
      gameOverScreen.style.display = 'none';
      startScreen.style.display = 'flex';
    });
    global.resetglobal();
    window.cancelAnimationFrame(gameLoop);
  };
}

export { MainCharacter };