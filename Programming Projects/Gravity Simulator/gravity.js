let circleIdCounter = 0;
let circlesList = [];
let nextSim = false;

function createCircle(x, y, mass = 1) {
  const circle = document.createElement('div');
  circle.classList.add('circle');
  
  const circleId = `circle-${circleIdCounter++}`;
  circle.setAttribute('id', circleId);
  
  circle.style.left = `${x - 10}px`;
  circle.style.top = `${y - 10}px`;

  // Add mass display
  circle.innerHTML = `<span class="mass-display">${mass}</span>`;

  circlesList.push({ id: circleId, x: x, y: y, mass: mass });

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
  }
}

function moveCircle(circleId, newX, newY) {
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

function Simulate() {
  if (!nextSim) return; // Stop simulation if nextSim is false

  for (let i = 0; i < circlesList.length; i++) {
    for (let j = i + 1; j < circlesList.length; j++) {
      const dist = Distance(circlesList[i].x, circlesList[i].y, circlesList[j].x, circlesList[j].y);
      
      if (dist < 10) {  // merge threshold
        mergeCircles(i, j);
        break;  // Exit loop after merging
      } else {
        Move(circlesList[i].id, Vector2Translate(circlesList[i].x, Force(1, 1, dist), Direction(circlesList[i].x, circlesList[i].y, circlesList[j].x, circlesList[j].y)[0]),
          Vector2Translate(circlesList[i].y, Force(1, 1, dist), Direction(circlesList[i].x, circlesList[i].y, circlesList[j].x, circlesList[j].y)[1])
        );
        Move(circlesList[j].id, Vector2Translate(circlesList[j].x, Force(1, 1, dist), Direction(circlesList[j].x, circlesList[j].y, circlesList[i].x, circlesList[i].y)[0]),
          Vector2Translate(circlesList[j].y, Force(1, 1, dist), Direction(circlesList[j].x, circlesList[j].y, circlesList[i].x, circlesList[i].y)[1])
        );
      }
    }
  }

  // Keep the loop going
  setTimeout(Simulate, 16); // Roughly 60 FPS
}

function mergeCircles(index1, index2) {
  const circle1 = circlesList[index1];
  const circle2 = circlesList[index2];
  
  // Calculate new mass and position (center of mass)
  const newMass = circle1.mass + circle2.mass;
  const newX = (circle1.x * circle1.mass + circle2.x * circle2.mass) / newMass;
  const newY = (circle1.y * circle1.mass + circle2.y * circle2.mass) / newMass;
  
  // Remove the old circles
  removeCircle(circle1.id);
  removeCircle(circle2.id);
  
  // Create the new merged circle
  createCircle(newX, newY, newMass);
}

function removeCircle(circleId) {
  const circle = document.getElementById(circleId);
  if (circle) {
    document.body.removeChild(circle);
    removeCircleFromList(circleId);
  }
}

// Helper functions (same as before)

function Distance(x1, y1, x2, y2) {
  return Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2));
}

function Force(m1, m2, dist) {
  return ((6.67) * m1 * m2) / (dist ** 2);
}

function Direction(x1, y1, x2, y2) {
  return [(x2 - x1), (y2 - y1)];
}

function Vector2Translate(p, force, direction) {
  return (p + (direction * force));
}

function Move(id, Tx, Ty) {
  moveCircle(id, Tx, Ty);
}

// toggle loop

function toggleLoop() {
  nextSim = !nextSim;
  const button = document.getElementById('toggle');
  
  if (nextSim) {
    button.value = "STOP";
    Simulate(); // Start simulation
  } else {
    button.value = "SIMULATE";
  }
}
