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

  create = {
    div(data) {
      const newDiv = document.createElement('div')
      const config = {propNames: Object.keys(data), propValues: Object.values(data)};

      genContent(config, newDiv)

      return newDiv
    },
    section(data) {
      const newSec = document.createElement('section')
      const config = {propNames: Object.keys(data), propValues: Object.values(data)};

      genContent(config, newSec)

      return newSec
    },
    h1(data) {
      const newH1 = document.createElement('h1')
      const config = {propNames: Object.keys(data), propValues: Object.values(data)};

      genContent(config, newH1)

      return newH1
    },
    a(data) {
      const newA = document.createElement('a')
      const config = {propNames: Object.keys(data), propValues: Object.values(data)};

      genContent(config, newA)

      return newA
    }
  }
  
}
