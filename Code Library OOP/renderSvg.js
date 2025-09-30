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
      if (id) this[id] = item;
      this.childNodes.set(id, item)
    });

    return () => {

      this.childNodes.forEach(item => {
        if (item.node && item.node.parentNode === this.node) {
          this.node.removeChild(item.node)
        }
        const id = item.node.getAttribute('id');
        if (id && this[id]) {
          delete this[id]
        }
      })
      delete this.childNodes;
      
    }
    
  }

  addListener(event, func) {
    if (!event || !func) {
      console.warn('Invalid listener config:', event, func);
      return;
    }

    if (!this.listeners) this.listeners = new Map();

    const listenerId = Symbol(); // Unique identifier for this listener chain
    let currentCallback;

    try {
      // Create the initial callback
      currentCallback = (event) => {
        return func(event, this);
      };
      
      this.node.addEventListener(event, currentCallback);
      
      // Store the entire listener chain info
      this.listeners.set(listenerId, { 
        id: listenerId,
        event: event, 
        func: currentCallback,
        callbacks: [currentCallback] // Track all callbacks for cleanup
      });
    } catch (error) {
      console.error('Failed to add event listener:', error);
      return;
    }

    return {
      and: (nextFunc) => {
        if (typeof nextFunc !== 'function') return this;
        
        // Find the listener by ID
        const listener = this.listeners.get(listenerId);
        if (!listener) return this;
        
        // Remove the current callback
        this.node.removeEventListener(event, listener.func);
        
        // Create a new callback that chains the functions
        const previousCallback = listener.func;
        currentCallback = (event) => {
          const previousResult = previousCallback(event);
          return nextFunc(previousResult, event, this);
        };
        
        // Update the listener
        listener.func = currentCallback;
        listener.callbacks.push(currentCallback);
        
        // Add the new callback
        this.node.addEventListener(event, currentCallback);

        return this;
      }
    };
  }

  removeListenerByEvent(event) {
    let listenersToRemove = [];
    this.listeners.forEach((item, index) => {
      if (item.event === event) listenersToRemove.push(item);
      this.listeners.delete(index);
    });
    listenersToRemove.forEach(listener => {
      listener.callbacks.forEach(callback => {
        this.node.removeEventListener(event, callback);
      });
    });
  }

  ren(tag, data) {
    const newElement = new SVGElement(tag, data);

    newElement.addNodes = this.addNodes.bind(newElement);
    newElement.addListener = this.addListener.bind(newElement);
    newElement.removeListenerByEvent = this.removeListenerByEvent.bind(newElement);
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