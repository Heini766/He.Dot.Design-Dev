export class HTML {

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
        this.listeners.push({event: data.event, func: callBack});
      } catch (error) {
        console.error('Failed to add event listener:', error)
      }

    })

    return this.listeners;
  }

  removeListener(index) {
    const target = this.listeners[index - 1];
    if (target) {
      this.node.removeEventListener(target.event, target.func);
      this.listeners.splice(index -1, 1);
    }
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