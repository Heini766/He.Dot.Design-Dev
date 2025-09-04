export class UVMapper {
  #uvCoordinates = [];
  #uvNodes = [];

  constructor(gridSize, shapeCallback) {
    if (!gridSize || typeof gridSize.x !== 'number' || typeof gridSize.y !== 'number') {
      throw new Error('gridSize must be an object with x and y properties');
    }
    
    if (typeof shapeCallback !== 'function') {
      throw new Error('shapeCallback must be a function');
    }

    this.#generateUVCoordinates(gridSize);
    this.#createUVNodes(shapeCallback);
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

  #createUVNodes(shapeCallback) {
    this.#uvCoordinates.forEach((coordinate, index) => {
      const shape = shapeCallback(coordinate, index);
      if (shape && shape.node) {
        this.#uvNodes.push(shape.node);
      }
    });
  }

  forEachNode(callback) {
    if (typeof callback !== 'function') {
      throw new Error('callback must be a function');
    }

    this.#uvNodes.forEach((node, index) => {
      callback(node, this.#uvCoordinates[index]);
    });
  }

  get nodes() {
    return [...this.#uvNodes]; // Return a copy to prevent external modification
  }

  get coordinates() {
    return [...this.#uvCoordinates]; // Return a copy to prevent external modification
  }

  get size() {
    return this.#uvNodes.length;
  }
}