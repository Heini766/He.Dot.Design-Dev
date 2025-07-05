import * as func from '../../../Code Library/functions.js';
import * as ren from '../../../Code Library/renderSvg.js';
import { mainAspect } from "./properties.js";

const renCharacter = () => {

  const characterSize = 15;
  const base = ren.rect({class: 'character-base', width: `${characterSize}`, height: `${characterSize}`})

  function renFace() {

    const eye = ren.circle({ class: 'character-eye', r: characterSize*.125})
    const eyeR = eye.el.cloneNode();
    const eyeL = eye.el.cloneNode();

    eyeR.setAttribute('transform', `translate(${-eye.attr.r * 1.2} 0)`)
    eyeL.setAttribute('transform', `translate(${eye.attr.r * 1.2} 0)`)

    const mouth = ren.path({ class: 'character-mouth', d:  `M${-eye.attr.r} 0 ${eye.attr.r} 0`});
    mouth.el.setAttribute('transform', `translate(0 ${eye.attr.r * 1.7})`)

    const element = ren.group({ id: 'character-face', nodes: [eyeR, eyeL, mouth.el], transform: `translate(${characterSize/2} ${characterSize*.25})`});

    return element
  }
  const face = renFace()
  
  
  const characterOrigin = ren.circle({class: 'origin character-body',r: 2, fill: 'yellow'})
  
  const body = ren.group({id: 'character-body', nodes: [base.el, face.el], transform: `scale(1 1) translate(0 ${-characterSize})`})
  const character = ren.group({ id: 'character', nodes: [body.el], transform: `scale(1 1) translate(${-characterSize/2} 0)` })
  
  return character
  
}
const character = renCharacter();

const mainDs = ren.svg({ class: 'main-display', viewBox: `${-mainAspect.x/2} ${-mainAspect.y * .95} ${mainAspect.x} ${mainAspect.y}`,
nodes: [character]
})
document.body.appendChild(mainDs.el);

//func.turn(document.getElementById('character'), 1)