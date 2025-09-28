import { changeToolStyles } from "./functions.js";

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

          value.newPath.addListener('click', (event, target) => {
            console.log(target.node)
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