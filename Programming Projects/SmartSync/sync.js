function LoadPlayer (file) {
  switch (parseInt(file)) {
    case 0:
      var audio = new Audio('https://github.com/brysonnoble/brysonnoble.github.io/blob/main/Programming%20Projects/SmartSync/Sample_Audio/a0.mp3');
      audio.play();
      break;
    case 1:
      var audio = new Audio('https://github.com/brysonnoble/brysonnoble.github.io/blob/main/Programming%20Projects/SmartSync/Sample_Audio/a1.mp3');
      audio.play();
      break;
    case 2:
      var audio = new Audio('https://github.com/brysonnoble/brysonnoble.github.io/blob/main/Programming%20Projects/SmartSync/Sample_Audio/a2.mp3');
      audio.play();
      break;
    default:
      break;
  }
}
