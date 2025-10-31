import { genPathData, SVG } from "../../../Library/renderSvg.js";
import { createDrag, getDistance, getRelativePosition } from "../../../Library/utilsFunctions.js";

export class stGame {

 // levels = new Map();
  #data = {
    aspect: [100, 100],
    pointsBuffer: 10,
  }

  constructor() {
    this.display = new SVG('svg', {id: 'gameDisplay', class: 'game-display', viewBox: `0 0 ${this.#data.aspect[0]} ${this.#data.aspect[1]}`});
    document.body.appendChild(this.display.node)
  }

  newLevel() {

    if (!this.levels) {
      this.levels = new Map()
    } else {
      this.display.archive.forEach(item => {
        item.purge()
      })
    };
    const levelCount = this.levels.size + 1
    if (levelCount > 3) {

      this.levels.clear()
      return
      
    }

    const levelData = {};
    levelData.points = {start: this.#genLevelPoint(), end: this.#genLevelPoint()}
    levelData.pointGraphics = this.#genLevelGraphics(levelData.points);

    this.display.addNodes(levelData.pointGraphics)
    
    this.levels.set(`level ${levelCount}`, levelData)
    
  }

  #genLevelPoint() {

    const newPoints = [
      Math.random() * (this.#data.aspect[0] - this.#data.pointsBuffer * 2) + this.#data.pointsBuffer,
      Math.random() * (this.#data.aspect[1] - this.#data.pointsBuffer * 2) + this.#data.pointsBuffer
    ]
    return newPoints
    
  }

  #genLevelGraphics(points) {

    this.display.ren('g', {id: 'start'}).setState({
      translate: [points.start[0], points.start[1]]
    })
    this.display.ren('g', {id: 'end'}).setState({
      translate: [points.end[0], points.end[1]]
    })
    this.display.ren('path', {id: 'drawPath', class: 'draw-path'});

    let drawPathData
    let curPos
    createDrag(this.display.archive.get('start').node, {
      onDown: e => {
        drawPathData = genPathData( this.display.archive.get('drawPath').node, [
          {vtx: points.start},
          {vtx: points.start}
        ])
      },
      onMove: e => {
        curPos = getRelativePosition(e, this.display.node)
        drawPathData.nodes.get('node2').set({
          vtx: curPos
        })
      },
      onUp: () => {

        const dis = getDistance(curPos, points.end).euclideanDistance;
        if (dis < 1) {this.newLevel(); return}
        
        drawPathData.nodes.get('node2').set({
          vtx: points.start
        })
      }
    }).active(true)

    const nodes = [this.display.archive.get('start'), this.display.archive.get('end'), this.display.archive.get('drawPath')];

    nodes[0].addNodes(this.display.ren('circle', {id: 'startIndicator',r: 1, fill: 'white'}))
    nodes[1].addNodes(this.display.ren('circle', {id: 'endIndicator',r: 1, fill: 'blue'}))

    return nodes
    
  }
  
}