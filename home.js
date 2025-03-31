window.addEventListener('load', function() {
  loadSplash();
  dates();
});

function loadSplash () {
  document.getElementById("splash").style.backgroundImage = `url(${splashImages[Math.floor(Math.random() * splashImages.length)]}), linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)`;
}

function dates () {
  for (let i = 0; i < document.getElementsByClassName("date").length; i++) {
    const date = new Date();
    const year = date.getFullYear();
    document.getElementsByClassName("date")[i].textContent = year - document.getElementsByClassName("date")[i].getAttribute('subtractTime');
  }
}
