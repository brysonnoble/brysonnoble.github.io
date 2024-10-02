// particle instantiation

let circleIdCounter = 0;
const circlesList = [];

function createCircle(x, y) {
  const circle = document.createElement('div');
  circle.classList.add('circle');
  
  const circleId = `circle-${circleIdCounter++}`;
  circle.setAttribute('id', circleId);
  
  circle.style.left = `${x - 10}px`;
  circle.style.top = `${y - 10}px`;

  circlesList.push({ id: circleId, x: x, y: y });
  console.log(circlesList);

  circle.addEventListener('click', function(e) {
    e.stopPropagation();
    document.body.removeChild(circle);
    removeCircleFromList(circleId);
  });

  document.body.appendChild(circle);
}

function removeCircleFromList(circleId) {
  const index = circlesList.findIndex(circle => circle.id === circleId);
  if (index !== -1) {
    circlesList.splice(index, 1);
    console.log(circlesList); 
  }
}

function addCircle(id, x, y) {
  createCircle(x, y);

  const exists = circlesList.some(circle => circle.id === id);
  if (!exists) {
    // Add the new circle's details to the list
    circlesList.push({ id: id, x: x, y: y });
    console.log(`Added circle with ID: ${id}`);
  }
}

function removeCircleById(circleId) {
  const circle = document.getElementById(circleId);
  if (circle) {
    document.body.removeChild(circle);
    removeCircleFromList(circleId);
    console.log(`Removed circle with ID: ${circleId}`);
  } else {
    console.log(`Circle with ID: ${circleId} not found.`);
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
  return ((6.67 * (10 ** -11)) * m1 * m2) / (dist ** 2);
}

function Direction (x1, y1, x2, y2) {
  return [(x2 - x1), (y2 - y1)];
}

function Vector2Translate (p, force, direction) {
  console.log(`f = ${force}, d = ${direction} // before: ${p} | after: ${(p + ((direction * force) / 10))}`);
  return (p + ((direction * force) / 10));
}

function Move (id, Tx, Ty) {
  removeCircleById(id);
  addCircle(id, Tx, Ty);
}
