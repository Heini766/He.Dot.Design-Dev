import * as comps from './data/components.js';
import * as func from '../../Code Library/functions.js';

function checkDirection(event) {
  const keyMap = { a: 1, d: -1 };
  return keyMap[event.key];
}

let currentDirection = -1; // -1 = Rigth and 1 = Left
window.addEventListener('keydown', (event) => {

  const newDirection = checkDirection(event);

  if (newDirection !== currentDirection) {
    currentDirection = newDirection
    
    const character = document.getElementById('character');
    func.turn(character, currentDirection)
    
  }
  
})