import * as ren from '../../../../../Code Library/renderSvg.js';

export const dsAspect = {x: 100, y: 100}

export const originMarker = ren.circle({class: `origin-marker`, r: 1})

const totalLines = 8;
export const spacing = dsAspect.x/totalLines;

const masks = () => {
  
  const maskShape = ren.circle({class: 'circle-mask1', r: spacing, cx: spacing/2, cy: spacing/2})
  const maskTag = ren.mask({id: 'mask1', nodes: [maskShape.el]})

  const el = ren.defs({nodes: [maskTag.el]})
  return el;
  
}

export const renDisplay = () => {

  const renGrid = () => {
    const gridLine = ren.path({class: 'grid-line'})

    let gridLines = [];
    for (let i = 1; i <= totalLines; i += 1) {
      const newLineX = gridLine.el.cloneNode();
      const newLineY = gridLine.el.cloneNode();
      newLineX.setAttribute('d',  `M${-dsAspect.x/2 + spacing} ${-dsAspect.y/2 + spacing * i} ${dsAspect.y/2} ${-dsAspect.y/2 + spacing * i}`);
      newLineY.setAttribute('d', `M${-dsAspect.x/2 + spacing * i} ${-dsAspect.y/2 + spacing} ${-dsAspect.x/2 + spacing * i} ${dsAspect.y/2}`)
      gridLines.push(newLineX);
      gridLines.push(newLineY);
    }

    const grid = ren.group({id: 'grid', nodes: gridLines})
    return grid
    
  }
  const grid = renGrid()
  const gridGlow = grid.el.cloneNode(true);
  gridGlow.childNodes.forEach((el) => {
    el.classList.add('glow-line')
  })
  gridGlow.classList.add('glow')

  const bg = ren.group({id: 'game-bg', nodes: [grid.el, gridGlow]})

  const mainDs = ren.svg({
    id: 'mainDisplay',
    class: 'main-display',
    viewBox: `${-dsAspect.x/2 + spacing/2} ${-dsAspect.y/2 + spacing/2} ${dsAspect.x} ${dsAspect.y}`,
    nodes: [masks(), bg]
  })
  return mainDs
  
}

export const renStats = () => {

  const statsAspect = {x: dsAspect.x * .2, y: dsAspect.y}

  const mainDs = ren.svg({id: 'statsDisplay', class: 'stats-display', viewBox: `${-statsAspect.x/2} ${-statsAspect.y/2} ${statsAspect.x} ${statsAspect.y}`})
  return mainDs
  
}