import { renCharacter } from "./data/character/components.js";
import { renDisplay } from "./data/display/components.js";
import { moveOrigin } from "../../Code Library/functions.js";

const gameDisplay = renDisplay().el;
document.body.appendChild(gameDisplay);

gameDisplay.appendChild(renCharacter().el)

const character = document.getElementById('character');

moveOrigin(character, character.firstChild, {x: .5, y: .25})