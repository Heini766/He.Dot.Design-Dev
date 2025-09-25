
// Tool events - functions that trigger when tool buttons are interacted with

export const toolClickHandle = (target) => {

  const btnContainer = document.getElementById('btnContainer')

  if (!target.classList.contains('active')) {
    btnContainer.childNodes.forEach((node) => {
      node.classList.remove('active')
    })
    target.classList.add('active')
  } else {
    target.classList.remove('active')
  }

}