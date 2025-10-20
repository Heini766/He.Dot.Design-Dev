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

const pattern = new PatternAlongPath(myPath.node, {container: canvas.node});

console.log(pattern)

canvas.addNodes(myPath)
