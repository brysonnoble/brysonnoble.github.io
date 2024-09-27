function Generate (resNum) {
  for (let i = 0; i < resNum; i++) {
    document.getElementById("output").innerHTML += "\n" + samples[Math.floor(Math.random()*items.length)];
  }
}
