import * as ren from '../../../../../Code Library/renderSvg.js';

const mainAspect = {x: 200, y: 200}
const originMarker = ren.circle({class: 'origin-marker', r: 1})
export const mainDs = ren.svg({id: 'mainDisplay', class: 'main-display', viewBox: `${-mainAspect.x/2} ${-mainAspect.y/2} ${mainAspect.x} ${mainAspect.y}`, nodes: [originMarker]})

// new code

export const [baseSize, indicatorSize] = [mainAspect.x/5, mainAspect.x/5 * .25];
export const renCharacter = (mainAspect) => {
  
  const renBody = () => {

    const body = ren.rect({id: 'characterBody', class:'character-body', width: baseSize, height: baseSize})
    const indicator = ren.rect({ id: 'indicator', width: baseSize * .25, height: baseSize * .25 })
    
    const el = ren.group( {id: 'characterBody', nodes: [body.el, indicator.el]} )
    return el
    
  }
  
  const el = ren.group({id: 'character', transform: `translate(${-baseSize/2} ${-baseSize/2})`, nodes: [renBody().el, originMarker.el.cloneNode()]})
  return el
  
}

const graphics = [renCharacter(mainAspect)]

graphics.forEach((el) => {

  mainDs.el.appendChild(el.el)
  
})