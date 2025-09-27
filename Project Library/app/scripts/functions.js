// Tool events - functions that trigger when tool buttons are interacted with

export const changeToolStyles = (event, target) => {

  const btnContainer = document.getElementById('btnContainer');

  const targetClassList = target.node.classList;

  if (!targetClassList.contains('active')) {
    btnContainer.childNodes.forEach((node) => {
      node.classList.remove('active')
    })
    targetClassList.add('active')
  } else {
    targetClassList.remove('active')
  } // Changes classes for styling

}