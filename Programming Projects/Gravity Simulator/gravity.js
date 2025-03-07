// get G

let G = 6.67;

const slider = document.getElementById("gSlider");
const output = document.getElementById("gValue");

function handleSliderChange() {
  output.textContent = slider.value;
  G = slider.value;
}

slider.addEventListener("input", handleSliderChange);

// instantiate particles

let circleIdCounter = 0;
let circlesList = [];
let nextSim = false;

function createCircle (x, y, mass = 1) {
  const circle = document.createElement('div');
  circle.classList.add('circle');
  
  const circleId = `circle-${circleIdCounter++}`;
  circle.setAttribute('id', circleId);
  
  circle.style.left = `${x - 10}px`;
  circle.style.top = `${y - 10}px`;

  circle.innerHTML = `<span class="mass-display">${mass}</span>`;

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

function Simulate () {
  if (!nextSim) return;

  for (let i = 0; i < circlesList.length; i++) {
    for (let j = i + 1; j < circlesList.length; j++) {
      const dist = Distance(circlesList[i].x, circlesList[i].y, circlesList[j].x, circlesList[j].y);
      
      if (Math.abs(dist) < 10) {
        mergeCircles(i, j);
        break;
      } else {
        const force = Force(circlesList[i].mass, circlesList[j].mass, dist);
        const dir1to2 = Direction(circlesList[i].x, circlesList[i].y, circlesList[j].x, circlesList[j].y);
        const dir2to1 = Direction(circlesList[j].x, circlesList[j].y, circlesList[i].x, circlesList[i].y);
        
        const acc1 = force / circlesList[i].mass;
        const acc2 = force / circlesList[j].mass;
        
        const newXi = Vector2Translate(circlesList[i].x, acc1, dir1to2[0]);
        const newYi = Vector2Translate(circlesList[i].y, acc1, dir1to2[1]);
        Move(circlesList[i].id, newXi, newYi);
        
        const newXj = Vector2Translate(circlesList[j].x, acc2, dir2to1[0]);
        const newYj = Vector2Translate(circlesList[j].y, acc2, dir2to1[1]);
        Move(circlesList[j].id, newXj, newYj);
      }
    }
  }

  requestAnimationFrame(Simulate, 1);
}


function mergeCircles (index1, index2) {
  const circle1 = circlesList[index1];
  const circle2 = circlesList[index2];
  
  const newMass = circle1.mass + circle2.mass;
  const newX = (circle1.x * circle1.mass + circle2.x * circle2.mass) / newMass;
  const newY = (circle1.y * circle1.mass + circle2.y * circle2.mass) / newMass;
  
  removeCircle(circle1.id);
  removeCircle(circle2.id);
  
  createCircle(newX, newY, newMass);
}

function removeCircle (circleId) {
  const circle = document.getElementById(circleId);
  if (circle) {
    document.body.removeChild(circle);
    removeCircleFromList(circleId);
  }
}

// helper functions

function Distance (x1, y1, x2, y2) {
  return Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2));
}

function Force (m1, m2, dist) {
    return (G * m1 * m2) / (dist ** 2);
}

function Direction (x1, y1, x2, y2) {
  return [(x2 - x1), (y2 - y1)];
}

function Vector2Translate (p, acc, direction) {
  return (p + (direction * acc));
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
    button.style.backgroundColor = "rgba(255, 0, 0, 0.25)";
    button.style.border = "1px solid red";
    Simulate();
  } else {
    button.value = "SIMULATE";
    button.style.backgroundColor = "rgba(42, 168, 42, 0.25)";
    button.style.border = "1px solid rgb(42, 168, 42)";
  }
}
