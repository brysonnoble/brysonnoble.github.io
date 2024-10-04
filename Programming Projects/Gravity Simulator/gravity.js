// particle instantiation

let circleIdCounter = 0;
const circlesList = [];

function createCircle (x, y, mass = 1) {
  const circle = document.createElement('div');
  circle.classList.add('circle');
  
  const circleId = `circle-${circleIdCounter++}`;
  circle.setAttribute('id', circleId);
  
  const radius = Math.sqrt(mass) * 10;
  circle.style.width = `${radius * 2}px`;
  circle.style.height = `${radius * 2}px`;

  circle.style.left = `${x - radius}px`;
  circle.style.top = `${y - radius}px`;

  circlesList.push({ id: circleId, x: x, y: y, mass: mass });

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

let nextSim = false;

function Simulate (circlesList) {
  for (let i = 0; i < circlesList.length; i++) {
    for (let j = i + 1; j < circlesList.length; j++) {
      const dist = Distance(circlesList[i].x, circlesList[i].y, circlesList[j].x, circlesList[j].y);

      if (dist < 20) {
        mergeCircles(i, j);
        continue;
      }

      const forceX = Force(circlesList[i].mass, circlesList[j].mass, dist);
      const dirX = Direction(circlesList[i].x, circlesList[i].y, circlesList[j].x, circlesList[j].y)[0];
      const forceY = Force(circlesList[i].mass, circlesList[j].mass, dist);
      const dirY = Direction(circlesList[i].x, circlesList[i].y, circlesList[j].x, circlesList[j].y)[1];

      Move(circlesList[i].id, Vector2Translate(circlesList[i].x, forceX, dirX), Vector2Translate(circlesList[i].y, forceY, dirY));
      Move(circlesList[j].id, Vector2Translate(circlesList[j].x, forceX, -dirX), Vector2Translate(circlesList[j].y, forceY, -dirY));
    }
  }

  if (nextSim) {
    setTimeout(function () {
      Simulate(circlesList);
    }, 1);
  }
}

function Distance (x1, y1, x2, y2) {
  return (((x2 - x1) ** 2) + ((y2 - y1) ** 2)) ** 0.5;
}

function Force (m1, m2, dist) {
  if (Math.abs(dist) < 10) {
    return ((6.67) * m1 * m2) / (10 ** 2);
    // merge
  } else {
    return ((6.67) * m1 * m2) / (dist ** 2);
  }
}

function Direction (x1, y1, x2, y2) {
  return [(x2 - x1), (y2 - y1)];
}

function Vector2Translate (p, force, direction) {
  return (p + ((direction * force)));
}

function Move (id, Tx, Ty) {
  moveCircle(id, Tx, Ty);
}

// toggle loop

function toggleLoop () {
  nextSim = !nextSim;
  const button = document.getElementById('toggle');
  
  if (nextSim) {
    button.value = "STOP";
  } else {
    button.value = "SIMULATE";
  }
}

// merge circles

function mergeCircles (i, j) {
  const circleA = circlesList[i];
  const circleB = circlesList[j];

  const newMass = circleA.mass + circleB.mass;
  const newX = (circleA.x * circleA.mass + circleB.x * circleB.mass) / newMass;
  const newY = (circleA.y * circleA.mass + circleB.y * circleB.mass) / newMass;

  document.body.removeChild(document.getElementById(circleA.id));
  document.body.removeChild(document.getElementById(circleB.id));

  circlesList.splice(j, 1);
  circlesList.splice(i, 1);

  createCircle(newX, newY, newMass);
}
