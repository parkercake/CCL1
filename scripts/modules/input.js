import { global } from './global.js';

function move(event) {
  console.log(event.key);
  switch (event.key) {
    case 'd':
      global.playerObject.xVelocity = 200;
      global.playerObject.yVelocity = 0;
      // console.log('velocity set');
      break;
    case 'a':
      global.playerObject.xVelocity = -200;
      global.playerObject.yVelocity = 0;
      break;
    case ' ':
      global.playerObject.setJumpForce(10);
      break;
  }
}

function stop(event) {
  switch (event.key) {
    case 'd':
      global.playerObject.xVelocity = 0;
      break;
    case 'a':
      global.playerObject.xVelocity = 0;
      break;
  }
}

document.addEventListener('keypress', move);

document.addEventListener('keyup', stop);
