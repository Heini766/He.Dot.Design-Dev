import { canvas } from "../display/components.js";
import { genPathData } from "../../../Code Library OOP/renderSvg.js";
import { PatternAlongPath } from "../../../Code Library OOP/utilities.js";
import { createDrag } from "../../../Code Library OOP/utilities.js";
import { getRelativePosition } from "../../../Code Library OOP/functions.js";

canvas.addNodes(() => {

  const path = canvas.ren('path', {class: 'path', id: 'path',d: `M0 0 100 100`});

  return []
  
})

const myPath = canvas.archive.get('path').node;

const myPathData = genPathData(myPath, [
  {vtx: [25, 25]},
  {vtx: [75, 75]}
]);
myPathData.nodes.forEach(v => {

  const newInCPoint = canvas.ren('circle', {class: 'control-point in', r: 2});
  const newOutCPoint = canvas.ren('circle', {class: 'control-point out', r: 2});
  canvas.addNodes([newInCPoint, newOutCPoint])

  newInCPoint.node.setAttribute('transform', `translate(${v.inT[0] + v.vtx[0]} ${v.inT[1] + v.vtx[1]})`)
  newOutCPoint.node.setAttribute('transform', `translate(${v.outT[0] + v.vtx[0]} ${v.outT[1] + v.vtx[1]})`)

  createDrag(newOutCPoint.node, {
    onDown: (e) => {

      const cur = getRelativePosition(e, canvas.node);
      newOutCPoint.node.setAttribute('transform', `translate(${cur[0]} ${cur[1]})`)

      v.set({outT: [cur[0] - v.vtx[0], cur[1] - v.vtx[1]]})

      myPathPat.update()
      
    },
    onMove: e => {

      const cur = getRelativePosition(e, canvas.node);
      newOutCPoint.node.setAttribute('transform', `translate(${cur[0]} ${cur[1]})`)

      v.set({outT: [cur[0] - v.vtx[0], cur[1] - v.vtx[1]]})

      myPathPat.update()
      
    }
  }).active(true)

  createDrag(newInCPoint.node, {
    onDown: (e) => {

      const cur = getRelativePosition(e, canvas.node);
      newInCPoint.node.setAttribute('transform', `translate(${cur[0]} ${cur[1]})`)

      v.set({inT: [cur[0] - v.vtx[0], cur[1] - v.vtx[1]]})

      myPathPat.update()
      
    },
    onMove: e => {

      const cur = getRelativePosition(e, canvas.node);
      newInCPoint.node.setAttribute('transform', `translate(${cur[0]} ${cur[1]})`)

      v.set({inT: [cur[0] - v.vtx[0], cur[1] - v.vtx[1]]})

      myPathPat.update()
      
    }
  }).active(true)

})

const myPathPat = new PatternAlongPath(myPath, {
  container: canvas.node,
  count: 12,
  tangent: true
});

myPathPat.put(canvas.ren('rect', {class: 'block', width: 5, height: 5}).node);

myPathPat.set(v => {
  v.get('shape3').node.style.fill = 'blue'
  v.get('shape6').node.style.fill = 'blue'
})

//createDrag(can)