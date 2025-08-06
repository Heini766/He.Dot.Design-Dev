const SVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
SVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
SVG.setAttribute('preserveAspectRatio', 'xMidYMid meet');
const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
const circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
const rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
const imgElement = document.createElementNS('http://www.w3.org/2000/svg', 'image');
const defsElement = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
const maskElement = document.createElementNS('http://www.w3.org/2000/svg', 'mask');
const useElement = document.createElementNS('http://www.w3.org/2000/svg', 'use');

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

export function svg(data) {

  const newSvg = SVG.cloneNode();
  const config = {propNames: Object.keys(data), propValues: Object.values(data)};

  genContent(config, newSvg);

  return {el: newSvg, nodes: newSvg.childNodes};
}; // Creates an SVG element.

export function group(data) {

  const newG = g.cloneNode();
  const config = {propNames: Object.keys(data), propValues: Object.values(data)};

  genContent(config, newG);

  return {el: newG, attr: data};
  
}; // Creates a group element.

export function path(data) {

  const newPath = pathElement.cloneNode();
  const config = {propNames: Object.keys(data), propValues: Object.values(data)};

  genContent(config, newPath);

  return {el: newPath, attr: data};

}; // Creates a path element. 

export function circle(data) {

  const newCircle = circleElement.cloneNode();
  const config = {propNames: Object.keys(data), propValues: Object.values(data)};

  genContent(config, newCircle);

  return {el: newCircle}
  
}; // creates circle element.

export function rect(data) {

  const newRect = rectElement.cloneNode();
  const config = {propNames: Object.keys(data), propValues: Object.values(data)};

  genContent(config, newRect);

  return {el: newRect, attr: data}
  
}; // creates rectangle element.

export function text(data) {

 const newText = textElement.cloneNode();
  const config = {propNames: Object.keys(data), propValues: Object.values(data)};

  genContent(config, newText);

  return {el: newText, attr: data}
  
};

export function img(data) {

  const newImg = imgElement.cloneNode();
  const config = {propNames: Object.keys(data), propValues: Object.values(data)};

  genContent(config, newImg);

  return {el: newImg, attr: data}
  
};

export function defs(data) {

  const newDef = defsElement.cloneNode();
  const config = {propNames: Object.keys(data), propValues: Object.values(data)};

  genContent(config, newDef);

  return {el: newDef, nodes: newDef.childNodes}
  
}

export function mask(data) {

  const newMask = maskElement.cloneNode();
  const config = {propNames: Object.keys(data), propValues: Object.values(data)};

  genContent(config, newMask);

  return {el: newMask}
  
}

export function use(data) {

  const newUse = useElement.cloneNode();
  const config = {propNames: Object.keys(data), propValues: Object.values(data)};

  genContent(config, newUse);

  return {el: newUse}
  
}