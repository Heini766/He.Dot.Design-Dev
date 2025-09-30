export class HTML {

  ren(tag, data) {
    const newElement = new HTMLElement(tag, data);
    return newElement
  }
  
}

// Helper class for created elements, used by HTML and ren()
class HTMLElement {

  constructor(tag, config) {
    this.node = document.createElement(tag);
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

    if (!this.removeNode)  this.removeNode = removeNode

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
      delete this.removeNode;
      
    }
    
  } // returns a method for clearing all childNodes.

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

  removeListenerById(listenerId) {
    const index = this.listeners.findIndex(l => l.id === listenerId);
    if (index !== -1) {
      const listener = this.listeners[index];
      // Remove all callbacks from the chain
      listener.callbacks.forEach(callback => {
        this.node.removeEventListener(listener.event, callback);
      });
      this.listeners.splice(index, 1);
    }
  }

  removeListenerByEvent(event) {
    const listenersToRemove = this.listeners.filter(l => l.event === event);
    listenersToRemove.forEach(listener => {
      listener.callbacks.forEach(callback => {
        this.node.removeEventListener(event, callback);
      });
    });
  }
  
}

function removeNode(item) {

  let array = Array.isArray(item) ? item : [item];

  array.forEach(node => {
    const target = this.childNodes.get(node);
    this.childNodes.delete(node)
    target.node.remove()
  })

  if (this.childNodes.size < 1) {
    delete this.removeNode
  }
  
} // Helper used by addNodes method in HTMLElement

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