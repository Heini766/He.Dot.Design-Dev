import { SVG } from "../../../Code Library OOP/renderSvg.js";
import { HTML } from "../../../Code Library OOP/renderHTML.js";

const aspect = {x: 100, y: 100}

export const mainDs = new SVG({id: 'mainDisplay', class: 'main-display', viewBox: `${-aspect.x/2} ${-aspect.y/2} ${aspect.x} ${aspect.y}`});

mainDs.addNodes(() => {

  const def =  mainDs.ren('defs', {id: 'defNode'});
  def.addNodes(() => {

    const radGrade = mainDs.ren('radialGradient', {id: 'radGrade1',r: 0.2})
    const stopCount = 1;
    radGrade.addNodes(() => {

      const stops = []
      
      for (let i = 0; i <= stopCount; i += 1) {
        const newStop = mainDs.ren('stop', {class: `radialStop${i + 1}`, offset: `${i/stopCount}`});
        stops.push(newStop)
      }
      return stops
    })
    
    return [radGrade]
  })
  const shapeSize = {width: 50, height: 50}
  const shape1 = mainDs.ren('rect', {class: 'shape1', width: shapeSize.width, height: shapeSize.height, x: -shapeSize.width/2, y: -shapeSize.height/2})
  
  return [def, shape1]
})

export const myDiv = new HTML('div', {id: 'myDiv', class: 'box'})

myDiv.addNodes(() => {
  return [
    myDiv.ren('h1', {id: 'h1Tag', content: 'Heinrich'}),
    myDiv.ren('a', {href: '#', class: 'anchor1'})
  ]
})

console.log(myDiv.h1Tag.node)