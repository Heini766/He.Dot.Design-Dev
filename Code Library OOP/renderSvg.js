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

// utility functions

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

function createBezierPath(vertices, inTangents, outTangents) {
  if (!vertices.length) return "";
  
  let pathData = "";
  
  // Start with MoveTo command for first vertex
  pathData += `M ${vertices[0][0]},${vertices[0][1]}`;
  
  // Create cubic Bezier curves between vertices
  for (let i = 1; i < vertices.length; i++) {
    const prevVertex = vertices[i - 1];
    const prevOutTangent = outTangents[i - 1];
    const currentVertex = vertices[i];
    const currentInTangent = inTangents[i];
    
    // Control point 1: previous vertex + its outTangent
    const cp1x = prevVertex[0] + prevOutTangent[0];
    const cp1y = prevVertex[1] + prevOutTangent[1];
    
    // Control point 2: current vertex + its inTangent  
    const cp2x = currentVertex[0] + currentInTangent[0];
    const cp2y = currentVertex[1] + currentInTangent[1];
    
    // End point: current vertex
    const endX = currentVertex[0];
    const endY = currentVertex[1];
    
    // Add cubic Bezier command
    pathData += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`;
  }
    
  return pathData;
} // helper function used by genPathData

export function genPathData(points = []) {

  const data = {};

  const vertices = [[0, 0], [0, 10]];
  const inTangents = [[0, 0], [0, 0]]; 
  const outTangents = [[0, 0], [0, 0]];

  if (!Array.isArray(points)) points = [points]

  points.forEach((v, i) => {
    vertices[i] = v.vertex ? v.vertex : [0, 0];
    inTangents[i] = v.inTangent ? v.inTangent : [0, 0];
    outTangents[i] = v.outTangent ? v.outTangent : [0, 0];
  }) 

  vertices.forEach((point, i) => {
    data[`node${i + 1}`] = {
      vtx: point,
      inT: inTangents[i],
      outT: outTangents[i],
      set: (config, node) => {
        if (!config) return
        vertices[i] = config.vertex || point
        inTangents[i] = config.inTangent || inTangents[i]
        outTangents[i] = config.outTangent || inTangents[i]
        data.d = createBezierPath(vertices, inTangents, outTangents);
        if (node) node.setAttribute('d', data.d)
      }
    }
  })

  data.d = createBezierPath(vertices, inTangents, outTangents);

  return data
  
} // used to create the bezier path data string for an svg path nodes data attribute.