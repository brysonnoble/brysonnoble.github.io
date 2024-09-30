function PlaySample (file) {
  alert("test");
  switch (file) {
    case 0:
      const audio0 = new Audio('https://brysonnoble.github.io/Programming%20Projects/SmartSync/Sample_Audio/a0.mp3');
      audio0.play();
      break;
    case 1:
      const audio1 = new Audio('https://brysonnoble.github.io/Programming%20Projects/SmartSync/Sample_Audio/a1.mp3');
      audio1.play();
      break;
    case 2:
      const audio2 = new Audio('https://brysonnoble.github.io/Programming%20Projects/SmartSync/Sample_Audio/a2.mp3');
      audio2.play();
      break;
    default:
      break;
  }
}
