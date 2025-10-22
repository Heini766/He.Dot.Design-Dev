import { SVG } from "../../../Code Library OOP/renderSvg.js";

export class PacMan {

  #data = {
    position: [0, 0],
    size: [10, 10],
    scale: 1,
    rotate: 0,
  }

  constructor() {

    const svg = new SVG('g', {id: 'pacMan',transform: `translate(${this.#data.position[0]} ${this.#data.position[1]})`});
    this.node = svg;

    svg.addNodes([
      svg.ren('rect', {id: 'pakManBody', width: this.#data.size[0], height: this.#data.size[1], fill: 'white', x: -this.#data.size[0]/2, y: -this.#data.size[1]/2}),
      svg.ren('g', {id: 'pakManEyes', transform: `translate(0 ${- this.#data.size[0] * .1})`}),
    ]);

    svg.archive.get('pakManEyes').addNodes([
      svg.ren('circle', {id: 'eyeRight', r: this.#data.size[0] * .15, cx: -this.#data.size[0] * .18}),
      svg.ren('circle', {id: 'eyeLeft', r: this.#data.size[0] * .15, cx: this.#data.size[0] * .18})
    ])
  }

  spawn(container, config) {

    container.addNodes(this.node)

    this.setState(config)
  }

  despawn() {
    this.node.node.remove()
  }

  setState(config) {

    if (config && typeof(config) === 'object') {
      for (let key in this.#data) {
        if (config[key]) this.#data[key] = config[key]
      }
    }
    
    const [scale, rotate, translate] = [`scale(${this.#data.scale})`, `rotate(${this.#data.rotate})` ,`translate(${this.#data.position[0]} ${this.#data.position[1]})`]
    this.node.node.setAttribute(`transform`, translate + scale + rotate);
  }
  
}