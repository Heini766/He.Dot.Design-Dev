import { getRelativePosition } from "../Code Library OOP/functions.js";
import { renUVs } from "../Code Library OOP/uvShader.js";
import {canvas} from "./data/display/components.js";

const elements = [canvas]

elements.forEach((el) => {

  document.body.appendChild(el.node)
  
})

const uvMap = new renUVs({x: 50, y: 50});

const pxSize = 1;

uvMap.getUVs((uv, i) => {
  let shape
  canvas.addNodes(() => {
    shape = canvas.ren('rect', {class: `shape${i + 1}`, width: pxSize, height: pxSize, x: -pxSize/2, y: -pxSize/2, transform: `translate(${uv.x * 100} ${uv.y * 100})`});
    shape.node.style.fill = `gray`
    return [shape]
  })
  return shape
})

canvas.node.addEventListener('mousemove', () => {
  const curPos = getRelativePosition(event, canvas.node);
  uvMap.getNodes((node, pos) => {
    const nodePos = {x: pos.x  * 100, y: pos.y * 100};
    const [xOffset, yOffset] = [Math.abs(curPos.x - nodePos.x), Math.abs(curPos.y - nodePos.y)]
    if (xOffset > 5 && yOffset > 5) {
      node.style.stroke = 'black';
      node.style.strokeWidth = .8;
      node.style.fill = 'gray'
    } else {
      node.style.stroke = 'none'
      node.style.fill = 'white'
    }
  })
})