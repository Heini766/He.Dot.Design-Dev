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
        node.appendChild(el)
      })
    } else if (el === 'content') {
      node.innerHTML = `${config.propValues[index]}`
    } else {
      node.setAttribute(`${el}`, `${config.propValues[index]}`)
    }
    
  })
  
}

export function svg(data) {

  const newSvg = SVG.cloneNode(true);
  const propNames = Object.keys(data);
  const propValues = Object.values(data);
  let nodes = [];
  
  let i = 0;
  propNames.forEach((element) => {

    if (element === 'nodes') {
      data.nodes.forEach((element) => {
        newSvg.appendChild(element.el);
        nodes.push(element);
      })
    } else {
      newSvg.setAttribute(`${element}`, `${propValues[i]}`)
    }
    i += 1;
  })

  return {el:newSvg, nodes: nodes};
}; // Creates an SVG element.

export function group(data) {

  const newGroup = g.cloneNode(true);
  const propNames = Object.keys(data);
  const propValues = Object.values(data);
  let nodes = [];
  
  let i = 0;
  propNames.forEach((element) => {

    if (element === 'nodes') {
      data.nodes.forEach((element) => {
      newGroup.appendChild(element);
      nodes.push(element);
    })
    } else {
      newGroup.setAttribute(`${element}`, `${propValues[i]}`)
    }
    i += 1;
  })
  return {el:newGroup, nodes: nodes};
  
}; // Creates a group element.

export function path(data) {

  const newPath = pathElement.cloneNode(true);
  const propNames = Object.keys(data);
  const propValues = Object.values(data);
  let i = 0;

  propNames.forEach((element) => {
    newPath.setAttribute(`${element}`, `${propValues[i]}`);
    i += 1;
  })
  return {el: newPath, attr: data};

}; // Creates a path element. 

export function circle(data) {

  const newCircle = circleElement.cloneNode(true);
  const propNames = Object.keys(data);
  const propValues = Object.values(data);
  let i = 0;
  
  propNames.forEach((element) => {

    if (element === 'event') {
      newCircle.addEventListener(propValues[i][0], propValues[i][1])
    } else {
      newCircle.setAttribute(`${element}`, `${propValues[i]}`);
    }
    i += 1;
  })
  
  return {el: newCircle, attr: data};
  
}; // creates circle element.

export function rect(data) {

  const newRect = rectElement.cloneNode(true);
  const propNames = Object.keys(data);
  const propValues = Object.values(data);
  let i = 0;

  propNames.forEach((element) => {
    newRect.setAttribute(`${element}`, `${propValues[i]}`)
    i += 1;
  })
  return {el: newRect, attr: data};
  
}; // creates rectangle element.

export function text(data) {

  const newText = textElement.cloneNode(true);
  const propNames = Object.keys(data);
  const propValues = Object.values(data);
  let i = 0;

  propNames.forEach((element) => {

    if (element === 'content') {
      newText.textContent = `${propValues[i]}`;
    } else {
      newText.setAttribute(`${element}`, `${propValues[i]}`)
    };
    i += 1;
  })
  return {el: newText, attr: data};
  
};

export function img(data) {

  const newImg = imgElement.cloneNode();
  const propNames = Object.keys(data);
  const propValues = Object.values(data);
  //let i = 0;

  propNames.forEach((el, index) => {

    newImg.setAttribute(`${el}`, `${propValues[index]}`)
    //i += 1
  })
  return {el: newImg, attr: data}
  
};

export function defs(data) {

  const newDef = defsElement.cloneNode();
  const propNames = Object.keys(data);
  const propValues = Object.values(data);
  let nodes = []

  propNames.forEach((el, index) => {

  if (el === 'nodes') {
    data.nodes.forEach((el) => {
      newDef.appendChild(el);
      nodes.push(el);
    })
  } else {
    newDef.setAttribute(`${el}`, `${propValues[index]}`)
  }
  })
  return {el: newDef, nodes: nodes}
  
}

export function mask(data) {

  const newMask = maskElement.cloneNode();
  const propNames = Object.keys(data);
  const propValues = Object.values(data);
  let nodes = []

  propNames.forEach((el, index) => {

    if (el === 'nodes') {
      propValues[index].forEach((el) => {
        newMask.appendChild(el)
        nodes.push(el)
      })
    } else {
      newMask.setAttribute(`${el}`, `${propValues[index]}`)
    }
    
  })
  return {el: newMask, nodes: nodes}
  
}

export function use(data) {

  const newUse = useElement.cloneNode();
  const config = {propNames: Object.keys(data), propValues: Object.values(data)};

  genContent(config, newUse);

  return {el: newUse}
  
}