export class SVG {

  constructor(tag, config) {
    if (typeof(tag) !== 'string') console.error('invalid tag', tag)
    this.node = document.createElementNS('http://www.w3.org/2000/svg', tag)
    configureElement(this.node, config);
  }

   addNodes(nodes) {

    if (typeof(nodes) === 'function') nodes = nodes();
    nodes = Array.isArray(nodes) ? nodes : [nodes];

    if (!this.archive) this.archive = new Map();

    nodes.forEach(item => {
      if (this.archive.get(item.key) !== item) this.archive.set(item.key, item)
    }) // adds node to archive if it hasn't already
    
    nodes.forEach(item => {
      this.node.appendChild(item.node);
    });
    
  } // Takes node objects

  ren(tag, data = {}) {
    
    const newElement = new SVGElement(tag, data);
    newElement.id = data ? data.id : undefined;

    if (!this.archive) this.archive = new Map();

    let undefIds = 0;
    if (!data.id) {
      this.archive.forEach((item, key) => {
        if (!item.id) undefIds += 1;
      })
    }

    if (newElement.id) {
      newElement.key = newElement.id
      this.archive.set(newElement.id, newElement)
    }
    else {
      newElement.key = `shape${undefIds + 1}`
      this.archive.set(newElement.key, newElement)
    }

    newElement.addNodes = this.addNodes.bind(newElement);
    return newElement
  } 

}

// Helper class for created elements, used by SVG and ren()
class SVGElement {
  
  constructor(tag, config) {
    this.node = document.createElementNS('http://www.w3.org/2000/svg', tag);
    configureElement(this.node, config);
  }

  add(container) {
    if (!container || !container.node) { console.error('Not a valid container', container);  return }
    container.addNodes(this)
  }

  remove() {
    this.node.remove()
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

function createBezierPath(vertices, inTangents, outTangents, closePath = false) {
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
  
  // Close the path if requested
  if (closePath && vertices.length > 1) {
    const lastVertex = vertices[vertices.length - 1];
    const lastOutTangent = outTangents[vertices.length - 1];
    const firstVertex = vertices[0];
    const firstInTangent = inTangents[0];
    
    // Control point 1: last vertex + its outTangent
    const cp1x = lastVertex[0] + lastOutTangent[0];
    const cp1y = lastVertex[1] + lastOutTangent[1];
    
    // Control point 2: first vertex + its inTangent  
    const cp2x = firstVertex[0] + firstInTangent[0];
    const cp2y = firstVertex[1] + firstInTangent[1];
    
    // End point: first vertex (closing the loop)
    const endX = firstVertex[0];
    const endY = firstVertex[1];
    
    // Add closing cubic Bezier command
    pathData += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`;
    
    // Add Z command to explicitly close the path (optional but good practice)
    pathData += " Z";
  }
    
  return pathData;
} // helper function used by genPathData

export function genPathData(node, points = [], closePath = false) {
  // Better default handling
  const defaultPoints = [
    { vtx: [0, 0], inT: [0, 0], outT: [0, 0] },
    { vtx: [0, 50], inT: [0, 0], outT: [0, 0] }
  ];
  
  const normalizedPoints = Array.isArray(points) && points.length > 0 ? points : defaultPoints;

  const data = {
    nodes: new Map(),
    _needsUpdate: true, // Add dirty flag
    _node: null
  };

  // Handle node parameter
  if (node && typeof node === 'string') {
    [data._node] = document.querySelectorAll(node);
  } else if (node?.tagName) {
    data._node = node;
  }

  // Initialize nodes
  normalizedPoints.forEach((point, i) => {
    const nodeId = `node${i + 1}`;
    
    data.nodes.set(nodeId, {
      vtx: point.vtx || [0, 0],
      inT: point.inT || [0, 0],
      outT: point.outT || [0, 0],
      set: (config) => {
        if (!config) return;
        
        const target = data.nodes.get(nodeId);
        let updated = false;
        
        // Only update if values actually changed
        if (config.vtx && (config.vtx[0] !== target.vtx[0] || config.vtx[1] !== target.vtx[1])) {
          target.vtx = config.vtx;
          updated = true;
        }
        if (config.inT && (config.inT[0] !== target.inT[0] || config.inT[1] !== target.inT[1])) {
          target.inT = config.inT;
          updated = true;
        }
        if (config.outT && (config.outT[0] !== target.outT[0] || config.outT[1] !== target.outT[1])) {
          target.outT = config.outT;
          updated = true;
        }
        
        if (updated) {
          data._needsUpdate = true;
          updatePath(); // Defer DOM update
        }
      }
    });
  });

  function updatePath() {
    if (!data._needsUpdate) return;
    
    data.d = createBezierPath(
      Array.from(data.nodes.values()).map(v => v.vtx),
      Array.from(data.nodes.values()).map(v => v.inT),
      Array.from(data.nodes.values()).map(v => v.outT),
      closePath
    );
    
    if (data._node?.tagName === 'path') {
      data._node.setAttribute('d', data.d);
    }
    
    data._needsUpdate = false;
  }

  // Initial setup
  updatePath();
  
  // Return data if no valid DOM node was provided
  return data._node ? data : data;
} // used to create the bezier path data string for an svg path nodes data attribute.