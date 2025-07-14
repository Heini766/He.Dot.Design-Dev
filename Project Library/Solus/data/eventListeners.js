import * as func from '../../../Code Library/functions.js'
import { mainAspect } from './properties.js';
import { animateBodyOnAim } from './animation.js';

export function addControllerMoveHandler(node, display, mainAspect, targetNode) {

  const onMouseDown = (event) => {

    const cursorRelPos = func.getRelativePosition(event, display);
    const targetNodeSize = targetNode.getBBox();
    const [x, y, scale] = func.extNumbers(targetNode.getAttribute('transform'));
    const offset = func.getPositionOffset(cursorRelPos, {x, y});

    const onMouseMove = (event) => {

      const {x: relX, y: relY} = func.getRelativePosition(event, display);
      const newX = func.clamp(
        relX - offset.x, 
        -mainAspect.x/2 + targetNodeSize.width*.25, 
        mainAspect.x/2 - targetNodeSize.width*.6
      );
      const newY = func.clamp(
        relY - offset.y,
        -mainAspect.y + targetNodeSize.height * 1.25,
        -targetNodeSize.height/2
      );
      targetNode.setAttribute('transform', `translate(${newX} ${newY}) scale(${scale})`);

    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  node.addEventListener('mousedown', onMouseDown);

}

export function addAimHandler(display, targetNode, parent) {

  const onMouseDown = () => {

    const { getRelativePosition, calcLineAngle, clamp, getDistance, getRadPoints, extNumbers } = func;
    const maxDistance = mainAspect.y * .2;

    const [parentX, parentY] = extNumbers(parent.getAttribute('transform'))
    const [targetX, targetY] = extNumbers(targetNode.getAttribute('transform'))

    const directionCheck = checkDirection(document.getElementById('character-body'))

    const onMouseMove = (event) => {

      const curRelPos = getRelativePosition(event, display);
      const { degNor } = calcLineAngle(curRelPos, {x: parentX, y: parentY})
      const distance = clamp(getDistance(curRelPos, {x: parentX, y: parentY}).euclideanDistance, 0, maxDistance)
      const { x, y } = getRadPoints(degNor/360, distance)
      const norTrans = distance/maxDistance

      const transform = `translate(${-x + targetX} ${Math.max(-y + targetY, targetY)}) scale(${1 - norTrans * .25}) rotate(${norTrans * 45})`
      targetNode.setAttribute('transform', transform)

      animateBodyOnAim(x/distance, directionCheck)
      
    }

    const onMouseUp = () => {
      targetNode.setAttribute('transform', `translate(${targetX} ${targetY})`)
      window.removeEventListener('mousemove', onMouseMove)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

  }

  targetNode.addEventListener('mousedown', onMouseDown)
  
}

function checkDirection(node) {

  const extTrans = func.extNumbers(node.getAttribute('transform'))
  return extTrans[extTrans.length-2] >= 0
  
}

window.addEventListener('graphicsRendered', () => {

  const moveController = document.getElementById('aimMoveController');
  const mainDs = document.getElementById('mainDisplay')
  const aimController = document.getElementById('aimController')
  const aimToggle = document.getElementById('aimToggle')

  moveController.addEventListener('mousedown', addControllerMoveHandler(moveController, mainDs, mainAspect, aimController))
  aimToggle.addEventListener('mousedown', addAimHandler(mainDs, aimToggle, aimController))
  
}) // triggers only once all the component elements have rendered.