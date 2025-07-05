import * as comps from './data/components.js';

function checkDirection(event) {
  const keyMap = { a: 'Left', d: 'Right' };
  return keyMap[event.key];
}

window.addEventListener('keydown', (event) => {

  const direction = checkDirection(event);
  
  if (direction) {
    console.log(direction)
  }
})