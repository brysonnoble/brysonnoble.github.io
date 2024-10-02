let circleIdCounter = 0;

function createCircle(x, y) {
  const circle = document.createElement('div');
  circle.classList.add('circle');
  
  const circleId = `circle-${circleIdCounter++}`;
  circle.setAttribute('id', circleId);

  circle.style.left = `${x - 10}px`;
  circle.style.top = `${y - 10}px`;

  circle.addEventListener('click', function(e) {
    e.stopPropagation();
    document.body.removeChild(circle);
  });

  document.body.appendChild(circle);
}

document.addEventListener('click', function(event) {
  createCircle(event.clientX, event.clientY);
});
