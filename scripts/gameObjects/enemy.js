import { BaseGameObject } from './basegameObject.js';
import { global } from '../modules/global.js';

class Enemy extends BaseGameObject {
  name = 'Enemy';
  xVelocity = 0;
  yVelocity = 0;
  useGravityForces = true;

  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.attackRange = 5;
    this.attackCooldown = 500;
    this.lastAttackTime = 0;
    this.loadImagesFromSpritesheet('./images/enemysprite.png', 1, 3);
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
    const playerPosition = { x: global.playerObject.x, y: global.playerObject.y };
    const dx = playerPosition.x - this.x;
    const dy = playerPosition.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const speed = 1.5; 
  
    if (distance > 0) {
      this.x += (dx / distance) * speed;
      this.y += (dy / distance) * speed;
    }
  
    if (dx > 0) {
      this.switchCurrentSprites(1, 1);
    } else if (dx < 0) {
      this.switchCurrentSprites(2, 2);
    }
  
    if (distance <= this.attackRange) {
      this.attack(global.playerObject);
    }
  };

  attack = function (player) {
    const now = Date.now();
    if (now - this.lastAttackTime >= this.attackCooldown) {
      player.takeDamage(10);
      this.lastAttackTime = now;
    }
  };
}
export { Enemy };
