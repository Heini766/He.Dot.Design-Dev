import { SVG } from "../../../Code Library OOP/renderSvg.js";

export class PacMan {

  #data = {
    position: [0, 0],
    size: [10, 10],
    scale: 1,
    rotate: 0,
  }

  constructor() {

    const svg = new SVG('g', {id: 'pacMan'});
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

    const node = this.node.node;
    const changedProps = new Set();

    if (config && typeof config === 'object') {
      for (const key in config) {
        if (this.#data[key] !== config[key]) {
          this.#data[key] = config[key];
          changedProps.add(key);
        }
      }
    }

    // Only update the transforms that actually changed
    if (changedProps.has('position')) {
      node.style.translate = `${this.#data.position[0]}px ${this.#data.position[1]}px`;
    }
    if (changedProps.has('scale')) {
      node.style.scale = this.#data.scale;
    }
    if (changedProps.has('rotate')) {
      node.style.rotate = `${this.#data.rotate}deg`;
    }
  }
  
}