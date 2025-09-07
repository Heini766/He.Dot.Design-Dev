export class UVMapper {
  #uvCoordinates = [];
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
        this.#uvCoordinates.push({
          x: x / gridSize.x,
          y: y / gridSize.y
        });
      }
    }
  }

  getUVs(callBack) {
    this.#uvCoordinates.forEach((coordinate, index) => {
      const shape = callBack(coordinate, index);
      if (shape && shape.node) {
        this.#uvNodes.push(shape.node);
      }
    });
  }

  forEachNode(callBack) {
    if (typeof callback !== 'function') {
      throw new Error('callback must be a function');
    }

    this.#uvNodes.forEach((node, index) => {
      callback(node, this.#uvCoordinates[index]);
    });
  }
}