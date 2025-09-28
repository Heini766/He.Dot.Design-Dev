import { getDistance, getRelativePosition } from '../../../Code Library OOP/functions.js';
import { HTML } from '../../../Code Library OOP/renderHTML.js';
import { SVG } from '../../../Code Library OOP/renderSvg.js';
import { changeToolStyles, renInspectorContent } from './functions.js';
import { pathTool } from './toolConfig.js';

const docHTML = new HTML();
const canvas = new SVG({viewBox: `0 0 100 100`, class: 'canvas', id: 'canvas'});
const display = docHTML.ren('div', {id: 'uiContainer', class: 'ui-container'});

const tools = [ pathTool ]

document.getElementById('mainSection').appendChild(display.node);

display.addNodes(() => {

  const toolBar = docHTML.ren('div', {id: 'toolBar', class: 'tool-bar bar'});
  const inspector = docHTML.ren('div', {id: 'inspectorBar', class: 'inspector'});
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
  

  return [toolBar, canvas, inspector]
  
})