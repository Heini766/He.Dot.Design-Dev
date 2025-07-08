import * as comps from './data/components.js';
import * as func from '../../Code Library/functions.js';
import { animateEnergyBar, animateMove } from './data/animation.js';
import { characterSize, speed, costOnMove, energyBarLength, currentEnergy } from './data/properties.js';

function checkDirection(event) {
  const keyMap = { a: 1, d: -1 };
  return keyMap[event.key];
}

export function isEnergyInRange() {

  const energyFragments = document.querySelectorAll('.energy-element');
  if (!energyFragments[0]) {
    return
  }
  
  const character = document.getElementById('character');
  const chDirection = func.extNumbers(character.firstChild.getAttribute('transform'))[2] < 0 ? -1 : 1;
  
  const getCharacterPos = func.extNumbers(character.getAttribute('transform'));
  const characterPos = {x: getCharacterPos[2] + characterSize/2*chDirection, y: getCharacterPos[3]};
  
  energyFragments.forEach((el) => {

    const getEnergyPos = func.extNumbers(el.getAttribute('transform'));
    const energyPos = {x: getEnergyPos[0], y: getEnergyPos[1]}
    const distance = func.getDistance(characterPos, energyPos).euclideanDistance
    
    if (characterSize > distance) {
      el.childNodes.forEach(el => {
        el.classList.add('in-range')
      })
    } else {
      el.childNodes.forEach(el => {
        el.classList.remove('in-range')
      })
    }
    
  })
  
}

export function updateEnergy(offset) {

  currentEnergy.value = func.clamp(offset, 0, 1);

  const energyBar = document.getElementById('energyMeter');
  const getStartPos = func.extNumbers(energyBar.getAttribute('d'))
  const newLength = energyBarLength * currentEnergy.value;
  const newPos = {x: -energyBarLength/2 + newLength, y: getStartPos[1]}

  animateEnergyBar(energyBar, .2, getStartPos, newPos);

  energyBar.style.stroke = `hsl(${(1 - currentEnergy.value) * 7} ${(1 - currentEnergy.value) * 89} ${(currentEnergy.value) * 52 + 48})`
  
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
    updateEnergy(currentEnergy.value - costOnMove)
  }
})