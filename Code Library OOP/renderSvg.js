function configureElement(node, config) {

  if (!config) return;

  for (const [key, value] of Object.entries(config)) {
    if (key === 'nodes' && Array.isArray(value)) {
      value.forEach(nodeToAppend => nodeToAppend && node.appendChild(nodeToAppend.node));
    } else if (key === 'content') {
      node.innerHTML = value;
    } else {
      node.setAttribute(key, value);
    }
  }
  
}

export class SVG {

  listeners = [];
  node = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  constructor(config) {
    configureElement(this.node, config);
  }

  addNodes(dataFunction) {
    const nodes = dataFunction();
    nodes.forEach(item => {
      this.node.appendChild(item.node);
      const id = item.node.getAttribute('id');
      if (id) this[id] = item;
    });
  }

  addListener(config) {

    const configArray = Array.isArray(config) ? config : [config];
    
    configArray.forEach((data) => {

      if (!data.event || !data.func) {
        console.warn('Invalid listener config:', data);
        return;
      }

      try {
        function callBack() {
          data.func(this)
        }
        
        this.node.addEventListener(data.event, callBack);
        this.listeners.push(data);
      } catch (error) {
        console.error('Failed to add event listener:', error)
      }

    })

    return this.listeners.length;
  }

  removeListener(index) {
    const target = this.listeners[index - 1];
    if (target) {
      this.node.removeEventListener(target.event, target.func);
      this.listeners.splice(index -1, 1);
    }
  }

  ren(tag, data) {
    const newElement = new SVGElement(tag, data);

    newElement.addNodes = this.addNodes.bind(newElement);
    return newElement;
  }

}

// Helper class for created elements, used by SVG and ren()
class SVGElement {

  listeners = [];
  
  constructor(tag, config) {
    this.node = document.createElementNS('http://www.w3.org/2000/svg', tag);
    configureElement(this.node, config);
  }
}