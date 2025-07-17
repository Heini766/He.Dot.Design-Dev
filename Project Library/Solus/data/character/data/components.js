import * as ren from '../../../../../Code Library/renderSvg.js';
import * as func from '../../../../../Code Library/functions.js';

const mainAspect = {x: 200, y: 200}
const originMarker = ren.circle({class: 'origin-marker', r: 1.5})
export const mainDs = ren.svg({id: 'mainDisplay', class: 'main-display', viewBox: `${-mainAspect.x/2} ${-mainAspect.y/2} ${mainAspect.x} ${mainAspect.y}`, nodes: [originMarker]})

// new code

export function renCharacter(size) {

  const renBody = () => {

    const base = ren.rect({class: 'solus-base', width: size, height: size})

    const renFace = () => {

      const renEyes = () => {
        const eye = ren.circle({class: 'solus-eye', r: size*.12});
        const [eyeL, eyeR] = [eye.el.cloneNode(), eye.el.cloneNode()]
        eyeL.setAttribute('transform', `translate(${size*.35} ${size*.25})`)
        eyeR.setAttribute('transform', `translate(${size*.65} ${size*.25})`)

        const element = ren.group({id: 'solusEyes', nodes: [eyeR, eyeL]})
        return element
      }
      
      const element = ren.group({id: 'solusFace', nodes: [renEyes().el]})
      return element
      
    }

    

    const element = ren.group({id: 'solusBody', nodes: [base.el, renFace().el]})
    return element
  } 

  const origin = originMarker.el.cloneNode()
  origin.classList.add('solus')
  const element = ren.group({id: 'characterSolus', nodes: [renBody().el, origin]})
  return element
}

// css properties

func.createCustomProp({
  primeColor: 'White'
})