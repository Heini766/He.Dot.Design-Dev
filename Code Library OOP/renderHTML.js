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

export class HTML {

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

  addNodes(dataFunction) {
    const nodes = dataFunction();
    nodes.forEach(item => {
      this.node.appendChild(item.node);
      const id = item.node.getAttribute('id');
      if (id) this[id] = item;
    });
  }

  ren(tag, data) {
    const newElement = new HTMLElement(tag, data);

    newElement.addNodes = this.addNodes.bind(newElement);
    return newElement
  }
  
}

// Helper class for created elements, used by HTML and ren()
class HTMLElement {
  constructor(tag, config) {
    this.node = document.createElement(tag);
    configureElement(this.node, config);
  }
}
