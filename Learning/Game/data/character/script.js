import * as func from '../../../../Code Library/functions.js';
import { baseSize, indicatorSize } from './data/components.js';

import { mainDs } from './data/components.js';
document.body.appendChild(mainDs.el)

// DOM

//const character = document.getElementById('character')

// DOM

function turn(originShift) {

  const character = document.getElementById('character')
  const characterBody = document.getElementById('characterBody')
  const indicator = document.getElementById('indicator')

  func.moveOrigin(character, characterBody, originShift)

  const indicatorNewPos = {x: baseSize * (0.25 + 0.5 * originShift.x) - indicatorSize / 2, y: baseSize * (0.25 + 0.5 * originShift.y) - indicatorSize / 2}
  indicator.setAttribute('transform', `translate(${indicatorNewPos.x} ${indicatorNewPos.y})`)
  
}

turn({x: .5, y: .5})