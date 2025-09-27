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
<<<<<<< HEAD

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
=======

  ren(tag, data) {
    const newElement = new HTMLElement(tag, data);
    return newElement
>>>>>>> main
  }
  
}

// Helper class for created elements, used by HTML and ren()
class HTMLElement {

  listeners = [];
  
  constructor(tag, config) {
    this.node = document.createElement(tag);
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

  addListener(event, func) {
    if (!event || !func) {
      console.warn('Invalid listener config:', event, func);
      return;
    }

    const callbacks = []; // Store all callbacks in the chain
    let currentCallback;

    try {
      // Create the initial callback
      currentCallback = (event) => {
        return func(event, this);
      };
      
      callbacks.push(currentCallback);
      this.node.addEventListener(event, currentCallback);
      this.listeners.push({ event: event, func: currentCallback });
    } catch (error) {
      console.error('Failed to add event listener:', error);
      return;
    }

    return {
      and: (nextFunc) => {
        if (typeof nextFunc !== 'function') return this;
        
        // Remove the previous callback
        this.node.removeEventListener(event, currentCallback);
        
        // Create a new callback that chains the functions
        const previousCallback = currentCallback;
        currentCallback = (event) => {
          const previousResult = previousCallback(event);
          return nextFunc(previousResult, event, this);
        };
        
        callbacks.push(currentCallback);
        
        // Update the listener
        this.node.addEventListener(event, currentCallback);
        
        // Update the listeners array
        const listenerIndex = this.listeners.findIndex(
          l => l.event === event && l.func === previousCallback
        );
        if (listenerIndex !== -1) {
          this.listeners[listenerIndex].func = currentCallback;
        }
        
        return this; // Return this for chaining
      }
    };
  }

  removeListener(index) {
    const target = this.listeners[index - 1];
    if (target) {
      this.node.removeEventListener(target.event, target.func);
      this.listeners.splice(index -1, 1);
    }
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