import * as renHtml from '../../Code Library/renderHTML.js'
import { createCustomProp } from "../../Code Library/functions.js";
import { renLogo } from "./data/Landing Page/components.js"

createCustomProp({
  brandColor: `#2DCCD3`
})

export const headerSection = renHtml.section({id: 'mainSection'})

document.body.appendChild(headerSection)

renLogo()