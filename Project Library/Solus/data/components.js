import * as ren from '../../../Code Library/renderSvg.js';
import { mainAspect } from "./properties.js";

const renCharacter = () => {

  const characterSize = 15;
  const base = ren.rect({class: 'character-base', width: `${characterSize}`, height: `${characterSize}`})
  
  const body = ren.group({id: 'character-body', nodes: [base.el]})
  const character = ren.group({id: 'character', nodes: [body.el]})
  
  return character
  
}
const character = renCharacter();

const mainDs = ren.svg({ class: 'main-display', viewBox: `${-mainAspect.x/2} ${-mainAspect.y/2} ${mainAspect.x} ${mainAspect.y}`,
nodes: [character]
})
document.body.appendChild(mainDs.el);