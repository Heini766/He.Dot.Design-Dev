import * as func from '../../../Code Library/functions.js';
import * as ren from '../../../Code Library/renderSvg.js';
import { mainAspect } from "./properties.js";

const renCharacter = () => {

  const characterSize = 15;
  const base = ren.rect({class: 'character-base', width: `${characterSize}`, height: `${characterSize}`})
  
  const characterOrigin = ren.circle({class: 'origin character-body',r: 2, fill: 'yellow'})
  
  const body = ren.group({id: 'character-body', nodes: [base.el], transform: `scale(1 1) translate(0 ${-characterSize})`})
  const character = ren.group({ id: 'character', nodes: [body.el], transform: `scale(1 1) translate(${-characterSize/2} 0)` })
  
  return character
  
}
const character = renCharacter();

const mainDs = ren.svg({ class: 'main-display', viewBox: `${-mainAspect.x/2} ${-mainAspect.y * .95} ${mainAspect.x} ${mainAspect.y}`,
nodes: [character]
})
document.body.appendChild(mainDs.el);

//func.turn(document.getElementById('character'), 1)