import { SVG } from "../../../Code Library OOP/renderSvg.js";
import { HTML } from "../../../Code Library OOP/renderHTML.js";

const aspect = {x: 100, y: 100}

export const navMenu = new HTML('nav', {id: 'navigation', class: 'nav-menu'});

navMenu.addNodes(() => {

  const btns = ['Chapter 1', 'Chapter 2', 'Chapter 3']
  let navBtns = []
  
  btns.forEach((el, i) => {
    const newAnchor = navMenu.ren('a', {class: 'nav-anchor', id: `navA${i + 1}`, href: `https://www.youtube.com/watch?v=h84fYAsvsco&list=RDMM&index=3`});
    newAnchor.addNodes(() => {
      return [navMenu.ren('h2', {id: `navTitle${i + 1}`, class: 'nav-title', content: `${el}`})]
    })
    navBtns.push(newAnchor)
  })

  return navBtns
  
})