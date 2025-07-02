import { characterSize } from "./components.js";
import * as func from '../library/functions.js';
import { mainAspect } from "./properties.js";

export function checkMove(event) {
  if (event.key === 'a' || event.key === 'd') {
    return event.key === 'a' ? 'Left' : 'Right';
  }
} // Returns the direction in which the character has to move

export function turnCharacter(direction, node, currentDirection) {
  
  if (currentDirection === direction) return;

  const character = node.parentNode;
  const { width: characterSize } = node.getBBox();
  const [posX, posY] = func.extNumbers(character.getAttribute('transform'));

  if (direction === 'Right') {
    node.setAttribute('x', '0');
    character.setAttribute('transform', `translate(${posX - characterSize} ${posY})`);
  } else if (direction === 'Left') {
    node.setAttribute('x', `-${func.extNumbers(node.getAttribute('width'))}`);
    character.setAttribute('transform', `translate(${posX + characterSize} ${posY})`);
  }
  
}

function triangularWave(t) {
  if (t <= 0.5) {
    return t * 2;          // Ramp up from 0 to 1
  } else {
    return 2 - t * 2;      // Ramp down from 1 to 0
  }
}

const duration = .2;
const speed = 2;
export function animateMove(direction, currentDirection) {
  
  const body = document.getElementById('characterBody');
  turnCharacter(direction, body, currentDirection);

  const character = document.getElementById('character');
  const characterPos = func.extNumbers(character.getAttribute('transform'));
  let posX = characterPos[0];
  let posY = characterPos[1];
  
  let start, id;

  function animate() {

    if (start === undefined) {
      start = performance.now();
    }
    const elapsed = (performance.now() - start)/1000;
    const t = Math.min(elapsed/duration, 1);
    const tWave = triangularWave(t);

    const offset = direction === 'Right' ? characterSize * t * speed : -characterSize * t * speed;

    const stretchFac = tWave * speed*.1 + 1;
    body.setAttribute('transform', `scale(${stretchFac} ${1 / stretchFac})`)
    character.setAttribute('transform', `translate(${func.clamp(posX + offset, -mainAspect.x/2 + characterSize, mainAspect.x/2 - characterSize)} ${posY})`)

    if (t < 1) {
      id = requestAnimationFrame(animate)
    }
    
  }

  id = requestAnimationFrame(animate)
  
}