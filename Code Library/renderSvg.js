//https://cdn.jsdelivr.net/gh/Heini766/He.Dot.Design-Dev@refs/heads/main/Code%20Library/renderSvg.js

const SVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
SVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
SVG.setAttribute('preserveAspectRatio', 'xMidYMid meet');
const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
const circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
const rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');

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
      newGroup.appendChild(element.el);
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
  
}