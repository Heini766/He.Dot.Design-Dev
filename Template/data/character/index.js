import { SVG } from "../../../Code Library OOP/renderSvg.js";

export class Element {

  #d = new Map();
  
  #data = {
    position: [0, 0],
    scale: 1,
    rotate: 0,
  }

  constructor(call) {

    const svg = new SVG('g', {id: 'pacMan'});
    this.node = svg;

    if (call && typeof call === 'function') call(this.node)
  }

  spawn(container, config) {

    container.addNodes(this.node)
  }

  despawn() {
    this.node.node.remove()
  }

  setState(nodeWrapper, config) {
  // Input validation
  if (!nodeWrapper || !nodeWrapper.node || !(nodeWrapper.node instanceof Node)) {
    console.warn('Invalid node provided');
    return;
  }
  
  if (!config || typeof config !== 'object') {
    console.warn('Invalid config provided');
    return;
  }

  const node = nodeWrapper.node;
  const currentData = this.#d.get(nodeWrapper.key) || {};
  
  // Merge config with existing data (config takes precedence)
  const mergedData = { ...currentData, ...config };
  this.#d.set(nodeWrapper.key, mergedData);

  const changedProps = new Set();

  // Find what actually changed
  for (const key in mergedData) {
    if (currentData[key] !== mergedData[key]) {
      changedProps.add(key);
    }
  }

  // Apply changes to DOM
  changedProps.forEach(attr => {
    let value = mergedData[attr];
    
    // Transform values for CSS
    if (Array.isArray(value) && value.length === 2 && attr === 'translate') {
      value = `${value[0]}px ${value[1]}px`;
    } else if (Array.isArray(value) && value.length === 2 && attr === 'scale') {
      value = `${value[0]} ${value[1]}`;
    } else if (attr === 'rotate') {
      value = `${value}deg`;
    }
    
    // Apply to style (with validation)
    if (attr in node.style) {
      node.style[attr] = value;
    } else {
      console.warn(`Invalid style property: ${attr}`);
    }
  });
}
  
}