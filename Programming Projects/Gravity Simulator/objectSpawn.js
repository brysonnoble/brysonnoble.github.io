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

// Listen for clicks on the document to create circles
document.addEventListener('click', function(event) {
  createCircle(event.clientX, event.clientY);
});
