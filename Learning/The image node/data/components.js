import * as ren from '../../../Code Library/renderSvg.js';

const size = 100;
const aspect = {x: 2, y: 1}
const dimensions = {x: size * aspect.x, y: size * aspect.y}
const img1 = ren.img({
  class: 'img1',
  href: `https://cdn.pixabay.com/photo/2025/04/14/16/31/animals-9533774_1280.jpg`,
  preserveAspectRatio: `xMidYMid slice`,
  width: dimensions.x,
  height: dimensions.y,
  x: -dimensions.x/2,
  y: -dimensions.y/2
})

const someText = ren.text({
  content: 'Heinrich',
  class: 'some-text'
})

someText.el.innerHTML = 'POWER'
console.log(someText.el.innerHTML)

export const mainDs = ren.svg({class: 'main-display', id: 'mianDisplay', viewBox: `-50 -50 100 100`, nodes: [img1, someText]});