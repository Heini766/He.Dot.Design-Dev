import { canvas } from "../display/components.js";
import { genPathData } from "../../../Code Library OOP/renderSvg.js";
import { PatternAlongPath } from "../../../Code Library OOP/utilities.js";
import { createDrag } from "../../../Code Library OOP/utilities.js";
import { getRelativePosition } from "../../../Code Library OOP/functions.js";

const myPath = canvas.ren('path', {id: 'path', class: 'path'});
const myPData = genPathData(myPath.node, [
  {vtx: [20, 25]},
  {vtx: [80, 75]}
])

const pattern = new PatternAlongPath(myPath.node, {
  count: 3,
  parent: canvas.node,
  tangent: false
}).put(canvas.ren('rect', {id: 'block', class: 'block', width: 5, height: 5}).node)

canvas.addNodes(myPath)

createDrag(canvas.node, {
  onDown: (e) => {
    const pos = getRelativePosition(e, canvas.node);
    myPData.nodes.get('node2').set({vtx: [pos[0], pos[1]]});
    pattern.update({tangent: false})
  },
  onMove: (e) => {
    const pos = getRelativePosition(e, canvas.node);
    myPData.nodes.get('node2').set({vtx: [pos[0], pos[1]]});
    pattern.update()
  },
  onUp: () => {
    pattern.update({tangent: true})
  }
}).active(true)