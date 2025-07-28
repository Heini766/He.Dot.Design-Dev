import { moveOrigin } from "../../../../Code Library/functions.js";
import { animateMove } from "./animation.js";

const moveKeys = ['w', 'a', 's', 'd']
const actionKeys = [' ']
export const direction = ['up', 'left', 'down', 'right']
const offsets = [{x: 0.5, y: 1}, {x: 1, y: 0.5}, {x: 0.5, y: 0}, {x: 0, y: 0.5}]

function directionCheck(event) {

  let key;
  moveKeys.forEach((el, index) => {
    if (el === event.key) {
      key = direction[index];
    }
  })

  return key;
  
}

function actionCheck(event) {

  let action;
  actionKeys.forEach((el) => {
    if (el === event.key) {
      action = el;
    }
  })

  return action;
  
}

function transOrigin(inputDirection) {

  const character = document.getElementById('character');
  const characterBase = document.getElementById('characterBase');

  character.setAttribute('direction', `${inputDirection}`)

  direction.forEach((el, index) => {
    if (el === inputDirection) {
      moveOrigin(character, characterBase, offsets[index])
    }
  })
  
}

export function turn(event) {

  const newDirection = directionCheck(event);
  const pointer = document.getElementById('pointer');

  const degrees = [180, 90, 360, 270]

  direction.forEach((el, index) => {
    if (el === newDirection) {
      pointer.setAttribute('transform', `rotate(${degrees[index]})`)
    }
  })

  if (newDirection) {
    transOrigin(newDirection)
  }
  
}

export function moveCharacter(event) {

  const actionType = actionCheck(event);
  const character = document.getElementById('character');
  const curDirection = character.getAttribute('direction');
  
  if (actionType && curDirection) {
    animateMove(.15, curDirection, character)
  }
  
}