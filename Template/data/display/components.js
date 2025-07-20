import * as ren from '../../../../../Code Library/renderSvg.js';

const dsAspect = {x: 100, y: 100}

const originMarker = ren.circle({class: `origin-marker`, r: 2})
export const mainDs = ren.svg({
  id: 'mainDisplay',
  class: 'main-display',
  viewBox: `${-dsAspect.x/2} ${-dsAspect.y/2} ${dsAspect.x} ${dsAspect.y}`,
  nodes: [originMarker]
})