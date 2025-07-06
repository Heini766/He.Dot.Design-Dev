import { createCustomProp } from "../../../Code Library/functions.js";

export const mainAspect = {x: 400, y: 300};
export const energyBarLength  = mainAspect.x/2;

export const currentEnergy = { value: .1 * Math.random() + .2 }

// character attributes

export const characterSize = 20;
export const speed = 1;
export const costOnMove = .005;

// character attributes

createCustomProp({
  primeColor: 'white',
  secondColor: 'black',
  accentColor: '#f2e111',
  dangerColor: '#e8280e',
  bgColor: '#1f1f1f',
  strokeWidth: `${characterSize * .1}`,
})