import { SVG } from "../../../Code Library OOP/renderSvg.js"

const aspect = {x: 100, y: 100}

export const mainDs = new SVG({id: 'mainDisplay', class: 'main-display', viewBox: `${-aspect.x/2} ${-aspect.y/2} ${aspect.x} ${aspect.y}`});

const stopCount = 1;
const [gradeGap, gradeStartX] = [1, 0];

mainDs.addNodes(() => {
  return []
})