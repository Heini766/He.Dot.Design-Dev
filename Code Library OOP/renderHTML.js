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

  addNodes(nodes) {

    nodes = Array.isArray(nodes) ? nodes : [nodes]

    if (!this.childNodes) this.childNodes = new Map();
    
    nodes.forEach(item => {
      this.node.appendChild(item.node);
      const id = item.node.getAttribute('id');
      this.childNodes.set(id, item)
    });
    
  } // Takes node objects

  remove(childID) {

    childID = Array.isArray(childID) ? childID : [childID];
    const currentChildren = this.childNodes;

    childID.forEach(item => {
      if (currentChildren && currentChildren.get(item)) {
        currentChildren.get(item).node.remove()
        currentChildren.delete(item)
      } else {
        console.error(`can't remove unrecognised childID node - ${item}`)
      }
    })

    
    
  } // Takes the child node id
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