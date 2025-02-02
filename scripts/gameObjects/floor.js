import { BaseGameObject } from './basegameObject.js';
import { global } from '../modules/global.js';

class Floor extends BaseGameObject {
  name = 'Floor';
  blockGravityForces = true;

  reactToCollision = function (collidingObject) {
    if (collidingObject.name == 'MainCharacter') {
      collidingObject.x = collidingObject.previousX;
      collidingObject.y = collidingObject.previousY;
    }
  };

  draw = function () {};

  constructor(x, y, width, height) {
    super(x, y, width, height);
  }
}

export { Floor };
