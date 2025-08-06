const divEl = document.createElement('div');
const headerEl = document.createElement('header');
const secEl = document.createElement('section');
const anchorEl = document.createElement('a');

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

export function div(data) {

  const newDiv = divEl.cloneNode();
  const config = {propNames: Object.keys(data), propValues: Object.values(data)};

  genContent(config, newDiv)

  return newDiv
  
}

export function section(data) {

  const newSec = secEl.cloneNode();
  const config = {propNames: Object.keys(data), propValues: Object.values(data)};

  genContent(config, newSec)

  return newSec
  
}

export function header(data) {

  const newHeader = headerEl.cloneNode();
  const config = {propNames: Object.keys(data), propValues: Object.values(data)};

  genContent(config, newHeader)

  return  newHeader
  
}


export function a(data) {

  const newA = anchorEl.cloneNode()
  const config = {propNames: Object.keys(data), propValues: Object.values(data)};
  genContent(config, newA)

  return newA
}