import * as comps from './data/components.js';
import * as func from '../../Code Library/functions.js';
import { animateMove } from './data/animation.js';
import { characterSize, speed, costOnMove, energyBarLength } from './data/properties.js';

function checkDirection(event) {
  const keyMap = { a: 1, d: -1 };
  return keyMap[event.key];
}

function isEnergyInRange() {

  const energyFragments = document.querySelectorAll('.energy-element');
  if (!energyFragments[0]) {
    return
  }
  
  const character = document.getElementById('character');
  const getCharacterPos = func.extNumbers(character.getAttribute('transform'));
  const characterPos = {x: getCharacterPos[2], y: getCharacterPos[3]};
  
  const nodesInRange = [];
  energyFragments.forEach((el) => {

    const getEnergyPos = func.extNumbers(el.getAttribute('transform'));
    const energyPos = {x: getEnergyPos[0], y: getEnergyPos[1]}
    const distance = func.getDistance(characterPos, energyPos).euclideanDistance
    
    if (characterSize > distance) {
      nodesInRange.push(el)
    }
    
  })

  return nodesInRange[0] ? nodesInRange : false
  
}

let currentEnergy = .1 * Math.random() + .2;
function updateEnergy(offset) {

  currentEnergy = func.clamp(offset, 0, 1);

  const energyBar = document.getElementById('energyMeter');
  const getStartPos = func.extNumbers(energyBar.getAttribute('d'))
  const newLength = energyBarLength * currentEnergy;
  const newPos = {x: -energyBarLength/2 + newLength, y: getStartPos[1]}
  
  energyBar.setAttribute('d', `M${getStartPos[0]} ${getStartPos[1]} L${newPos.x} ${getStartPos[1]}`)
  energyBar.style.stroke = `hsl(${(1 - currentEnergy) * 7} ${(1 - currentEnergy) * 89} ${(currentEnergy) * 52 + 48})`
  
}

updateEnergy(currentEnergy);

let currentDirection = -1; // -1 = Rigth and 1 = Left
window.addEventListener('keydown', (event) => {
  
  const newDirection = checkDirection(event);

  if (newDirection) {

    const character = document.getElementById('character');
    const characterFace = document.getElementById('character-face');
    const distance = character.getBBox().width * speed;

    updateEnergy(currentEnergy - costOnMove)

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