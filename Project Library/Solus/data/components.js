import * as func from '../../../Code Library/functions.js';
import * as ren from '../../../Code Library/renderSvg.js';
import { mainAspect, characterSize, energyBarLength, currentEnergy } from "./properties.js";
import { updateEnergy } from '../script.js';

const renCharacter = () => {
  
  const base = ren.rect({class: 'character-base', width: `${characterSize}`, height: `${characterSize}`})

  function renFace() {

    const eye = ren.circle({ class: 'character-eye', r: characterSize*.1})
    const eyeR = eye.el.cloneNode();
    const eyeL = eye.el.cloneNode();

    eyeR.setAttribute('transform', `translate(${-eye.attr.r * 1.4} 0)`)
    eyeL.setAttribute('transform', `translate(${eye.attr.r * 1.4} 0)`)

    const mouth = ren.path({ class: 'character-mouth', d:  `M${-eye.attr.r} 0 ${eye.attr.r} 0`});
    mouth.el.setAttribute('transform', `translate(0 ${eye.attr.r * 2})`)

    const element = ren.group({ id: 'character-face', nodes: [eyeR, eyeL, mouth.el], transform: `translate(${characterSize*.55} ${characterSize*.25})`});

    return element
  }
  const face = renFace()

  function renHair() {

    const lenght = characterSize * .3;
    const hairTiltRight = func.getRadPoints(.875, lenght)
    const hairTiltLeft = func.getRadPoints(.625, lenght)

    const hair = ren.path({ class: 'character-hair' })
    const [hairMiddle, hairRight, hairLeft] = Array(3).fill().map(() => hair.el.cloneNode()); // Creates three clones of hair
    hairMiddle.setAttribute('d', `M0 0 0 ${-lenght}`)
    hairRight.setAttribute('d', `M0 0 ${hairTiltRight.x} ${hairTiltRight.y}`)
    hairLeft.setAttribute('d', `M0 0 ${hairTiltLeft.x} ${hairTiltLeft.y}`)

    const element = ren.group({ id: 'characterHair', nodes: [hairLeft, hairRight, hairMiddle], transform: `translate(${characterSize/2} 0)`})
    return element;
    
  }
  const hair = renHair()
  
  const characterOrigin = ren.circle({class: 'origin character-body',r: 2, fill: 'yellow'})
  
  const body = ren.group({id: 'character-body', nodes: [hair.el, base.el, face.el], transform: `scale(1 1) translate(0 ${-characterSize})`})
  const character = ren.group({ id: 'character', nodes: [body.el], transform: `scale(1 1) translate(${-characterSize/2} 0)` })
  
  return character
  
}
const character = renCharacter();

const renEnergyFrag = () => {

  const energy = Math.random() * .02 + .06;

  const fragment = ren.circle({ class: 'energy-fragment', r: mainAspect.y * .015})
  const fragmentGlow = fragment.el.cloneNode();
  fragmentGlow.classList.add('glow')

  const element = ren.group({ class: 'energy-element', nodes: [fragmentGlow, fragment.el], transform: `translate(${Math.random() * mainAspect.x - mainAspect.x/2} ${Math.random() * - mainAspect.y*.05 - fragment.attr.r})` })

  fragment.el.addEventListener('click', () => {
    element.el.remove();
    updateEnergy(currentEnergy.value + energy)
  })
  
  return element;
}

const renEnergyBar = () => {

  const bg = ren.path({ class: 'energy-bar-bg',
    d: `M${-energyBarLength/2} ${mainAspect.y*.03} L${energyBarLength/2} ${mainAspect.y*.03}`
  })
  const energyMeter = bg.el.cloneNode();
  energyMeter.id = 'energyMeter';
  energyMeter.classList.add('energy-meter')
  energyMeter.setAttribute('d', `M${-energyBarLength/2} ${mainAspect.y*.03} L${-energyBarLength/2 + currentEnergy.value * energyBarLength} ${mainAspect.y*.03}`)
  energyMeter.style.stroke = `hsl(${(1 - currentEnergy.value) * 7} ${(1 - currentEnergy.value) * 89} ${(currentEnergy.value) * 52 + 48})`

  const element = ren.group({id: 'energyBar', nodes: [bg.el, energyMeter]})
  return element
}
const energyBar = renEnergyBar();

const renAimController = () => {

  const toggleSize = characterSize * .75;
  const toggleMoveSize = toggleSize/2;

  const renToggle = () => {

    const base = ren.rect( {class: 'aim-toggle', width: toggleSize, height: toggleSize, x: -toggleSize/2, y: -toggleSize/2})
    const element = ren.group( {id: 'aimToggle', nodes: [base.el]} )
    return element
    
  }
  const renMoveController = () => {

    const base = ren.rect( {class: 'aim-move-controller', width: toggleMoveSize, height: toggleMoveSize, x: -toggleMoveSize/2, y: -toggleMoveSize/2} );
    const element = ren.group( {id: 'aimMoveController', nodes: [base.el], transform: `translate(${toggleSize} ${-toggleMoveSize/2})`} )
    return element;
    
  }

  const element = ren.group({ id: 'aimController', nodes: [renToggle().el, renMoveController().el] })
  return element
  
}
const aimController = renAimController();

const ground = ren.path({class: 'ground', d: `M${-mainAspect.x/2} 0 ${mainAspect.x} 0`})

const mainDs = ren.svg({ class: 'main-display', viewBox: `${-mainAspect.x/2} ${-mainAspect.y * .95} ${mainAspect.x} ${mainAspect.y}`,
nodes: [ground, aimController]
})
document.body.appendChild(mainDs.el);