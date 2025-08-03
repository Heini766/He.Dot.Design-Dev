import * as ren from '../../../../Code Library/renderSvg.js';
import * as renHtml from '../../../../Code Library/renderHTML.js';
import { getRelativePosition } from '../../../../Code Library/functions.js';

const renLogo = () => {

  const logoAspect = {x: 100, y: 100};


  
  const el = ren.svg({id: 'logo', viewBox: `${-logoAspect.x/2} ${-logoAspect.y/2} ${logoAspect.x} ${logoAspect.y}`, nodes: []})
  return el.el
  
}
export const logo = renLogo();


export const headerSection = renHtml.section({class: 'header-section', nodes: [logo]})