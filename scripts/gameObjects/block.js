import { BaseGameObject } from './basegameObject.js';

class BlockObject extends BaseGameObject {
  blockGravityForces = true;

  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.loadImages(['./images/block.png']);
  }

  reactToCollision = function (collidingObject) {
    if (collidingObject.name == 'MainCharacter') {
      collidingObject.x = collidingObject.previousX;
    }
  };
}

export { BlockObject };
