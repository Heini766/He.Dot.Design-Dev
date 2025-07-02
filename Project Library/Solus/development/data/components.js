import * as ren from '../library/renderSvg.js';
import { mainAspect } from './properties.js';

export const characterSize = mainAspect.x*.04;
function renderCharacter() {

  const body = ren.rect({
    id: 'characterBody',
    class: 'character-body',
    x: 0,
    y: -characterSize,
    width: characterSize,
    height: characterSize,
  })

  const renderFace = () => {


    const renderEyes = () => {

      const eyeL = ren.circle({
        class: 'character-eye',
        r: characterSize * .12,
      })
      const eyeR = eyeL.el.cloneNode(true);

      eyeL.el.setAttribute('transform', `translate(${- characterSize * .16})`)
      eyeR.setAttribute('transform', `translate(${characterSize * .16})`)

      const eyes = ren.group({
        id: 'character-eyes',
        nodes: [eyeL.el, eyeR]
      })

      return eyes;
      
    }
    const eyes = renderEyes();

    const mouth = ren.path({
      class: 'character-mouth',
      transform: `translate(0 ${characterSize * .2})`,
      d: `M${- characterSize * .1} 0 ${characterSize * .1} 0`
    })

    const face = ren.group({
      id: 'character-face',
      transform: `translate(${characterSize/2} ${-characterSize * .7})`,
      nodes: [eyes.el, mouth.el]
    })
    
    return face;
    
  }

  const face = renderFace()

  const character = ren.group({
    id: 'character',
    transform: `translate(${-characterSize/2} 0)`,
    nodes: [body.el, face.el]
  })

  return character
  
}

function renderMainDs() {

  const originRef = ren.circle({
    class: 'origin-reference',
    r: 2,
  })

  const floorPlane = ren.path({
    class: 'floor',
    d: `M${-mainAspect.x/2} 0 ${mainAspect.x/2} 0`
  })

  const mainDs = ren.svg({
    class: 'main-display',
    viewBox: `${-mainAspect.x/2} ${-mainAspect.y*.95} ${mainAspect.x} ${mainAspect.y}`,
    nodes: [floorPlane.el, originRef.el, character.el]
  })

  return mainDs;
  
}

const character = renderCharacter();
export const mainDs= renderMainDs().el;