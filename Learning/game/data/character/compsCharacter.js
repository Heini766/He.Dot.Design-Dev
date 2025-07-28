import * as ren from '../../../../Code Library/renderSvg.js';
import * as func from '../../../../Code Library/functions.js';

import { originMarker, spacing } from '../display/compsDisplay.js';
import { moveCharacter, turn } from '../local functions/functions.js';

export const renCharacter = (size) => {

  const marker = originMarker.el.cloneNode();
  marker.classList.add('character')

  const renBase = () => {

    const base = ren.rect({class: 'character-base', width: size, height: size})

    const renArrow = () => {

      const pointerSize = spacing*.25
      const pointer = ren.rect({class: 'pointer', width: pointerSize, height: pointerSize}).el
      pointer.setAttribute('transform', `translate(${-pointerSize/2} ${spacing * .15})`)
      
      const el = ren.group({id: 'pointer', nodes: [pointer], transform: `rotate(0)`}).el;
      el.style.translate = `${spacing/2}px ${spacing/2}px`
      return el;
      
    }

    const el = ren.group({id: 'characterBase', nodes: [base.el, renArrow()]})
    return el
    
  }
  const base = renBase().el;

  window.addEventListener('keydown', turn);
  window.addEventListener('keydown', moveCharacter)

  const character = ren.group({id: 'character', nodes: [base]})
  return character;
  
}