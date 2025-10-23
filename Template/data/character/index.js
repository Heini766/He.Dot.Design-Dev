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

  setState(node, config) {

    const isNode = node.node instanceof Node;

    if (typeof(node) === 'string') [node] = document.querySelectorAll(node)
    else if (!node && !isNode) return
    if (!config || typeof(config) !== 'object') return

    const curData = this.#d.get(node.key) ? this.#d.get(node.key) : {}
    if (curData) config = {...curData, ...config}

    this.#d.set(node.key, config)

    const changedProps = new Set();

    for (const key in config) {
      if (curData[key] !== config[key]) {
        curData[key] = config[key];
        changedProps.add(key)
      }
    }

    changedProps.forEach(attr => {
      
      if (Array.isArray(curData[attr])) curData[attr] = `${curData[attr][0]}px ${curData[attr][1]}px`;
      if (attr === 'rotate') curData[attr] = `${curData[attr]}deg`;

      node.node.style[attr] = curData[attr]
      
    })

    
  }
  
}