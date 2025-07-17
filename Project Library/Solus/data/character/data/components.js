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
        const eye = ren.circle({class: 'solus-eye', r: size*.1});
        const [eyeL, eyeR] = [eye.el.cloneNode(), eye.el.cloneNode()]
        eyeL.setAttribute('transform', `translate(${size*.12} ${0})`)
        eyeR.setAttribute('transform', `translate(${-size*.12} ${0})`)

        const element = ren.group({id: 'solusEyes', nodes: [eyeR, eyeL], transform: `translate(${0} ${-size * .2})`})
        return element
      }
      const mouth = ren.path({class: 'solus-mouth', d: `M${-size*.15} ${0} ${size*.15} ${0}`})
      
      const element = ren.group({id: 'solusFace', nodes: [renEyes().el, mouth.el], transform: `translate(${size/2} ${size*.45})`})
      return element
      
    }

    const element = ren.group({id: 'solusBody', nodes: [base.el, renFace().el]})
    return element
  } 

  const origin = originMarker.el.cloneNode()
  origin.classList.add('solus')
  const element = ren.group({id: 'characterSolus', nodes: [renBody().el, origin], transform: `translate(${-size/2} ${-size/2})`})
  return element
}

// css properties

func.createCustomProp({
  primeColor: 'White',
  stStrokeWidth: 2
})