import { getDistance, getRelativePosition } from "../../../Code Library OOP/functions.js";
import { SVG } from "../../../Code Library OOP/renderSvg.js";
import { UVMapper } from "../../../Code Library OOP/uvShader.js";

const aspect = {x: 100, y: 100}

export const canvas = new SVG({id: 'canvas', class: 'canvas', viewBox: `0 0 ${aspect.x} ${aspect.y}`});

const uvMap = new UVMapper({x: 10, y: 10});


const enterEventHandler = () => {

  const pathContainer = canvas.create('g', {id: 'pathContainer'})
  pathContainer.addNodes(() => {
    let paths = []
    for (let i = 0; i < 12; i++) {
      const newPath = canvas.create('path', {id: `path${i + 1}`, class: 'path'})
      paths.push(newPath)
    }
    return paths
  })
  canvas.addNodes(() => {return [pathContainer]})

  const moveEventHandler = () => {
    const curPos = getRelativePosition(event, canvas.node);
    const paths = pathContainer.node.childNodes;

    let i = 0;
    uvMap.getUVs((uv) => {
      const uvPos = {x: uv.x * aspect.x, y: uv.y * aspect.y};
      const distance = getDistance(curPos, uvPos).euclideanDistance;
      
      if (distance < 21) {
        if (paths[i]) {
          paths[i].setAttribute('d', `M${curPos.x} ${curPos.y} L${uvPos.x} ${uvPos.y}`)
          paths[i].style.stroke = `rgb(${uv.x * 255} ${uv.y * 255} 255 )`
          i++
        }
      }
    })
  }

  const leaveEventHandler = () => {
    pathContainer.node.remove()
    
    canvas.node.removeEventListener('click', moveEventHandler)
    canvas.node.removeEventListener('mouseleave', leaveEventHandler)
  }

  canvas.node.addEventListener('mousemove', moveEventHandler)
  canvas.node.addEventListener('mouseleave', leaveEventHandler)
  
}

canvas.node.addEventListener('mouseenter', enterEventHandler)