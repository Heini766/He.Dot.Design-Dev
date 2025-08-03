import { easeOutQuad } from "../../../../Code Library/timingFunctions.js";

export function scaleFade(duration, node) {

  let id, start;
  const animate = () => {
    if (start === undefined) {
      start = performance.now()
    }
    const elapsed = (performance.now() - start)/1000;
    const t = Math.min(elapsed/duration, 1);

    node.style.scale = `${1 + easeOutQuad(t) * .25}`
    node.style.opacity = `${easeOutQuad(1 - t)}`

    if (t < 1) {
      id = requestAnimationFrame(animate)
    } else {
      node.remove()
    }
  }

  id = requestAnimationFrame(animate)
  
}