import * as ren from '../../../../../Code Library/renderSvg.js';

const dsAspect = {x: 100, y: 100}

export const originMarker = ren.circle({class: `origin-marker`, r: 1})

const totalLines = 8;
export const spacing = dsAspect.x/totalLines;

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

  const bg = ren.group({id: 'game-bg', nodes: [grid.el]})

  const mainDs = ren.svg({
    id: 'mainDisplay',
    class: 'main-display',
    viewBox: `${-dsAspect.x/2 + spacing/2} ${-dsAspect.y/2 + spacing/2} ${dsAspect.x} ${dsAspect.y}`,
    nodes: [bg, originMarker]
  })
  return mainDs
  
}