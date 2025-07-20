import * as ren from '../../../../Code Library/renderSvg.js';
import * as func from '../../../../Code Library/functions.js';

import { originMarker, spacing } from '../display/compsDisplay.js';

export const renCharacter = () => {

  const marker = originMarker.el.cloneNode();

  const renBase = () => {

    const base = ren.rect({class: 'character-base', width: spacing, height: spacing})

    const el = ren.group({id: 'characterBase', nodes: [base.el]})
    return el
    
  }
  const base = renBase().el;

  const character = ren.group({id: 'character', transform: `translate(${-spacing/2} ${-spacing/2})`, nodes: [base, marker]})
  return character;
  
}