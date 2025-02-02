import { memoryPool } from '../gameObjects/cloud.js';

const global = {};

global.canvas = document.querySelector('#canvas');
global.ctx = canvas.getContext('2d');
global.prevTotalRunningTime = 0;
global.deltaTime = 0;
global.allGameObjects = [];
global.playerObject = {};
global.cloudsCollected = 0;
global.totalClouds = 0;
global.backgroundShift = 0;
global.backgroundMaxShift = -5000;
global.gravityForce = 9.8;
global.pixelToMeter = 100;
global.leftMoveTrigger;
global.rightMoveTrigger;
global.gameStarted = false;
global.stopScrolling = false;

global.getCanvasBounds = function () {
  let bounds = {
    left: 0,
    right: this.canvas.width,
    top: 0,
    bottom: this.canvas.height,
  };
  return bounds;
};

global.checkCollisionWithAnyOther = function (givenObject) {
  for (let i = givenObject.index; i < global.allGameObjects.length; i++) {
    let otherObject = global.allGameObjects[i];
    if (otherObject.active == true) {
      let collisionHappened = this.detectBoxCollision(givenObject, otherObject);
      if (collisionHappened) {
        givenObject.reactToCollision(otherObject);
        otherObject.reactToCollision(givenObject);
      }
    }
  }
};

global.detectBoxCollision = function (gameObject1, gameObject2) {
  let box1 = gameObject1.getBoxBounds();
  let box2 = gameObject2.getBoxBounds();
  if (gameObject1 != gameObject2) {
    if (
      box1.top <= box2.bottom &&
      box1.left <= box2.right &&
      box1.bottom >= box2.top &&
      box1.right >= box2.left
    ) {
      return true;
    }
  }
  return false;
};

global.resetglobal = function () {
  global.prevTotalRunningTime = 0;
  global.deltaTime = 0;
  global.allGameObjects = [];
  global.playerObject = {};
  global.backgroundShift = 0;
  global.backgroundMaxShift = -5000;
  global.gravityForce = 9.8;
  global.pixelToMeter = 100;
  global.leftMoveTrigger;
  global.rightMoveTrigger;
  global.gameStarted = false;
  global.stopScrolling = false;
  global.cloudsCollected = 0;
  global.totalClouds = 0;

  memoryPool.length = 0;
  memoryPool.push(
    'A memory of running through a sunflower field.',
    'The joy of a rainy day spent reading by the fire.',
    'Laughter during a picnic under cherry blossoms.',
    'The warmth of holding hands on a snowy evening.',
    'The excitement of hearing waves crash at the beach.',
  );
};

export { global };
