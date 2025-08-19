function genContent(config, node) {
  config.propNames.forEach((el, index) => {

    if (el === 'nodes') {
      config.propValues[index].forEach((el) => {
        node.appendChild(el)
      })
    } else if (el === 'content') {
      node.innerHTML = `${config.propValues[index]}`
    } else {
      node.setAttribute(`${el}`, `${config.propValues[index]}`)
    }
    
  })
}

export class HTML {

  node = undefined;

  constructor(tag, data) {
    const newEl = document.createElement(tag);
    const config = {propNames: Object.keys(data), propValues: Object.values(data)};

    genContent(config, newEl);

    this.node = newEl
  }

  addNodes(data) {
    const nodes = data()
    nodes.forEach((el, i) => {
      const id = el.node.getAttribute('id');
      this[`${id ? id : `undefNode${i}`}`] = el;
      this.node.appendChild(el.node)
    })
  }
  
  ren(tag, data) {

    const newEl = new class {
      node = undefined;
      constructor() {
        const newTag = document.createElement(tag)
        const config = {propNames: Object.keys(data), propValues: Object.values(data)};

        genContent(config, newTag);

        this.node = newTag
      }

      addNodes(data) {
        const nodes = data()
        nodes.forEach((el, i) => {
          const id = el.node.getAttribute('id');
          if (id) this[id] = el
          this.node.appendChild(el.node)
        })
      }

    }

    return newEl
    
  }
  
}
