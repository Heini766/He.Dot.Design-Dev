import { createDrag, PatternAlongPath, UVMapper } from "../../../Code Library OOP/utilities.js";
import { canvas } from "../display/components.js";
import { genPathData } from "../../../Code Library OOP/renderSvg.js";
import { getRelativePosition } from "../../../Code Library OOP/functions.js";

const map = new UVMapper([2, 2])

const path = canvas.ren('path', {id: 'path', class: 'path'});
const pathD = genPathData(path.node, [
  {vtx: [30, 30], outT: [-10, 10]},
  {vtx: [70, 70], inT: [10, -10]},
]);

createDrag(canvas.node, {

  onDown: (e) => {
    const cur = getRelativePosition(e, canvas.node);
    const targetNode = pathD.nodes.get('node2')
    targetNode.set({inT: [cur[0] - targetNode.vtx[0], cur[1] - targetNode.vtx[1]]})

    pat.update()
  },
  onMove: (e) => {
    const cur = getRelativePosition(e, canvas.node);
    const targetNode = pathD.nodes.get('node2')
    targetNode.set({inT: [cur[0] - targetNode.vtx[0], cur[1] - targetNode.vtx[1]]})

    pat.update()
    
  },
  
}).active(10)

//canvas.addNodes(path)

const pat = new PatternAlongPath(path.node, {
  count: 12,
  parent: canvas.node,
  callBack: (v, t) => {
    v.style.opacity = t;
  }
}).put(canvas.ren('circle', {r: 2, fill: `white`}).node);

