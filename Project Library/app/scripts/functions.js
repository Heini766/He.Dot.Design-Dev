import { HTML } from "../../../Code Library OOP/renderHTML.js";
const docHTML = new HTML();

// Tool events - functions that trigger when tool buttons are interacted with

export const changeToolStyles = (event, target) => {

  const btnContainer = document.getElementById('btnContainer');

  const targetClassList = target.node.classList;

  if (!targetClassList.contains('active')) {
    btnContainer.childNodes.forEach((node) => {
      node.classList.remove('active')
    })
    targetClassList.add('active')
  } else {
    targetClassList.remove('active')
  } // Changes classes for styling

}

// Render functipns - creates elements

export function renInspectorContent(parentNode) {

  const bodyContainer = docHTML.ren('div', {id: 'inspectorBodyContainer', class: 'inspector-body-container'});
  const containerEls = () => {

    const info = ['Id', 'Class'];
    let elements = []

    info.forEach((el, i) => {
      const infoContainer = docHTML.ren('div', {id: `infoContainer${i + 1}`, class: 'info-container'});
      infoContainer.addNodes(() => {

        const title = docHTML.ren('label', {id: `inspectTitle${el}`, class: 'inspector-title', for: `inspectorInp${i + 1}`, content: `${el}`});
        const input = docHTML.ren('input', {id: `inspectorInp${i + 1}`, class: 'inspector-input'})

        return [title, input]
        
      })
      elements.push(infoContainer)
    })

    return elements
    
  }

  bodyContainer.addNodes(() => {return containerEls()});

  return parentNode.addNodes(() => {return [bodyContainer]})
  
}