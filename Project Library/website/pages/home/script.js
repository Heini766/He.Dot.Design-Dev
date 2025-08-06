import * as renHtml from '../../../../Code Library/renderHTML.js';
import { renLogo } from "../../assets/components.js";


const logo = () => {

  const logo = renLogo()
  
  const el = renHtml.a({href: `../website/pages/navigation/index.html`, nodes: [logo.el]})
  return el
}

document.body.appendChild(logo())