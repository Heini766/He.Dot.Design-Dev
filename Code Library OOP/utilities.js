import { fast } from "@cloudinary/url-gen/qualifiers/FontAntialias";
import { getPointAlongPath, getPointAngle } from "./functions.js";

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
  };

  constructor(path, config) {
    
    this.#data.refPath = path instanceof Node ? path : undefined;
    if (typeof(path) === 'string') [path] = document.querySelectorAll(path); // Finds reference path

    this.#data.container = config ? config.container : console.error('container node is invalid', this.#data.container)
    this.#data.count = config ? config.count : 3
        
  }
  
}