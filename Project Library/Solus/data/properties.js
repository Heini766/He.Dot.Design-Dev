import { createCustomProp } from "../../../Code Library/functions.js";

export const mainAspect = {x: 400, y: 300};
export const speed = 5;
export const characterSize = 20;

createCustomProp({
  primeColor: 'white',
  secondColor: 'black',
  bgColor: '#1f1f1f',
  strokeWidth: `${characterSize * .1}`,
})