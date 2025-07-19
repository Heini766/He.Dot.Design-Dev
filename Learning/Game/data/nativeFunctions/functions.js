import * as func from '../../../../Code Library/functions.js';
import { baseSize, indicatorSize } from '../character/data/components.js';

export function turn(originShift) {

  const character = document.getElementById('character')
  const characterBody = document.getElementById('characterBody')
  const indicator = document.getElementById('indicator')

  const indicatorNewPos = {x: baseSize * (0.25 + 0.5 * originShift.x) - indicatorSize / 2, y: baseSize * (0.25 + 0.5 * originShift.y) - indicatorSize / 2}
  indicator.setAttribute('transform', `translate(${indicatorNewPos.x} ${indicatorNewPos.y})`)

  func.moveOrigin(character, characterBody, originShift)
  
}