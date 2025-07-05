import * as func from '../../../Code Library/functions.js';
import * as ren from '../../../Code Library/renderSvg.js';
import { mainAspect } from "./properties.js";

const renCharacter = () => {

  const characterSize = 15;
  const base = ren.rect({class: 'character-base', width: `${characterSize}`, height: `${characterSize}`})
  
  const characterOrigin = ren.circle({class: 'origin character-body',r: 2, fill: 'yellow'})
  
  const body = ren.group({id: 'character-body', nodes: [base.el], transform: `translate(${-characterSize/2} ${-characterSize})`})
  const character = ren.group({id: 'character', nodes: [body.el, characterOrigin.el], transform:`scale(1.5 1)`})
  
  return character
  
}
const character = renCharacter();

const mainDs = ren.svg({ class: 'main-display', viewBox: `${-mainAspect.x/2} ${-mainAspect.y/2} ${mainAspect.x} ${mainAspect.y}`,
nodes: [character]
})
document.body.appendChild(mainDs.el);

//func.turn(document.getElementById('character'), 1)