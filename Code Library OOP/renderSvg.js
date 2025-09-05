function genContent(config, node) {

  config.propNames.forEach((el, index) => {

    if (el === 'nodes') {
      config.propValues[index].forEach((el) => {
        if (el) {
          node.appendChild(el)
        }
      })
    } else if (el === 'content') {
      node.innerHTML = `${config.propValues[index]}`
    } else {
      node.setAttribute(`${el}`, `${config.propValues[index]}`)
    }
    
  })
  
}

export class SVG {
  
  node = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  
  constructor(config = {}) {
    Object.entries(config).forEach(([key, value]) => {
      this.node.setAttribute(key, value);
    });
  }

  addNodes(nodes) {
    const nodeArray = typeof nodes === 'function' ? nodes() : nodes;
    
    nodeArray.forEach(node => {
      const id = node.node?.getAttribute('id');
      if (id) this[id] = node;
      this.node.appendChild(node.node);
    });
    
    return this; // For method chaining
  }

  create(tag, attributes = {}) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
    
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    
    return {
      node: element,
      addNodes: (nodes) => {
        const nodeArray = typeof nodes === 'function' ? nodes() : nodes;
        nodeArray.forEach(node => element.appendChild(node.node));
        return element;
      }
    };
  }

}