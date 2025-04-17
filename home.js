window.addEventListener('load', function() {
  loadSplash();
  dates();
});

function loadSplash () {
  const splashElement = document.getElementById("splash");
  const image = new Image();
  const randomSplash = splashImages[Math.floor(Math.random() * splashImages.length)];
  
  image.src = randomSplash;
  
  image.onload = function () {
    splashElement.style.backgroundImage = `url(${randomSplash}), linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)`;
    hideLoader();
  };
}

function dates () {
  const dateElements = document.getElementsByClassName("date");
  const currentYear = new Date().getFullYear();

  for (let i = 0; i < dateElements.length; i++) {
    const subtractTime = dateElements[i].getAttribute('subtractTime');
    dateElements[i].textContent = currentYear - subtractTime;
  }
}

function hideLoader () {
  const loader = document.getElementById("load");
  const h2 = document.querySelector("h2");
  
  loader.style.opacity = 1;

  const fadeOut = setInterval(() => {
    document.body.style.overflow = 'scroll';

    h2.style.animation = "typing 2s steps(40, end), blink-caret 0.75s step-end 4";
    h2.style.color = "white";
    setTimeout(enableWrap, 3500);
    
    if (loader.style.opacity > 0) {
      loader.style.opacity -= 0.05;
    } else {
      clearInterval(fadeOut);
      loader.style.display = "none";
    }
  }, 50);
}

function enableWrap () {
  document.querySelector("h2").style.whiteSpace= "wrap";
}

document.addEventListener("DOMContentLoaded", () => {
  const projects = [
    {
      id: "gravity",
      gif: "https://brysonnoble.github.io/Images/Project_Previews/genRelSim.gif",
      thumbnail: "https://brysonnoble.github.io/Images/Project_Thumbnails/gravity.PNG"
    },
    {
      id: "speak",
      gif: "https://brysonnoble.github.io/Images/Project_Previews/speak.gif",
      thumbnail: "https://brysonnoble.github.io/Images/Project_Thumbnails/studentspeak.PNG"
    },
  ];

  projects.forEach(project => {
    const elem = document.getElementById(project.id);
    if (!elem) return;

    let hoverTimeout;
    let showingGif = false;

    elem.addEventListener("mouseenter", () => {
      hoverTimeout = setTimeout(() => {
        elem.classList.add("fade");
        setTimeout(() => {
          elem.style.backgroundImage = `url('${project.gif}')`;
          elem.classList.remove("fade");
          showingGif = true;
        }, 200);
      }, 2000);
    });

    elem.addEventListener("mouseleave", () => {
      clearTimeout(hoverTimeout);

      if (showingGif) {
        elem.classList.add("fade");
        setTimeout(() => {
          elem.style.backgroundImage = `url('${project.thumbnail}')`;
          elem.classList.remove("fade");
          showingGif = false;
        }, 200);
      }
    });
  });
});
