import * as ren from '../../../../../../../Code Library/renderSvg.js';

const mainAspect = {x: 200, y: 200}
const originMarker = ren.circle({class: 'origin-marker', r: 2})
// new code

export const renDisplay = () => {

  const renBg = () => {

  const renGrid = () => {

    const totalLinesX = 9;
    const spacingX = mainAspect.y/totalLinesX
    const gridLine = ren.path({class: 'grid-line'})

    let gridLines = [];
    for (let i = 0; i <= totalLinesX; i += 1) {
      const newLineX = gridLine.el.cloneNode();
      const newLineY = gridLine.el.cloneNode();
      newLineX.setAttribute('d', `M${-mainAspect.x/2} ${-mainAspect.y/2 + spacingX * i} ${mainAspect.x/2} ${-mainAspect.y/2 + spacingX * i}`)
      newLineY.setAttribute('d', `M${-mainAspect.x/2 + spacingX * i} ${-mainAspect.y/2} ${-mainAspect.x/2 + spacingX * i} ${mainAspect.y/2}`)
      gridLines.push(newLineX)
      gridLines.push(newLineY)
    }

    const grid = ren.group({id: 'grid', nodes: gridLines})
    return grid
    
  }

    const bg = ren.group({id: 'display-bg', nodes: [renGrid().el]})
    return bg
    
  }

  const mainDs = ren.svg({
    id: 'mainDisplay',
    class: 'main-display',
    viewBox: `${-mainAspect.x/2} ${-mainAspect.y/2} ${mainAspect.x} ${mainAspect.y}`,
    nodes: [renBg(), originMarker]
  })

  return mainDs
  
}