import * as ren from '../../../Code Library/renderSvg.js';
import { mainAspect } from "./properties.js";

const mainDs = ren.svg({ class: 'main-display', viewBox: `${-mainAspect.x/2} ${-mainAspect.y/2} ${mainAspect.x} ${mainAspect.y}`,
nodes: []
})
document.body.appendChild(mainDs.el);