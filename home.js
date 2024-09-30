function loadSplash () {
  document.getElementById("splash").style.backgroundImage = `url(${splashImages[Math.floor(Math.random() * splashImages.length)]}), linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)`;
}
