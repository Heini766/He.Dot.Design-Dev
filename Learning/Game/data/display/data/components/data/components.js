import * as ren from '../../../../../../../Code Library/renderSvg.js';

const mainAspect = {x: 200, y: 200}
const originMarker = ren.circle({class: 'origin-marker', r: 2})
// new code

export const renDisplay = () => {

  const mainDs = ren.svg({
    id: 'mainDisplay',
    class: 'main-display',
    viewBox: `${-mainAspect.x/2} ${-mainAspect.y/2} ${mainAspect.x} ${mainAspect.y}`,
    nodes: [originMarker]
  })

  return mainDs
  
}