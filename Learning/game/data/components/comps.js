import * as ren from '../../../../Code Library/renderSvg.js';
import { extNumbers, clamp } from '../../../../Code Library/functions.js';
import { dsAspect } from '../display/compsDisplay.js';

let maxMinSpeed = {max: 3, min: 1}

function addSpeed() {
  const node = document.getElementById('speedValue')
  const speed = extNumbers(node.innerHTML)[0];
  const newSpeed = clamp(speed + 1, maxMinSpeed.min, maxMinSpeed.max)

  node.innerHTML = `${newSpeed}`

  if (newSpeed >= maxMinSpeed.max) {
    document.getElementById('addBtn').style.display = 'none';
  }
  if (newSpeed > maxMinSpeed.min) {
    document.getElementById('subtractBtn').style.display = 'block';
  }
  
}

function reduceSpeed() {
  const node = document.getElementById('speedValue')
  const speed = extNumbers(node.innerHTML)[0];
  const newSpeed = clamp(speed - 1, maxMinSpeed.min, maxMinSpeed.max);

  node.innerHTML = `${newSpeed}`

  if (newSpeed <= maxMinSpeed.min) {
    document.getElementById('subtractBtn').style.display = 'none';
  }
  if (newSpeed <= maxMinSpeed.max) {
    document.getElementById('addBtn').style.display = 'block';
  }
}

export function renBtns() {

  const btnSize = 4;
  
  const base = ren.circle({class: 'btn-base', r: btnSize})
  const marker = ren.path({class: 'btns-marker', d: `M${-btnSize*.55} 0 ${btnSize*.55} 0`})

  const renPlus = () => {

    const [markX, markY] = [marker.el.cloneNode(), marker.el.cloneNode()]
    markY.setAttribute('transform', `rotate(90)`)
    
    return ren.group({id: 'plus', nodes: [markX, markY]})
  }
  
  const elSubtract = ren.group({id: 'subtractBtn', class: 'btn', nodes: [base.el.cloneNode(), marker.el.cloneNode()]}).el
  elSubtract.setAttribute('transform', `translate(0 ${btnSize*2.5})`)
  elSubtract.addEventListener('click', reduceSpeed)

  const elAdd = ren.group({id: 'addBtn', class: 'btn', nodes: [base.el.cloneNode(), renPlus().el]}).el
  elAdd.setAttribute('transform', `translate(0 ${-btnSize*2.5})`)
  elAdd.addEventListener('click', addSpeed)
  return [elSubtract, elAdd]
  
}

export function renTitles() {

  const speedTitle = ren.text({class: 'title', content: 'Speed'});
  const value = ren.text({class: 'title value', id: 'speedValue', content: '1'})
  speedTitle.el.setAttribute('transform', `translate(0 ${dsAspect.y*.45})`)
  return [speedTitle, value]
  
}