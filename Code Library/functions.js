export function getDistance(pos1, pos2) {
  const dx = pos2.x - pos1.x; // Difference in x-coordinates
  const dy = pos2.y - pos1.y; // Difference in y-coordinates
  const euclideanD = Math.sqrt(dx * dx + dy * dy);  // Euclidean distance
  return {
    euclideanDistance: euclideanD,
    dx: dx,
    dy: dy
  };
}; // Returns the distance between two points

export function getPointAlongPath(element, offset) {
  const pathLength = element.getTotalLength();
  return element.getPointAtLength(offset * pathLength);
};

export function getPointAngle(element, offset) {

  const p1 = getPointAlongPath(element, offset - .005);
  const p2 = getPointAlongPath(element, offset + .005);

  return calcLineAngle(p1, p2);
  
}; // Returns the angle of a point on a curve

export function getPosOnLine(pos1, pos2, offset) {
  const dx = (pos2.x - pos1.x) * offset; // Difference in x-coordinates
  const dy = (pos2.y - pos1.y) * offset; // Difference in y-coordinates
  const offsetX = pos1.x + dx;
  const offsetY = pos1.y + dy;
  return {x: offsetX, y: offsetY};
}; // Returns a position along a line

export function getRelativePosition(event, object) {

  const { x, y, width, height } = object.getBoundingClientRect();
  const [vbX, vbY, vbWidth, vbHeight] = extNumbers(object.getAttribute('viewBox'));
  
  return {
    x: (event.clientX - x) / width * vbWidth + vbX,
    y: (event.clientY - y) / height * vbHeight + vbY
  };

} // Returns the relative position of the cursor to a SVG node object

export function getPositionOffset(pos1, pos2)  {
  return {x: pos1.x - pos2.x, y: pos1.y - pos2.y};
}; // Takes two cordinates and returns the offset

export function getRandomPos(size, ratio) {
  return {
    x: (Math.random() * (ratio.x - 2 * size) + size) - ratio.x / 2,
    y: (Math.random() * (ratio.y - 2 * size) + size) - ratio.y / 2
  };
}
/* Return a random x and y cordinate in side the give ratio
size = The dimensions of the element that spawns in
ratio = The ratio of the shape where the object is spawning in
*/

export function gerRelativeRPos(r, cords) {

  if (!cords) {
    cords = {x: 0, y: 0};
  }
  
  const cordX = Math.random()*r - r/2 + cords.x;
  const cordY = Math.random()*r - r/2 + cords.y;
  const rPos = {x: cordX, y: cordY};
  return rPos
  
}; // Finds a random position around a given position

export function clamp(number, min, max) {
    return Math.min(Math.max(number, min), max);
}; // Clamps the result of a calculation.

export function getRandomResult() {
let bin
const rNum = Math.random();
const onOff = Math.round(rNum);
if (onOff === 1) {
  bin = true;
} else {
  bin = false;
};
return {boolean: bin, rNum: rNum}
}; // Returns a boolean + a random number between 0 and 1 (rNum)

export function createCustomProp(data) {

  const propNames = Object.keys(data);
  const propValues = Object.values(data);
  let i = 0;

  propNames.forEach((element) => {
    document.documentElement.style.setProperty(`--${element}`, `${propValues[i]}`);
    i += 1;
  })

  return data
  
}; // Can be used to create css custom properties.

export function getRadPoints(offset, length, cords) {

  const angleRad = offset * 2 * Math.PI;
  const angleDeg = angleRad * (180/Math.PI);

  const cordX = length * Math.cos(angleRad);
  const cordY = length * Math.sin(angleRad);

  if (cords) {
    return {x: cordX + cords.x, y: cordY + cords.y, angleRad: angleRad, angleDeg: angleDeg}
  } else {
    return {x: cordX, y: cordY, angleRad: angleRad, angleDeg: angleDeg}
  };
  
}; // Calculates the cords along the edge of a circle

export function calcControlePoints(pos1, pos2, range, lengthFactor) {
  
  const rNums = {point1: Math.random(), point2: Math.random()}
  
  const lineLength = getDistance(pos1, pos2);
  const conPointsLenght = lineLength * lengthFactor;
  const lineAngle = {startPos: calcLineAngle(pos1, pos2).deg/360, endPos: calcLineAngle(pos2, pos1).deg/360};
  const conAngle = {
    startConAngle: (rNums.point1 * range) + (lineAngle.startPos - range/2),
    endConAngle: (rNums.point2 * range) + (lineAngle.endPos - range/2)
  };
  return {
    conPoint1: getRadPoints(conAngle.startConAngle, conPointsLenght, pos1),
    conPoint2: getRadPoints(conAngle.endConAngle, conPointsLenght, pos2),
  };
  
}; // Generates two controle points based of given parameters

