import { SVG } from "../../../Code Library OOP/renderSvg.js";

const aspect = {x: 100, y: 100}

export const canvas = new SVG({id: 'canvas', class: 'canvas', viewBox: `0 0 ${aspect.x} ${aspect.y}`});

const container = canvas.ren('g', {id: 'container', transform: `translate(${aspect.x/2} ${aspect.y/2})`});
const shape = canvas.ren('circle', {class: 'shape', id: `shape`, r: 5});

canvas.addNodes( [container])
container.addNodes([shape])