import { BaseGameObject } from './basegameObject.js';
import { global } from '../modules/global.js';

const memoryPool = [
  'A memory of running through a sunflower field.',
  'The joy of a rainy day spent reading by the fire.',
  'Laughter during a picnic under cherry blossoms.',
  'The warmth of holding hands on a snowy evening.',
  'The excitement of hearing waves crash at the beach.',
  'One more memory.',
];

class Cloud extends BaseGameObject {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.memoryText = this.getUniqueMemory();
    this.isCollected = false;
    this.loadImages(['./images/cloud.png']);
  }

  getUniqueMemory = function () {
    if (memoryPool.length === 0) {
      console.warn('No more memories available!');
      return 'No more memories to collect.';
    }
    const randomIndex = Math.floor(Math.random() * memoryPool.length);
    return memoryPool.splice(randomIndex, 1)[0];
  };

  collect = function () {
    if (!this.isCollected) {
      this.isCollected = true;
      global.cloudsCollected++;

      const cloudsCollectedUI = document.getElementById('cloudsCollected');
      cloudsCollectedUI.innerText = `Clouds: ${global.cloudsCollected}/${global.totalClouds}`;

      console.log(`Clouds collected: ${global.cloudsCollected}/${global.totalClouds}`);
    }
  };

  reactToCollision = function (collidingObject) {
    if (collidingObject.name == 'MainCharacter') {
      this.active = false;
      this.displayMemory(this.memoryText);
      this.collect();
    }
  };

  displayMemory = function (text) {
    const memoryDiv = document.createElement('div');
    memoryDiv.innerText = text;

    memoryDiv.style.position = 'absolute';
    memoryDiv.style.top = '10px';
    memoryDiv.style.right = '10px';
    memoryDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    memoryDiv.style.color = 'white';
    memoryDiv.style.padding = '5px 10px';
    memoryDiv.style.borderRadius = '5px';
    memoryDiv.style.fontSize = '14px';
    memoryDiv.style.zIndex = '1000';
    memoryDiv.style.display = 'flex';
    memoryDiv.style.alignItems = 'center';
    memoryDiv.style.gap = '10px';

    const closeButton = document.createElement('button');
    closeButton.innerText = '×';
    closeButton.style.backgroundColor = 'transparent';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '16px';
    closeButton.style.cursor = 'pointer';

    closeButton.onclick = () => memoryDiv.remove();

    memoryDiv.appendChild(closeButton);
    document.body.appendChild(memoryDiv);
    const timeout = setTimeout(() => {
      memoryDiv.remove();
    }, 4000);

    closeButton.onclick = () => {
      clearTimeout(timeout);
      memoryDiv.remove();
    };
  };
}

export { Cloud };
export { memoryPool };
