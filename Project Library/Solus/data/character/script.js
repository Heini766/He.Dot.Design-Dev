import { moveOrigin } from '../../../../Code Library/functions.js'
import { mainDs, renCharacter } from './data/components.js'

mainDs.el.appendChild(renCharacter(20).el)

document.body.appendChild(mainDs.el)

moveOrigin(document.getElementById('characterSolus'), {x: .5, y: .5})