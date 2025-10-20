import { getPointAlongPath } from "./functions.js";

export function createDrag(node, config = {}) {

  node = node instanceof Node ? node : undefined;
  if (typeof(node) === 'string') [node] = document.querySelectorAll(node)
  
  const data = {
    active: (set) => {
      if (node && set) node.addEventListener('mousedown', onD)
      else if (!node) console.warn(node, 'is not a DOM node')
      else node.removeEventListener('mousedown', onD)
     }
  }

  const  onD = (e) => {

    window.addEventListener('mousemove', onM)
    window.addEventListener('mouseup', onU)
    
    if (!config.onDown || typeof(config.onDown) !== 'function' ) return
    config.onDown(e, data)
  }
  const  onM =  (e) => {
    if (!config.onMove || typeof(config.onMove) !== 'function' ) return
    config.onMove(e, data)
  }
  const  onU = (e) => {

    window.removeEventListener('mousemove', onM)
    window.removeEventListener('mouseup', onU)
    
    if (!config.onUp || typeof(config.onUp) !== 'function' ) return
    config.onUp(e, data)
  }

  return data
  
} // adds click and drag functionality

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
    this.uvCords.forEach((coordinate, index) => {
      callBack(coordinate, index);
    });
  }
  
} // creates a grid 

export class PatternAlongPath {

  #data = {
    points: [],
    shapes: [],
  };

  constructor(node, config) {

    this.#data.count = config.count || 4;
    this.#data.parent = config.parent || undefined;
    this.#data.callBack = config.callBack || undefined;

    if (typeof(node) === 'string') [node] = document.querySelectorAll(node)
    this.#data.ref = node instanceof Node && node.tagName === 'path' ? node : undefined;

    if (!node) throw new Error('node must be a path');

    for (let i = 0; i < this.#data.count; i++) {

      const offset = i/Math.abs(1 - this.#data.count);
      this.#data.points.push(getPointAlongPath(this.#data.ref, offset))
      
    }
    
  }

  put(node) {

    node = node instanceof Node ? node : undefined;
    if (typeof(node) === 'string') [node] = document.querySelectorAll(node);

    this.#data.parent = this.#data.parent instanceof Node ? this.#data.parent : undefined;
    if (typeof(this.#data.parent) === 'string') [this.#data.parent] = document.querySelectorAll(this.#data.parent);

    this.#data.points.forEach((p, i) => {

      if (!node) {
        this.#data.callBack ? this.#data.callBack(i/Math.abs(1 - this.#data.points.length)) : null;
      } else {
        const newShape = node.cloneNode(true);
        newShape.setAttribute('transform', `translate(${p[0]} ${p[1]})`);

        if (this.#data.parent) this.#data.parent.appendChild(newShape)

        this.#data.shapes.push(newShape);
        this.#data.callBack ? this.#data.callBack(newShape, i/Math.abs(1 - this.#data.points.length)) : null;
      }
      
    })

    return this
    
  }

  update() {

    this.#data.points = [];

    this.#data.shapes.forEach((el, i) => {
      const offset = i/Math.abs(1 - this.#data.count);
      const p = getPointAlongPath(this.#data.ref, offset)
      this.#data.points.push(p);

      el.setAttribute('transform', `translate(${p[0]} ${p[1]})`);
    })
    
  }
  
}