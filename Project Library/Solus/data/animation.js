import * as func from '../../../Code Library/functions.js';
import * as time from '../../../Code Library/timingFunctions.js';

export function animateMove(node, duration, distance, direction) {

  let start, id;
  const [scaleX, scaleY, posX, posY] = func.extNumbers(node.getAttribute('transform'))
  console.log(posX, posY)

  function animate() {

    if ( start === undefined) {
      start = performance.now()
    }
    const elapsed = (performance.now() - start)/1000;
    const t = time.easeInOutQuad(Math.min(elapsed/duration, 1));
    
    node.setAttribute('transform', `scale(${scaleX} ${scaleY}) translate(${posX - t * distance * direction} ${posY})`)
    const stretchX = 1 + ( func.triangularWave(t) * distance * .01);
    const stretchY = 1/stretchX
    node.firstChild.style.scale = `${stretchX} ${stretchY}`;

    if (t < 1) {
      id = requestAnimationFrame(animate)
    }
    
  }

  id = requestAnimationFrame(animate)
  
}