export function calcLineAngle(point1, point2) {
  const deltaX = point2.x - point1.x;
  const deltaY = point2.y - point1.y;

  const angleRadians =  Math.atan2(deltaY, deltaX);
  const angleDegrees = angleRadians * (180 / Math.PI);
  const normalisedAngle  = (angleDegrees + 360) % 360;

  return {rad: angleRadians, deg: angleDegrees, degNor: normalisedAngle};
}; // Returns the angle (radians, degrees, normalised degrees) based on two points. 

export function extNumbers(string) {
  if (typeof string !== 'string') return []; // Handle non-string input
  const nums = string.match(/-?\d+\.?\d*/g)?.map(Number) || [];
  return nums.filter(n => !isNaN(n)); // Remove NaN entries (invalid numbers)
}; // Returns an array containing the numbers in a string

export function getTagElements(container, tagName) {

  const nodes = container.childNodes;
  let elements = [];
  nodes.forEach((element) => {

    if (element.localName === tagName) {
      elements.push(element);
    }
    
  });

  return elements
  
}; // Returns the node elements (in the form of an array) in a container which has a specified tag name

export function getClassElements(array, classId) {

  let elements = [];
  
  array.forEach((element) => {

    const currentEl = element
    const classes = currentEl.classList;

    classes.forEach((el) => {
      if (el === classId) {
        elements.push(currentEl);
      }
    })
    
  });

  return elements;
  
}; // Takes an array of nodes and return those who has the specified class name

export function checkOverlap(container, shape, size, name) {

  const shapeAtt = shape.getAttribute('transform');
  const shapeTransform = extNumbers(shapeAtt);
  const shapePos = {x: shapeTransform[0], y: shapeTransform[1]};

  const allObjects = container.childNodes;
  let relativeShapes = [];
  let overlappingObjects;

  for (let i = 0; i < allObjects.length; i++) {

    const currentObject = allObjects[i];
    const curShapeAtt = currentObject.getAttribute('transform');
    if (!curShapeAtt) {

    } else {
      const curShapeTransform = extNumbers(curShapeAtt);
      const relShapePos = {x: curShapeTransform[0], y: curShapeTransform[1]};
      const shapeTest = (relShapePos.x/shapePos.x)/(relShapePos.y/shapePos.y);

      if (shapeTest === 1) {
      } else {
        relativeShapes.push(currentObject);
      };
    }
  } // Filters the array

  for (let i = 0; i < relativeShapes.length; i++) {

    const currentObject = relativeShapes[i];
    const curShapeAtt = currentObject.getAttribute('transform');
    const curShapeTransform = extNumbers(curShapeAtt);
    const currentObjectPos = {x: curShapeTransform[0], y: curShapeTransform[1]};
    const positionOffset = getDistance(currentObjectPos, shapePos);

    if (positionOffset < size && currentObject.classList.contains(name)) {
      overlappingObjects = {ob1: shape, ob2: currentObject};
      i = relativeShapes.length;
    };
  }; // Finds overlapping objects

  return overlappingObjects
  
}; // Returns an array containing two shapes that overlap. size - needs to be a number not a string. name - specify a class name

export function triangularWave(x) {
    return x < 0.5 ? 2 * x : 2 * (1 - x);
}

export function moveOrigin(parentNode, baseNode, offset) {

  const [currentShiftX, currentShiftY] = parentNode.getAttribute('originShift') ? extNumbers(parentNode.getAttribute('originShift')) : [0, 0];

  const {width, height} = baseNode.getBBox();
  const {offsetX, offsetY} = {offsetX: width * offset.x, offsetY: height * offset.y}

  parentNode.firstChild.setAttribute('transform', `translate(${-offsetX} ${-offsetY})`);
  
  const [parentPosX, parentPosY] = parentNode.getAttribute('transform') ? extNumbers(parentNode.getAttribute('transform')) : [0, 0];

  parentNode.setAttribute('transform', `translate(${parentPosX + offsetX - currentShiftX * width} ${parentPosY + offsetY - currentShiftY * height})`)
  parentNode.setAttribute('originShift', `${offset.x} ${offset.y}`)
} // parentNode = The group node that contains the entire entity
  // baseNode = Is used to determine the base dimensions in calculating the transforms
  // offset = an object that has x and y values determaning the origin offset

  export function searchNodes(nodeArray, shapeID) {

    let shape;
    nodeArray.forEach((el) => {
      if (el.getAttribute('id') === `${shapeID}`) {
        shape = el;
      }
    })

    return shape ? shape : `'${shapeID}' not found`
    
  }
