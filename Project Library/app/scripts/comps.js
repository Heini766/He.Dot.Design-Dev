import { getRelativePosition } from '../../../Code Library OOP/functions.js';
import { HTML } from '../../../Code Library OOP/renderHTML.js';
import { SVG } from '../../../Code Library OOP/renderSvg.js';
import { changeToolStyles } from './functions.js';

const docHTML = new HTML();
const canvas = new SVG({viewBox: `0 0 100 100`, class: 'canvas', id: 'canvas'});
const display = docHTML.ren('div', {id: 'uiContainer', class: 'ui-container'});

const tools = [{
  toolName: 'Path',
  toolFunc: (event, target) => {
    changeToolStyles(event, target);

    const isActive = target.node.classList.contains('active');

    if (!isActive) {
      // when buttons isn't active
      canvas.removeListenerByEvent('mousedown')
      return
    }

    canvas.addListener('mousedown', (event) => {
      const curPos = getRelativePosition(event, canvas.node);
      let pathData = `M${curPos.x} ${curPos.y}`
      
      const newPath = canvas.ren('path', {class: `path-el`, d: pathData});

      canvas.addNodes(() => {return [newPath]});

      return {curPos, pathData, newPath}
    }).and((value) => {

      const data = value.pathData;

      function moveHandle(event) {
        const newCurPos = getRelativePosition(event, canvas.node);
        const newData = data + `L${newCurPos.x} ${newCurPos.y}`;

        value.newPath.node.setAttribute('d', `${newData}`);
      }

      function upHandle() {

        canvas.listeners.forEach((data) => {
          if (data.event === 'mousedown') return
          canvas.removeListenerByEvent(data.event)
        })
        
      }
      
      canvas.addListener('mousemove', moveHandle)
      canvas.addListener('mouseup', upHandle)
      
    })
    
  }
}]

document.getElementById('mainSection').appendChild(display.node);

display.addNodes(() => {

  const toolBar = docHTML.ren('div', {id: 'toolBar', class: 'tool-bar'});
  const btnContainer = docHTML.ren('div', {id: 'btnContainer', class: 'btn-container'});
  const toolBtns = [];

  tools.forEach((tool, i) => {
    const newTool = docHTML.ren('button', {class: 'tool-btn', id: `toolBtn${tool.toolName}`, content: `${tool.toolName}`});
    newTool.addListener('mousedown', tool.toolFunc)
    
    toolBtns.push(newTool)
  })

  btnContainer.addNodes(() => {return toolBtns})
  toolBar.addNodes(() => {
    const toolFooter = docHTML.ren('footer', {id: 'toolFooter', class: 'tool-footer'});
    toolFooter.addNodes(() => {
      const runBtn = docHTML.ren('button', {id: 'runBtn', class: 'run-btn', content: 'run'});
      return [runBtn]
    })
    
    return [btnContainer, toolFooter]
  })
  

  return [toolBar, canvas]
  
})