// https://spark.iop.org/calculating-gravitational-forces
let G = 6.67 * (10 ** -11);

function Simulate (circlesList) {
  for (let i = 0; i < circlesList.length; i++) {
    for (let j = 0; j < circlesList.length; j++) {
      console.log(Distance(circlesList[i].x, circlesList[i].y, circlesList[j].x, circlesList[j].y));
    }
  }
}

function Distance (x1, y1, x2, y2) {
  return (((x2 - x1) ** 2) + ((y2 - y1) ** 2)) ** 0.5;
}

function Move () {
  
}
