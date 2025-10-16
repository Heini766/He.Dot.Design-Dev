export function createDrag(node, config = {}) {

  node = node instanceof Node ? node : undefined;
  
  const data = {
    active: (set) => {
      if (node && set) node.addEventListener('mousedown', onD)
      else if (!node) console.warn(node, 'is not a DOM node')
      else node.removeEventListener('mousedown', onD)
     }
  }

  if (typeof(node) === 'string') [node] = document.querySelectorAll(node)

  const  onD = (e) => {

    window.addEventListener('mousemove', onM)
    window.addEventListener('mouseup', onU)
    
    if (!config.onDown || typeof(config.onDown) !== 'function' ) return
    config.onDown(e, data)
  }
  const  onM =  (e) => {
    if (!config.onMove || typeof(config.onMove) !== 'function' ) return
    config.onMove(e, data)
  }
  const  onU = (e) => {

    window.removeEventListener('mousemove', onM)
    window.removeEventListener('mouseup', onU)
    
    if (!config.onUp || typeof(config.onUp) !== 'function' ) return
    config.onUp(e, data)
  }

  return data
  
}