export class SVG {

  node = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  constructor(config) {
    configureElement(this.node, config);
  }

   addNodes(nodes) {

    if (typeof(nodes) === 'function') nodes = nodes();
    nodes = Array.isArray(nodes) ? nodes : [nodes];

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

  ren(tag, data, settings) {

    let archive = true
    if (settings) archive = settings.archive ? settings.archive : false;
    
    const newElement = new SVGElement(tag, data);

    newElement.addNodes = this.addNodes.bind(newElement);
    newElement.remove = this.remove.bind(newElement);

    if (archive) {
    if (!this.archive) this.archive = new Map();
    const id = newElement.node.getAttribute('id')
    if (id) this.archive.set(id, newElement)
    else this.archive.set(`shape${this.archive.size + 1}`, newElement);
    }

    return newElement
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