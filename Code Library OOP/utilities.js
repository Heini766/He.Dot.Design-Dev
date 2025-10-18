export function createDrag(node, config = {}) {

  node = node instanceof Node ? node : undefined;
  
  const data = {
    active: (set) => {
      if (node && set) node.addEventListener('mousedown', onD)
      else if (!node) console.warn(node, 'is not a DOM node')
      else node.removeEventListener('mousedown', onD)
     }
  }

  if (typeof(node) === 'string') [node] = document.querySelectorAll(node)

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
  uvCoordinates = [];
  #uvNodes = [];
  
  constructor(gridSize) {
    if (!gridSize || typeof gridSize.x !== 'number' || typeof gridSize.y !== 'number') {
      throw new Error('gridSize must be an object with x and y properties');
    }

    this.#generateUVCoordinates(gridSize);
  }

  #generateUVCoordinates(gridSize) {
    for (let y = 0; y <= gridSize.y; y += 1) {
      for (let x = 0; x <= gridSize.x; x += 1) {
        this.uvCoordinates.push([x / gridSize.x, y / gridSize.y]);
      }
    }
  }

  processCoordinates(callBack) {
    this.uvCoordinates.forEach((coordinate, index) => {
      const shape = callBack(coordinate, index);
      if (shape && shape.node) {
        this.#uvNodes.push(shape.node);
      }
    });
  }

  forEachNode(callBack) {
    if (typeof callBack !== 'function') {
      throw new Error('callback must be a function');
    }

    this.#uvNodes.forEach((node, index) => {
      callBack(node, this.uvCoordinates[index]);
    });
  }
} // creates a grid 