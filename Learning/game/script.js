import { renCharacter } from "./data/character/compsCharacter.js";
import { renDisplay, spacing } from "./data/display/compsDisplay.js";
import { moveOrigin, newMoveOrigin } from "../../Code Library/functions.js";

const gameDisplay = renDisplay().el;
document.body.appendChild(gameDisplay);

gameDisplay.appendChild(renCharacter(spacing).el)

const character = document.getElementById('character');

newMoveOrigin(character, document.getElementById('characterBase'), {x: .5, y: .5})