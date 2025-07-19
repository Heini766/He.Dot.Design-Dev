import { turn } from "../nativeFunctions/functions.js";

function turnCheck(key) {
  const keys = ['a', 's', 'd', 'w'];
  let check;
  keys.forEach((el) => {
    if (el === key) {
      check = key;
    }
  })
  return check
}

export const turnCharacter = (event) => {

  const check = turnCheck(event.key)
  if (check) {
    
    let originOffset;
    
    if (check === 'a') {
      originOffset = {x: 0, y: .5}
    } else if (check === 's') {
      originOffset = {x: .5, y: 1}
    } else if (check === 'd') {
      originOffset = {x: 1, y: .5}
    } else if (check === 'w') {
      originOffset = {x: .5, y: 0}
    }

    turn(originOffset)
    
  }
  
}