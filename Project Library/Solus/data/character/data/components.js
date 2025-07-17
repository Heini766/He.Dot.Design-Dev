import * as ren from '../../../../../Code Library/renderSvg.js';
import * as func from '../../../../../Code Library/functions.js';

const mainAspect = {x: 200, y: 200}
const originMarker = ren.circle({class: 'origin-marker', r: 1.5})
export const mainDs = ren.svg({id: 'mainDisplay', class: 'main-display', viewBox: `${-mainAspect.x/2} ${-mainAspect.y/2} ${mainAspect.x} ${mainAspect.y}`, nodes: [originMarker]})

// new code

export function renCharacter(size) {

  const renBody = () => {

    const base = ren.rect({id: 'solusBase',class: 'solus-base', width: size, height: size})

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

    const renHair = () => {

      const singleHair = ren.path({class: 'hair'});

      let hair = [];

      const deviation = .1;
      for (let i = 0; i < 3; i += 1) {
        const newHair = singleHair.el.cloneNode();
        const offset = (.75 - deviation) + i * deviation
        const {x, y} = func.getRadPoints(offset, 7.5);
        newHair.setAttribute('d', `M0 0 ${x} ${y}`)
        hair.push(newHair)
      }

      const element = ren.group({id: 'solus-hair', transform: `translate(${size/2} 0)`})
      hair.forEach((el) => {
        element.el.appendChild(el)
      })
      return element
      
    }

    const element = ren.group({id: 'solusBody', nodes: [renHair().el, base.el, renFace().el]})
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