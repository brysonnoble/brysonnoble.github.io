function Generate (resNum) {
  for (let i = 0; i < resNum; i++) {
    document.getElementById("outputText").innerHTML += samples[Math.floor(Math.random()*samples.length)] + "<br><br>";
  }
}
