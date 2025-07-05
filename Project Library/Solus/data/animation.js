import * as func from '../../../Code Library/functions.js';
import * as time from '../../../Code Library/timingFunctions.js';
import { mainAspect } from './properties.js';

export function animateMove(node, duration, distance, direction) {

  let start, id;
  const [scaleX, scaleY, posX, posY] = func.extNumbers(node.getAttribute('transform'))

  function animate() {

    if ( start === undefined) {
      start = performance.now()
    }
    const elapsed = (performance.now() - start)/1000;
    const t = time.easeInOutQuad(Math.min(elapsed/duration, 1));

    const newPosX = func.clamp(posX - t * distance * direction, -mainAspect.x/2 + node.getBBox().width, mainAspect.x/2 - node.getBBox().width)
    
    node.setAttribute('transform', `scale(${scaleX} ${scaleY}) translate(${newPosX} ${posY})`)
    const stretchX = 1 + ( func.triangularWave(t) * distance * .005);
    const stretchY = 1/stretchX
    node.firstChild.style.scale = `${stretchX} ${stretchY}`;

    if (t < 1) {
      id = requestAnimationFrame(animate)
    }
    
  }

  id = requestAnimationFrame(animate)
  
}