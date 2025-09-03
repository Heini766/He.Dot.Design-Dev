export class renUVs {
  uvCords = []
  uvNodes = []
  constructor(data) {
    for (let y = 0; y <= data.y; y+= 1) {
      for (let x = 0; x <= data.x; x+=1) {
        const newCord = {x: x/data.x, y: y/data.y};
        this.uvCords.push(newCord)
      }
    }
  }

  getUVs(callBack) {
    this.uvCords.forEach((cord, index) => {
      const shape = callBack(cord, index);
      if (shape) this.uvNodes.push(shape.node)
    })
  }
  
  getNodes(callBack) {
    this.uvNodes.forEach((el, index) => {
      callBack(el, this.uvCords[index])
    })
  }
}