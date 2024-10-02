// particle instantiation

let circleIdCounter = 0;
const circlesList = [];

// Function to create a circle
function createCircle(x, y) {
  const circle = document.createElement('div');
  circle.classList.add('circle');
  
  // Set unique ID
  const circleId = `circle-${circleIdCounter++}`;
  circle.setAttribute('id', circleId);
  
  // Set position
  circle.style.left = `${x - 10}px`; // Adjust to center
  circle.style.top = `${y - 10}px`;  // Adjust to center

  // Add the circle's details to the list
  circlesList.push({ id: circleId, x: x, y: y });
  console.log(circlesList); // Display the updated list in the console

  // Add click event to delete the circle
  circle.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent event from bubbling to document
    document.body.removeChild(circle);
    removeCircleFromList(circleId);
  });

  document.body.appendChild(circle);
}

// Function to remove circle from the list by id
function removeCircleFromList(circleId) {
  const index = circlesList.findIndex(circle => circle.id === circleId);
  if (index !== -1) {
    circlesList.splice(index, 1);
    console.log(circlesList); // Display the updated list in the console
  }
}

// Function to move a circle by its ID
function moveCircle(circleId, newX, newY) {
  const circle = document.getElementById(circleId);
  const circleData = circlesList.find(circle => circle.id === circleId);
  
  if (circle && circleData) {
    // Update the position of the circle
    circle.style.left = `${newX - 10}px`; // Adjust to center
    circle.style.top = `${newY - 10}px`;  // Adjust to center

    // Update the coordinates in the circlesList
    circleData.x = newX;
    circleData.y = newY;

    console.log(`Moved circle ${circleId} to X: ${newX}, Y: ${newY}`);
  } else {
    console.log('Circle not found.');
  }
}

// Listen for clicks on the document to create circles
document.addEventListener('click', function(event) {
  const controlPanel = document.getElementById('controlPanel');

  // Check if the click happened inside the control panel
  const isClickInsideControlPanel = controlPanel.contains(event.target);

  // If the click is outside the control panel, create a circle
  if (!isClickInsideControlPanel) {
    createCircle(event.clientX, event.clientY);
  }
});

// Example of moving a circle after 2 seconds
setTimeout(() => {
  // Replace 'circle-0' with the ID of the circle you want to move
  moveCircle('circle-0', 300, 300); // Move the first created circle
}, 2000);

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
