export class HTML {
  node = undefined;

  constructor(tag, data = {}) {
    this.node = document.createElement(tag);
    this.setAttributes(data);
  }

  setAttributes(attributes = {}) {
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'textContent') {
        this.node.textContent = value;
      } else if (key === 'innerHTML') {
        this.node.innerHTML = value;
      } else if (key.startsWith('on') && typeof value === 'function') {
        this.node.addEventListener(key.slice(2), value);
      } else {
        this.node.setAttribute(key, value);
      }
    });
    return this; // For method chaining
  }

  addNodes(nodes) {
    const nodeArray = Array.isArray(nodes) ? nodes : [nodes];
    
    nodeArray.forEach(node => {
      const element = node.node || node;
      const id = element.getAttribute?.('id');
      
      if (id) this[id] = node;
      this.node.appendChild(element);
    });
    
    return this; // For method chaining
  }

  static create(tag, attributes = {}) {
    return new HTML(tag, attributes);
  }
}
