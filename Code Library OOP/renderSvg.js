export class SVG {

  listeners = [];
  node = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  listeners = [];

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

<<<<<<< HEAD
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
=======
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
>>>>>>> main
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
    newElement.addListener = this.addListener.bind(newElement);
    newElement.removeListener = this.removeListener.bind(newElement);
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