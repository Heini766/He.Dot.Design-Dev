
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

export class SVG {
  node = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  constructor(config) {
    this.node.setAttribute(`xmlns`, `http://www.w3.org/2000/svg`)
    const [keys, values] = [Object.keys(config), Object.values(config)]
    keys.forEach((el, index) => {
      this.node.setAttribute(`${keys[index]}`, `${values[index]}`)
    })
  }

  addNodes(data) {
      data().forEach((el) => [
      this.node.appendChild(el)
    ])
  }

  ren(tag, data) {
    const newTag = document.createElementNS('http://www.w3.org/2000/svg', `${tag}`);
    const config = {propNames: Object.keys(data), propValues: Object.values(data)};

    genContent(config, newTag);

    return newTag
  }
}