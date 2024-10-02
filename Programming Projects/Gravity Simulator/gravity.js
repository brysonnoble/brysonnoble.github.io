// particle instantiation

let circleIdCounter = 0;
const circlesList = [];

function createCircle (x, y) {
  const circle = document.createElement('div');
  circle.classList.add('circle');
  
  const circleId = `circle-${circleIdCounter++}`;
  circle.setAttribute('id', circleId);
  
  circle.style.left = `${x - 10}px`;
  circle.style.top = `${y - 10}px`;

  circlesList.push({ id: circleId, x: x, y: y });

  circle.addEventListener('click', function(e) {
    e.stopPropagation();
    document.body.removeChild(circle);
    removeCircleFromList(circleId);
  });

  document.body.appendChild(circle);
}

function removeCircleFromList (circleId) {
  const index = circlesList.findIndex(circle => circle.id === circleId);
  if (index !== -1) {
    circlesList.splice(index, 1);
    console.log(circlesList);
  }
}

function moveCircle (circleId, newX, newY) {
  const circle = document.getElementById(circleId);
  const circleData = circlesList.find(circle => circle.id === circleId);
  
  if (circle && circleData) {
    circle.style.left = `${newX - 10}px`;
    circle.style.top = `${newY - 10}px`;

    circleData.x = newX;
    circleData.y = newY;
  }
}

document.addEventListener('click', function(event) {
  const controlPanel = document.getElementById('controlPanel');

  const isClickInsideControlPanel = controlPanel.contains(event.target);

  if (!isClickInsideControlPanel) {
    createCircle(event.clientX, event.clientY);
  }
});

// simulation (initially had these in different scripts but i did NOT feel like dealing with that)

function Simulate (circlesList) {
  for (let i = 0; i < circlesList.length; i++) {
    for (let j = i + 1; j < circlesList.length; j++) {      
      Move(
        circlesList[i].id, 
        Vector2Translate(circlesList[i].x, Force(1, 1, Distance(circlesList[i].x, circlesList[i].y, circlesList[j].x, circlesList[j].y)), Direction(circlesList[i].x, circlesList[i].y, circlesList[j].x, circlesList[j].y)[0]),
        Vector2Translate(circlesList[i].y, Force(1, 1, Distance(circlesList[i].x, circlesList[i].y, circlesList[j].x, circlesList[j].y)), Direction(circlesList[i].x, circlesList[i].y, circlesList[j].x, circlesList[j].y)[1])
      );
      Move(
        circlesList[j].id, 
        Vector2Translate(circlesList[j].x, Force(1, 1, Distance(circlesList[i].x, circlesList[i].y, circlesList[j].x, circlesList[j].y)), Direction(circlesList[j].x, circlesList[j].y, circlesList[i].x, circlesList[i].y)[0]),
        Vector2Translate(circlesList[j].y, Force(1, 1, Distance(circlesList[i].x, circlesList[i].y, circlesList[j].x, circlesList[j].y)), Direction(circlesList[j].x, circlesList[j].y, circlesList[i].x, circlesList[i].y)[1])
      );
    }
  }
}

function Distance (x1, y1, x2, y2) {
  return (((x2 - x1) ** 2) + ((y2 - y1) ** 2)) ** 0.5;
}

function Force (m1, m2, dist) {
  const MIN_DIST = 10;
  if (dist < MIN_DIST) dist = MIN_DIST;
  return ((1000) * m1 * m2) / (dist ** 2);
}

function Direction (x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const magnitude = Math.sqrt(dx * dx + dy * dy);
  return [dx / magnitude, dy / magnitude];
}

function Vector2Translate (p, force, direction) {
  console.log(`f = ${force}, d = ${direction} // before: ${p} | after: ${(p + ((direction * force) / 10))}`);
  return (p + ((direction * force)));
}

function Move (id, Tx, Ty) {
  moveCircle(id, Tx, Ty);
}
