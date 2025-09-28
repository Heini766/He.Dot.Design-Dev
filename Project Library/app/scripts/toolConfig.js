import { changeToolStyles, renInspectorContent } from "./functions.js";
import { canvas, display } from "./comps.js";
import { getRelativePosition } from "../../../Code Library OOP/functions.js";

export const pathTool = {
  toolName: 'Path',
  toolFunc: (event, target) => {
    changeToolStyles(event, target);

    const isActive = target.node.classList.contains('active');

    if (!isActive) {
      canvas.removeListenerByEvent('mousedown')
      return // Function stops here when the tool is deselected
    }

    canvas.addListener('mousedown', (event) => {
      const curPos = getRelativePosition(event, canvas.node);
      let pathData = `M${curPos.x} ${curPos.y}`
      
      const newPath = canvas.ren('path', {class: `path-el`, d: pathData});

      canvas.addNodes(() => {return [newPath]});

      return {curPos, pathData, newPath}
    }).and((value) => {

      const data = value.pathData;

      function moveHandle(event) {
        const newCurPos = getRelativePosition(event, canvas.node);
        const newData = data + `L${newCurPos.x} ${newCurPos.y}`;

        value.newPath.node.setAttribute('d', `${newData}`);
      }

      function upHandle() {

        const length  = value.newPath.node.getTotalLength();

        if (length < 5) {
          value.newPath.node.remove()
        } else {

          let isSelected, cleanup;
          value.newPath.addListener('click', (event, target) => {
            if (!isSelected) {
              isSelected = true
              cleanup = renInspectorContent(display.inspectorBar)
            } else {
              cleanup()
              isSelected = false;
            }
            
          })
          
        }

        canvas.listeners.forEach((data) => {
          if (data.event === 'mousedown') return
          canvas.removeListenerByEvent(data.event)
        })
        window.removeEventListener('mouseup', upHandle)

      }
      
      canvas.addListener('mousemove', moveHandle)
      window.addEventListener('mouseup', upHandle)
      
    })
    
  } // Function triggers on mousedown
}
