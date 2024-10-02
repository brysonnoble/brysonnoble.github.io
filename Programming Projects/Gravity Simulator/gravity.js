let G = 6.67 * (10 ** -11);
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

document.addEventListener('click', function(event) {
  const controlPanel = document.getElementById('controlPanel');

  const isClickInsideControlPanel = controlPanel.contains(event.target);

  if (!isClickInsideControlPanel) {
    createCircle(event.clientX, event.clientY);
  }
});

function Simulate (circlesList) {
  for (let i = 0; i < circlesList.length; i++) {
    for (let j = i + 1; j < circlesList.length; j++) {
      Move(circlesList[i].id, circlesList[i].x, circlesList[i].y, circlesList[j].id, circlesList[j].x, circlesList[j].y, Force(1, 1, Distance(circlesList[i].x, circlesList[i].y, circlesList[j].x, circlesList[j].y))), Direction(circlesList[i].x, circlesList[i].y, circlesList[j].x, circlesList[j].y));
    }
  }
}

function Distance (x1, y1, x2, y2) {
  return (((x2 - x1) ** 2) + ((y2 - y1) ** 2)) ** 0.5;
}

function Force (m1, m2, dist) {
  return (G * m1 * m2)/(dist ** 2);
}

function Direction (x1, y1, x2, y2) {
  return (Math.atan((x2 - x1) / (y2 - y1))) * (180 / Math.PI);
}

function Move (c1, x1, y1, c2, x2, y2, force, direction) {
  
}
