import { SVG } from "../../../Code Library OOP/renderSvg.js";
import { UVMapper } from "../../../Code Library OOP/uvShader.js";

const aspect = {x: 100, y: 100}

export const canvas = new SVG({id: 'canvas', class: 'canvas', viewBox: `0 0 ${aspect.x} ${aspect.y}`});

const map = new UVMapper({x: 5, y: 5});

map.getUV((uv, index) => {
  console.log(uv, index)
})

map.forEachNode((node, cord) => {
  console.log(node)
})