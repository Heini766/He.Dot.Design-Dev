export class SVG {

  node = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  constructor(config) {
    configureElement(this.node, config);
  }

  addNodes(dataFunction) {
    const nodes = dataFunction();

    if (!this.childNodes) this.childNodes = new Map();
    
    nodes.forEach(item => {
      this.node.appendChild(item.node);
      const id = item.node.getAttribute('id');
      //if (id) this[id] = item;
      this.childNodes.set(id, item)
    });
    
  }

  remove(child) {

    if (this.childNodes && this.childNodes.get(child)) {
      this.childNodes.get(child).node.remove()
      this.childNodes.clear(child)
    } else {
      console.error(`unrecognised child node - ${child}`)
    }
    
  }

  ren(tag, data) {
    const newElement = new SVGElement(tag, data);

    newElement.addNodes = this.addNodes.bind(newElement);
    newElement.remove = this.remove.bind(newElement);
    return newElement;
  }

}

// Helper class for created elements, used by SVG and ren()
class SVGElement {
  
  constructor(tag, config) {
    this.node = document.createElementNS('http://www.w3.org/2000/svg', tag);
    configureElement(this.node, config);
  }
}

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