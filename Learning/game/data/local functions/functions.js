import { moveOrigin } from "../../../../Code Library/functions.js";

const moveKeys = ['w', 'a', 's', 'd']
const actionKeys = ['Enter']
const direction = ['up', 'left', 'down', 'right']
const offsets = [{x: 0.5, y: 0}, {x: 0, y: 0.5}, {x: 0.5, y: 1}, {x: 1, y: 0.5}]

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

  direction.forEach((el, index) => {
    if (el === inputDirection) {
      moveOrigin(character, characterBase, offsets[index])
    }
  })
  
}

export function turn(event) {

  const direction = directionCheck(event);

  if (direction) {
    transOrigin(direction)
  }
  
}

export function moveCharacter(event) {

  const actionType = actionCheck(event);
  
  if (actionType) {
    console.log(actionType)
  }
  
}