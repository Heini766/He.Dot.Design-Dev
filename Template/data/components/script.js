import { canvas } from "../display/components.js";
import { genPathData } from "../../../Code Library OOP/renderSvg.js";
import { PatternAlongPath } from "../../../Code Library OOP/utilities.js";
import { createDrag } from "../../../Code Library OOP/utilities.js";
import { getRelativePosition } from "../../../Code Library OOP/functions.js";

const myPath = canvas.ren('path', {id: 'path', class: 'path'});
const myPData = genPathData(myPath.node, [
  {vtx: [20, 25]},
  {vtx: [50, 50]}
])

const pattern = new PatternAlongPath(myPath.node, {container: canvas.node, count: 20});

pattern.put(canvas.ren('rect', {width: 2, height: 2, fill: 'white'}).node, [
  {node: canvas.ren('rect', {fill: 'white', width: 2, height: 2}).node}, 
])

pattern.set((v, key, map) => {
  map.get('shape18').node.style.fill = 'purple'
})

//canvas.addNodes(myPath)

createDrag(canvas.node, {
  onDown: (e) => {

    const pos = getRelativePosition(e, canvas.node);

    myPData.nodes.get('node1').set({
      vtx: [pos[0], pos[1]]
    })

    pattern.update()
    
  },
  onMove: e => {
    const pos = getRelativePosition(e, canvas.node);

    myPData.nodes.get('node1').set({
      vtx: [pos[0], pos[1]]
    })

    pattern.update()
  },
  onUp: () => {
    console.log(pattern)
  }
}).active(true)
