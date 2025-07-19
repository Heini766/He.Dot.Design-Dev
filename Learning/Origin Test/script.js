import * as ren from '../../Code Library/renderSvg.js';
import * as func from '../../Code Library/functions.js';

const mainAspect = {x: 400, y: 400}
const mainDs = ren.svg({class: 'main-display', id: 'mainDisplay', viewBox: `${-mainAspect.x/2} ${-mainAspect.y/2} ${mainAspect.x} ${mainAspect.y}`})

const size = 20;

const origin = ren.circle({class: 'origin', r: 2})

const renObject = () => {

  const renBase = () => {

    const base = ren.rect({class: 'object', width: size, height: size})
    const el = ren.group({id: 'objectBase', nodes: [base.el]})
    return el;
    
  }
  
  const el = ren.group({id: 'object', nodes: [renBase().el, origin.el.cloneNode()], transform: `translate(25 10)`})
  return el
  
}

mainDs.el.appendChild(renObject().el)

document.body.appendChild(mainDs.el)

// RENDERED

const object = document.getElementById('object');

func.moveOrigin(object.firstChild, {x: 0, y: 0})
func.moveOrigin(object.firstChild, {x: 0, y: 0})