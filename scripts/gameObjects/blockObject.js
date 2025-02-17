import { BaseGameObject } from './basegameObject.js';

class BlockObject extends BaseGameObject {
  blockGravityForces = true;

  reactToCollision = function (collidingObject) {
    if (collidingObject.name == 'MainCharacter') {
      collidingObject.x = collidingObject.previousX;
      }
  };
  // draw = function () {
  //   global.ctx.fillStyle = '#000000';
  //   global.ctx.fillRect(this.x, this.y, this.width, this.height);
  // };

  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.loadImages(['../../images/block.png']);
  }
}

export { BlockObject };
