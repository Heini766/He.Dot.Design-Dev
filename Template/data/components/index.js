

import {Element} from "../../../Code Library OOP/utilsClasses.js"
import { createDrag, getRelativePosition } from "../../../Code Library OOP/utilsFunctions.js"
import { canvas } from "../display/components.js"

export class PointGame {

  points = new Set()

  renderPoint(container) {

    const newPoint = new Element(g => {
      return [
        g.ren('circle', {r: 5, fill: 'white'})
      ]
    })
    let offset
    createDrag(newPoint.root.node, {
      onDown: e => {
        const curPos = getRelativePosition(e, canvas.node);
        const pointPos = newPoint.getData().get('classShape').translate;
        offset = [curPos[0] - pointPos[0], curPos[1] - pointPos[1]];
      },
      onMove: e => {
        const curPos = getRelativePosition(e, canvas.node);
        newPoint.setState(newPoint.root, {
          translate: [curPos[0] - offset[0], curPos[1] - offset[1]]
        })
      },
      onUp: () => {
        if (this.points.size >= 3) {
          this.deletePoint(newPoint)
        }
        console.log(this.points.size)
      }
    }).active(true)

    this.points.add(newPoint)

    const rPos = [Math.random() * 100, Math.random() * 100];

    newPoint.spawn(container, {
      translate: rPos
    })
    
  }

  deletePoint(point) {
    point.root.node.remove()
    this.points.delete(point);
  }
  
}