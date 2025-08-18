import { SVG } from "../../../Code Library OOP/renderSvg.js"
import { createAni, easeInOutCubic, easeOutCubic, easeOutSine } from "../../../Code Library OOP/animationFunctions.js";
import { triangularWave } from "../../../Code Library OOP/functions.js";

const aspect = {x: 100, y: 100}

export const mainDs = new SVG({id: 'mainDisplay', class: 'main-display', viewBox: `${-aspect.x/2} ${-aspect.y/2} ${aspect.x} ${aspect.y}`});
const genStops = (stopCount, gradeClass) => {
  const stops = []
  for (let i = 0; i <= stopCount; i += 1) {
    const newStop = mainDs.ren('stop', {class: `${gradeClass} stop${i}`, offset: `${i/stopCount}`})
    stops.push(newStop)
  }
  return stops
}

const stopCount = 2;
const [gradeGap, gradeStartX] = [.2, 0];

const mainDsNodes = mainDs.addNodes(() => {

  const defs = mainDs.ren('defs', {id: 'defNode'});
  defs.addNodes(() => {
    const gradient1 = mainDs.ren('linearGradient', {id: 'grade1', x1: gradeStartX, x2: gradeStartX + gradeGap,})
    gradient1.addNodes(() => {

      const stops = []
      for (let i = 0; i <= stopCount; i += 1) {
        const newStop = mainDs.ren('stop', {class: `grade1 stop${i}`, offset: `${i/stopCount}`});
        stops.push(newStop)
      }
      
      return stops
    })
    return [gradient1]
  }) // defs node

  const shape1 = mainDs.ren('rect', {id: 'rect1', class: 'rect1', width: 30, height: 30})

  return [defs, shape1]
  
})

// createAni(1, (t) => {

//   const minShift = 1 - gradeGap;
//   const newShiftX = easeOutSine(triangularWave(t))* minShift;
//   mainDs.defNode.grade1.node.setAttribute('x1', `${newShiftX}`)
//   mainDs.defNode.grade1.node.setAttribute('x2', `${newShiftX + gradeGap}`)
  
// }, 'loop')