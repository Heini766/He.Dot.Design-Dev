import { SVG } from "../../../Code Library OOP/renderSvg.js";

const aspect = {x: 100, y: 100}

export const canvas = new SVG({id: 'canvas', class: 'canvas', viewBox: `0 0 ${aspect.x} ${aspect.y}`});