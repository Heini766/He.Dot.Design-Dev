import { HTML } from "../../../Code Library OOP/renderHTML.js";
import { SVG } from "../../../Code Library OOP/renderSvg.js";

const aspect = {x: 100, y: 100}

const docHTML = new HTML();
export const canvas = new SVG({id: 'canvas', class: 'canvas', viewBox: `0 0 ${aspect.x} ${aspect.y}`});

