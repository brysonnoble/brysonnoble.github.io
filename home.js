function loadSplash () {
  document.getElementById("splash").style.backgroundImage = `url(${splashImages[Math.floor(Math.random() * samples.length)]})`;
}
