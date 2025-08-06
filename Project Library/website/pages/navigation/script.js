import * as renHtml from '../../../../Code Library/renderHTML.js'
import { renNavBtn } from "../../assets/components.js";

const navs = ['about', 'work', 'contact'];

const renNavBar = () => {

  let btns = []
  navs.forEach((el, index) => {
    const newBtn = renNavBtn({numId: `${index}`, btnContent: `${el}`})
    btns.push(newBtn)
  })

  return renHtml.div({class: 'nav-container', nodes: btns})
  
}

document.body.appendChild(renNavBar())