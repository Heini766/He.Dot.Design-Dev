
function genContent(config, node) {

  config.propNames.forEach((el, index) => {

    if (el === 'nodes') {
      config.propValues[index].forEach((el) => {
        if (el) {
          node.appendChild(el)
        }
      })
    } else if (el === 'content') {
      node.innerHTML = `${config.propValues[index]}`
    } else {
      node.setAttribute(`${el}`, `${config.propValues[index]}`)
    }
    
  })
  
}

 class SVG {
  node = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  constructor(config) {
    this.node.setAttribute(`xmlns`, `http://www.w3.org/2000/svg`)
    const [keys, values] = [Object.keys(config), Object.values(config)]
    keys.forEach((el, index) => {
      this.node.setAttribute(`${keys[index]}`, `${values[index]}`)
    })
  }

  addNodes(data) {
    const newNodes = data()
    newNodes.forEach((el) => [
      this.node.appendChild(el)
    ])
  }

  create = {

    path(data) {
      const newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const config = {propNames: Object.keys(data), propValues: Object.values(data)};
      genContent(config, newPath);
  
      return newPath
    },
    circle(data) {
    const newCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    const config = {propNames: Object.keys(data), propValues: Object.values(data)};
    genContent(config, newCircle);
  
    return newCircle
    },
    rect(data) {
      const newRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      const config = {propNames: Object.keys(data), propValues: Object.values(data)};
      genContent(config, newRect);
  
      return newRect
    },
    text(data) {
      const newText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      const config = {propNames: Object.keys(data), propValues: Object.values(data)};
      genContent(config, newText)

      return newText
    },
    img(data) {
      const newImg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
      const config = {propNames: Object.keys(data), propValues: Object.values(data)};
      genContent(config, newImg)

      return newImg
    },
    group(data) {
      const newG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      const config = {propNames: Object.keys(data), propValues: Object.values(data)};
      genContent(config, newG)

      return newG
    },
    defs(data) {
      const newDef = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      const config = {propNames: Object.keys(data), propValues: Object.values(data)};
      genContent(config, newDef)

      return newDef
    },
    mask(data) {
      const newMask = document.createElementNS('http://www.w3.org/2000/svg', 'mask');
      const config = {propNames: Object.keys(data), propValues: Object.values(data)};
      genContent(config, newMask)

      return newMask
    },
    use(data) {
      const newUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      const config = {propNames: Object.keys(data), propValues: Object.values(data)};
      genContent(config, newUse)

      return newUse
    }

  }
}