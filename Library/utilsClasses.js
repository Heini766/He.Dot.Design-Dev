import { getPointAlongPath, getPointAngle } from "./utilsFunctions.js";

export class UVMapper {
  uvCords = [];
  
  constructor(gridSize = []) {

    if (gridSize.length <= 1) {
      throw new Error('gridSize must be an array of x and y value');
    }

    this.#generateuvCords(gridSize);
  }

  #generateuvCords(gridSize) {
    for (let y = 0; y <= gridSize[1]; y += 1) {
      for (let x = 0; x <= gridSize[0]; x += 1) {
        this.uvCords.push([x / gridSize[0], y / gridSize[1]]);
      }
    }
  }

  processCords(callBack) {
    this.uvCords.forEach((coordinate, i) => {
      callBack(coordinate, i);
    });
  }
  
} // creates a grid 

export class PatternAlongPath {

  #data = {}; // Stores all pattern related data.

  constructor(path, config = {}) {
    
    this.#data.refPath = path instanceof Node ? path : undefined;
    if (typeof(path) === 'string') [path] = document.querySelectorAll(path); // Finds reference path

    this.#data.container = config.container ? config.container : console.error('container node is invalid', this.#data.container)
    this.#data.count = config.count ? config.count : 3
    this.#data.tangent = config.tangent ? config.tangent : false
        
  }

  put(defNode, arrayConfig = []) {

    defNode = defNode instanceof Node ? defNode : console.error('default node is', defNode);
    if (!defNode) return

    if (!this.#data.pat) this.#data.pat = new Map();

    for (let i = 0; i < this.#data.count; i++) {

      const data = {}

      data.offset = i/Math.abs(1 - this.#data.count);

      let newNode
      if (arrayConfig[i] ) {
        newNode = arrayConfig[i].node instanceof Node ? arrayConfig[i].node : undefined;
        data.tangent = arrayConfig[i].tangent ? arrayConfig[i].tangent : this.#data.tangent;
        data.angle = arrayConfig[i].angle ? arrayConfig[i].angle : undefined;
      } else {
        data.tangent = this.#data.tangent
      }
      
      data.node = newNode ? newNode.cloneNode(true) : defNode.cloneNode(true);
      data.pos = getPointAlongPath(this.#data.refPath, data.offset);

      this.#data.pat.set(`shape${i + 1}`, data)

    }

    this.#data.pat.forEach((v) => {

      let transform = `translate(${v.pos[0]} ${v.pos[1]})`;
      
      v.angle = v.angle ? v.angle : getPointAngle(this.#data.refPath, v.offset).deg
      if (v.tangent) transform += `rotate(${v.angle})`

      v.node.setAttribute('transform', transform);
      this.#data.container.appendChild(v.node)
      
    })
    
  }

  set(callBack) {

    if (!this.#data.pat || typeof(callBack) !== 'function') return

    callBack(this.#data.pat)

    this.update()
  }

  update() {

    this.#data.pat.forEach((v) => {

      const newPos = getPointAlongPath(this.#data.refPath, v.offset)
      v.pos = newPos

      let translate = `translate(${v.pos[0]} ${v.pos[1]})`;
      let rotate = v.angle ? `rotate(${v.angle})` : undefined;
      
      if (v.tangent) {
        v.angle = getPointAngle(this.#data.refPath, v.offset).deg
        rotate = `rotate(${v.angle})`
      }

      const transform = rotate ? translate + rotate : translate;
      v.node.setAttribute('transform', transform);
      
    })
    
  }
  
}