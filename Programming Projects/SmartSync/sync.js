function LoadPlayer (file) {
  switch (parseInt(file)) {
    case 0:
      document.getElementById("player").src = "/Sample_Audio/David Guetta & OneRepublic - I Don't Wanna Wait.mp3";
      break;
    case 1:
      document.getElementById("player").src = "/Sample_Audio/Artemas - i like the way you kiss me.mp3";
      break;
    case 2:
      document.getElementById("player").src = "/Sample_Audio/Benson Boone - Slow It Down.mp3";
      break;
    default:
      break;
  }
}
