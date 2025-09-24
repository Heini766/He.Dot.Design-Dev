import { HTML } from '../../../Code Library OOP/renderHTML.js';
import { SVG } from 'https://cdn.jsdelivr.net/gh/Heini766/He.Dot.Design-Dev@refs/heads/App/Code%20Library%20OOP/renderSvg.js';

const display = new HTML('div', {id: 'uiContainer', class: 'ui-container'});
const canvas = new SVG({viewBox: `0 0 100 100`, class: 'canvas'});

const tools = ['Path', 'Rectangle']

display.createListener({event: 'click', func: () => {
  console.log('Nice Stuff!!')
}});

display.removeListener(1)

document.getElementById('mainSection').appendChild(display.node);

display.addNodes(() => {

  const toolBar = display.ren('div', {id: 'toolBar', class: 'tool-bar'});
  const btnContainer = display.ren('div', {id: 'btnContainer', class: 'btn-container'});
  const toolBtns = [];
  tools.forEach((tool, i) => {
    toolBtns.push(display.ren('button', {class: 'tool-btn', id: `toolBtn${i}`, content: `${tool}`}))
  })

  btnContainer.addNodes(() => {return toolBtns})
  toolBar.addNodes(() => {
    const toolFooter = display.ren('footer', {id: 'toolFooter', class: 'tool-footer'});
    toolFooter.addNodes(() => {
      const runBtn = display.ren('button', {id: 'runBtn', class: 'run-btn', content: 'Run'});
      runBtn.createListener({event: 'click', func: () => {console.log('btn clicked')}})
      return [runBtn]
    })
    
    return [btnContainer, toolFooter]
  })
  

  return [toolBar, canvas]
  
})