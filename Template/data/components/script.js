import { createDrag, PatternAlongPath, UVMapper } from "../../../Code Library OOP/utilities.js";
import { canvas } from "../display/components.js";
import { genPathData } from "../../../Code Library OOP/renderSvg.js";
import { getRelativePosition } from "../../../Code Library OOP/functions.js";

const map = new UVMapper([2, 2])

const path = canvas.ren('path', {id: 'path', class: 'path'});
const pathD = genPathData(path.node, [
  {vtx: [45, 45]},
  {vtx: [55, 55]},
  {vtx: [75, 25]}
]);

createDrag(canvas.node, {

  onDown: (e) => {
    const cur = getRelativePosition(e, canvas.node);
    const targetNode = pathD.nodes.get('node3')
    targetNode.set({inT: [cur[0] - targetNode.vtx[0], cur[1] - targetNode.vtx[1]]})
  },
  onMove: (e) => {
    const cur = getRelativePosition(e, canvas.node);
    const targetNode = pathD.nodes.get('node3')
    targetNode.set({inT: [cur[0] - targetNode.vtx[0], cur[1] - targetNode.vtx[1]]})
  }
  
}).active(true)

canvas.addNodes(path)

const pat = new PatternAlongPath(path.node, {
  count: 12,
  parent: canvas.node,
  callBack: (v, t) => {
    v.style.opacity = t;
  }
}).put(canvas.ren('circle', {r: 2, fill: `white`}).node)

