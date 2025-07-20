import * as func from '../../../../Code Library/functions.js';
import { turn } from "../nativeFunctions/functions.js";
import { createCustomProp } from "../../../../Code Library/functions.js";

const cssProps = createCustomProp({
  stEffectsDur: `.3s`
})

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

let removeAni;

export const turnCharacter = (event) => {

  const check = turnCheck(event.key)
  
  if (check) {
    
    const indicator = document.getElementById('indicator')
    indicator.classList.add('ani-pop-in')

    if (removeAni) {
      clearTimeout(removeAni)
    }
    removeAni = setTimeout(() => {
      indicator.classList.remove('ani-pop-in')
    }, func.extNumbers(cssProps.stEffectsDur)[0] * 100);
  
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