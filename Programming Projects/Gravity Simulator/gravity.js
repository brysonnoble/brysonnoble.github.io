// https://spark.iop.org/calculating-gravitational-forces
let G = 6.67 * (10 ** -11);

function Simulate (circlesList) {
  for (let i = 0; i < circlesList.length; i++) {
    for (let j = i + 1; j < circlesList.length; j++) {
      //console.log(`Calculating distance between ${circlesList[i].id} and ${circlesList[j].id}:`, Distance(circlesList[i].x, circlesList[i].y, circlesList[j].x, circlesList[j].y));
      //console.log(`Calculating force between ${circlesList[i].id} and ${circlesList[j].id}:`, Force(1, 1, Distance(circlesList[i].x, circlesList[i].y, circlesList[j].x, circlesList[j].y)));
      console.log(`Calculating angle between ${circlesList[i].id} and ${circlesList[j].id}:`, Direction(circlesList[i].x, circlesList[i].y, circlesList[j].x, circlesList[j].y));
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

function Move () {
  
}

