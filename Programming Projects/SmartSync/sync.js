function PlaySample (file) {
  alert("test");
  switch (file) {
    case 0:
      const audio = new Audio('https://brysonnoble.github.io/Programming%20Projects/SmartSync/Sample_Audio/a0.mp3');
      audio.play();
      break;
    case 1:
      import sound from 'https://brysonnoble.github.io/Programming%20Projects/SmartSync/Sample_Audio/a1.mp3'
      const audio = new Audio(sound)
      audio.play()
      break;
    case 2:
      import sound from 'https://brysonnoble.github.io/Programming%20Projects/SmartSync/Sample_Audio/a2.mp3'
      const audio = new Audio(sound)
      audio.play()
      break;
    default:
      break;
  }
}
