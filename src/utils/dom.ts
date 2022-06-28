export const clearCanvas = (idList: string[]) => {
  idList.forEach(id => {
    const dom = document.getElementById(id)
    if (dom) {
      dom.innerHTML = ''
    }
  })
}
