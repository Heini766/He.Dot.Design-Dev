import * as ren from '../../../Code Library/renderSvg.js';
import { mainAspect } from "./properties.js";

const mainDs = ren.svg({ class: 'main-display', viewBox: `0 0 ${mainAspect.x} ${mainAspect.y}`,
nodes: []
})
document.body.appendChild(mainDs.el);