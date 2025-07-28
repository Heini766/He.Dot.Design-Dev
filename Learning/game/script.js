import { renCharacter } from "./data/character/compsCharacter.js";
import { renDisplay, renStats, spacing } from "./data/display/compsDisplay.js";
import { moveOrigin } from "../../Code Library/functions.js";
import { renBtns, renTitles } from "./data/components/comps.js";

const displays = [renDisplay().el, renStats().el];
displays.forEach((el) => {
  document.body.appendChild(el)
})

displays[0].appendChild(renCharacter(spacing).el)

renBtns().forEach((el) => {
  displays[1].appendChild(el)
})
renTitles().forEach((el) => {
  displays[1].appendChild(el.el)
})

const character = document.getElementById('character')

moveOrigin(character, document.getElementById('characterBase'), {x: 0.5, y: 0.5})