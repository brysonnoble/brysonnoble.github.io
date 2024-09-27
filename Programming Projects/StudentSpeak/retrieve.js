function Generate (resNum) {
  for (let i = 0; i < resNum; i++) {
    document.getElementById("output").innerHTML += "<br><br>" + samples[Math.floor(Math.random()*samples.length)];
  }
}
