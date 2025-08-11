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

  ren(tag, data) {
    const newTag = document.createElement(tag);
    const config = {propNames: Object.keys(data), propValues: Object.values(data)};

    genContent(config, newTag);

    return newTag
  }
  
}
