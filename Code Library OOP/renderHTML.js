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

  listeners = [];

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
    if (target) this.node.removeEventListener(target.event, target.func);
  }

  ren(tag, data) {
    const newElement = new HTMLElement(tag, data);
    
    newElement.addNodes = this.addNodes.bind(newElement);
    newElement.addListener = this.addListener.bind(newElement);
    newElement.removeListener = this.removeListener.bind(newElement);
    return newElement
  }
  
}

// Helper class for created elements, used by HTML and ren()
class HTMLElement {

  listeners = [];
  
  constructor(tag, config) {
    this.node = document.createElement(tag);
    configureElement(this.node, config);
  }
}
