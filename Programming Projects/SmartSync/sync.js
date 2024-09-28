function LoadPlayer (file) {
  switch (parseInt(file)) {
    case 0:
      document.getElementById("player").src = "https://github.com/brysonnoble/brysonnoble.github.io/blob/main/Programming%20Projects/SmartSync/Sample_Audio/David%20Guetta%20%26%20OneRepublic%20-%20I%20Don't%20Wanna%20Wait.mp3";
      break;
    case 1:
      document.getElementById("player").src = "https://github.com/brysonnoble/brysonnoble.github.io/blob/main/Programming%20Projects/SmartSync/Sample_Audio/Artemas%20-%20i%20like%20the%20way%20you%20kiss%20me.mp3";
      break;
    case 2:
      document.getElementById("player").src = "https://github.com/brysonnoble/brysonnoble.github.io/blob/main/Programming%20Projects/SmartSync/Sample_Audio/Benson%20Boone%20-%20Slow%20It%20Down.mp3";
      break;
    default:
      break;
  }
}
