window.addEventListener('load', function() {
  loadSplash();
  dates();
});

function loadSplash() {
  const splashElement = document.getElementById("splash");
  const image = new Image();
  const randomSplash = splashImages[Math.floor(Math.random() * splashImages.length)];
  
  image.src = randomSplash; // Set the image source
  
  image.onload = function() {
    splashElement.style.backgroundImage = `url(${randomSplash}), linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)`;
    hideLoader();
  };
}

function dates() {
  const dateElements = document.getElementsByClassName("date");
  const currentYear = new Date().getFullYear();

  for (let i = 0; i < dateElements.length; i++) {
    const subtractTime = dateElements[i].getAttribute('subtractTime');
    dateElements[i].textContent = currentYear - subtractTime;
  }
}

function hideLoader() {
  const loader = document.getElementById("load");
  loader.style.opacity = 1;

  const fadeOut = setInterval(() => {
    if (loader.style.opacity > 0) {
      loader.style.opacity -= 0.05;
    } else {
      clearInterval(fadeOut);
      loader.style.display = "none";
      document.body.style.overflow = 'scroll';
    }
  }, 50);
}
