import * as comps from './data/components.js';
import * as func from '../../Code Library/functions.js';
import { animateMove } from './data/animation.js';
import { characterSize, speed } from './data/properties.js';

function checkDirection(event) {
  const keyMap = { a: 1, d: -1 };
  return keyMap[event.key];
}

let currentDirection = -1; // -1 = Rigth and 1 = Left
window.addEventListener('keydown', (event) => {
  
  const newDirection = checkDirection(event);

  if (newDirection) {

    const character = document.getElementById('character');
    const characterFace = document.getElementById('character-face');
    const distance = character.getBBox().width * speed;

    if (newDirection !== currentDirection) {
      currentDirection = newDirection
      func.turn(character, currentDirection)
      const faceTrans = func.extNumbers(characterFace.getAttribute('transform'));
      const offset = newDirection < 0 ? .55 : .45;
      characterFace.setAttribute('transform', `translate(${characterSize * offset} ${faceTrans[1]})`)
    }
    
    animateMove(character, .2, distance, newDirection)
  }

  
})