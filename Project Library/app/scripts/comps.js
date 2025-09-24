import { HTML } from '../../../Code Library OOP/renderHTML.js';
import { SVG } from '../../../Code Library OOP/renderSvg.js';
import { toolClickHandle } from './functions.js';

const display = new HTML('div', {id: 'uiContainer', class: 'ui-container'});
const canvas = new SVG({viewBox: `0 0 100 100`, class: 'canvas'});

const tools = ['Path', 'Rectangle', 'Circle']

document.getElementById('mainSection').appendChild(display.node);

display.addNodes(() => {

  const toolBar = display.ren('div', {id: 'toolBar', class: 'tool-bar'});
  const btnContainer = display.ren('div', {id: 'btnContainer', class: 'btn-container'});
  const toolBtns = [];
  tools.forEach((tool, i) => {
    const newTool = display.ren('button', {class: 'tool-btn', id: `toolBtn${i}`, content: `${tool}`});
    newTool.addListener({event: 'click', func: toolClickHandle})
    
    toolBtns.push(newTool)
  })

  btnContainer.addNodes(() => {return toolBtns})
  toolBar.addNodes(() => {
    const toolFooter = display.ren('footer', {id: 'toolFooter', class: 'tool-footer'});
    toolFooter.addNodes(() => {
      const runBtn = display.ren('button', {id: 'runBtn', class: 'run-btn', content: 'run'});
      return [runBtn]
    })
    
    return [btnContainer, toolFooter]
  })
  

  return [toolBar, canvas]
  
})