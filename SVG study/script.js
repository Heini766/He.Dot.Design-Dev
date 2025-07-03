import * as func from '../Code Library/functions.js';
import * as ren from '../Code Library/renderSvg.js';

const mainAspect = {x: 100, y: 100}

const renderEl = () => {

  const origin = ren.circle({ class: `element-origin`, fill: 'red', r: .75, });
  const body = ren.rect({ class: 'body', width: '10', height: '10'})

  const element = ren.group({ class: 'element', nodes: [body, origin] })

  return element
  
}

const myElement = renderEl();

const mainDs = ren.svg({
  class: 'main-display',
  viewBox: `${-mainAspect.x/2} ${-mainAspect.y/2} ${mainAspect.x} ${mainAspect.y}`,
  nodes: [myElement]
}) // child nodes are relative to the center
document.body.appendChild(mainDs.el)