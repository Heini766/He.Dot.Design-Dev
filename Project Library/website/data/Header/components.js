import * as ren from '../../../../Code Library/renderSvg.js';
import * as renHtml from '../../../../Code Library/renderHTML.js';

const renLogo = () => {

  const logoAspect = {x: 100, y: 100};
  const tSize = logoAspect.y * .065;
  const iconSize = tSize * 7.9;

  const shape1 = ren.rect({class: 'mask-shape1', width: `${iconSize}`, height: `${iconSize}`, x: `${-iconSize/2}`, y: `${-iconSize * 1.125}`})
  const mask1 = ren.mask({id: 'mask1', nodes: [shape1.el]})
  const defs = ren.defs({nodes: [mask1.el]})

  const logoText = ren.text({class: 'logo-text', content: 'he.dot.design', style: `font-size: ${tSize}`});
  const imgNode = ren.img({class: 'logo-icon-img', width: `${iconSize}`, height: `${iconSize}`, x: `${-iconSize/2}`, y: `${-iconSize/2}`, href: `./data/Graphics/LogoDesign.png`})

  const el = ren.svg({id: 'logo', viewBox: `${-logoAspect.x/2} ${-logoAspect.y/2} ${logoAspect.x} ${logoAspect.y}`, nodes: [defs, imgNode, logoText]})
  return el
  
}
export const logo = renLogo().el;

export const headerSection = renHtml.section({class: 'header-section', nodes: [logo]})