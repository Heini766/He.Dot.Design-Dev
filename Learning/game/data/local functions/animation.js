import { direction, moveCharacter, turn } from "./functions.js";
import { dsAspect, spacing } from "../display/compsDisplay.js";
import { extNumbers, triangularWave } from "../../../../Code Library/functions.js";
import * as timing from "../../../../Code Library/timingFunctions.js";
import { clamp } from "../../../../Code Library/functions.js";

function putDirection(input) {

  const calcs = [{x: 0, y: -1}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 1, y: 0}]
  let matrix, transAxes;

  direction.forEach((el, index) => {

    if (el === input) {
      matrix = calcs[index]

      if (index === 0 || index === 2) {
        transAxes = 'y'
      } else {
        transAxes = 'x'
      }
      
    }
    
  })

  return [matrix, transAxes]
  
}

function calcBoudary(inpDirection) {

  const boudarys = [
    {xMax: dsAspect.x/2 - spacing/2, xMin: -spacing*2 - spacing/2, yMax: dsAspect.y/2, yMin: -spacing*2}, // up facing calculations #
    {xMax: dsAspect.x/2, xMin: -spacing*3 + spacing, yMax: dsAspect.y/2 - spacing/2, yMin: -spacing*3 + spacing/2}, // left facing calculations #
    {xMax: dsAspect.x/2 - spacing/2, xMin: -spacing*2 - spacing/2, yMax: spacing*3, yMin: -dsAspect.y/2 + spacing}, // down facing calculations #
    {xMax: dsAspect.x/2 - spacing, xMin: -spacing*3, yMax: dsAspect.y/2 - spacing/2, yMin: -spacing*3 + spacing/2}, // right facing calculations #
  ]

  let boudary;
  direction.forEach((el, index) => {

    if (el === inpDirection) {
      boudary = boudarys[index]
    }
    
  })
  return boudary
  
}

export function animateMove(duration, direction, character) {

  let start, id;
  let stretchX, stretchY
  window.removeEventListener('keydown', moveCharacter);
  window.removeEventListener('keydown', turn);

  const [chX, chY] = extNumbers(character.getAttribute('transform'));
  const [drMatrix, axes] = putDirection(direction);

  const boudaries = calcBoudary(direction);

  const animate = () => {

    if (start === undefined) {
      start = performance.now();
    }
    const elapsed = (performance.now() - start)/1000;
    const t = timing.easeInOutQuad(Math.min(elapsed/duration, 1));

    const offsetX = t * spacing * drMatrix.x;
    const offsetY = t * spacing * drMatrix.y;
    character.setAttribute('transform', `translate(${clamp(chX + offsetX, boudaries.xMin, boudaries.xMax)} ${clamp(chY + offsetY, boudaries.yMin, boudaries.yMax)})`)

    if (axes === 'x') {
      stretchX = 1 + triangularWave(t) * .15;
      stretchY = 1/stretchX;
    } else {
      stretchY = 1 + triangularWave(t) * .15;
      stretchX = 1/stretchY
    }

    character.firstChild.style.scale = `${stretchX} ${stretchY}`

    if (t < 1) {
      id = requestAnimationFrame(animate)
    } else {
      window.addEventListener('keydown', turn);
      window.addEventListener('keydown', moveCharacter)
    }
    
  }

  id = requestAnimationFrame(animate);
  
}

export function animatePointer(duration, deg) {

  let start, id;

  const curDeg = extNumbers(document.getElementById('pointer').getAttribute('transform'))[0];

  const animate = () => {

    if (start === undefined) {
      start = performance.now();
    }
    const elpased = (performance.now() - start)/1000;
    const t = Math.min(elpased/duration, 1);

    if (t < 1) {
      id = requestAnimationFrame(animate)
    }
  }

  id = requestAnimationFrame(animate)
  
}