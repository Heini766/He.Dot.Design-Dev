import { direction, moveCharacter } from "./functions.js";
import { spacing } from "../display/compsDisplay.js";
import { extNumbers } from "../../../../Code Library/functions.js";
import * as timing from "../../../../Code Library/timingFunctions.js";

function putDirection(input) {

  const calcs = [{x: 0, y: -1}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 1, y: 0}]
  let matrix;

  direction.forEach((el, index) => {

    if (el === input) {
      matrix = calcs[index]
    }
    
  })

  return matrix
  
}

export function animateMove(duration, direction, character) {

  let start, id;
  window.removeEventListener('keydown', moveCharacter);

  const [chX, chY] = extNumbers(character.getAttribute('transform'));
  const drMatrix = putDirection(direction);

  const animate = () => {

    if (start === undefined) {
      start = performance.now();
    }
    const elapsed = (performance.now() - start)/1000;
    const t = timing.easeInOutQuad(Math.min(elapsed/duration, 1));

    const offsetX = t * spacing * drMatrix.x;
    const offsetY = t * spacing * drMatrix.y;
    character.setAttribute('transform', `translate(${chX + offsetX} ${chY + offsetY})`)

    if (t < 1) {
      id = requestAnimationFrame(animate)
    } else {
      window.addEventListener('keydown', moveCharacter)
    }
    
  }

  id = requestAnimationFrame(animate);
  
}