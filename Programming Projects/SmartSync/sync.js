function PlaySample (file) {  
  const audio0 = new Audio('https://brysonnoble.github.io/Programming%20Projects/SmartSync/Sample_Audio/a0.mp3');
  const audio1 = new Audio('https://brysonnoble.github.io/Programming%20Projects/SmartSync/Sample_Audio/a1.mp3');
  const audio2 = new Audio('https://brysonnoble.github.io/Programming%20Projects/SmartSync/Sample_Audio/a2.mp3');

  audio0.pause();
  audio1.pause();
  audio2.pause();
  
  
  switch (file) {
    case 0:
      audio0.currentTime = PlayheadPos(audio0.duration * 1000);
      audio0.play();
      break;
    case 1:
      audio1.currentTime = PlayheadPos(audio1.duration * 1000);
      audio1.play();
      break;
    case 2:
      audio2.currentTime = PlayheadPos(audio2.duration * 1000);
      audio2.play();
      break;
    default:
      break;
  }
}

function PlayheadPos (audioLen) {
  alert(Date.now() % audioLen0);
  return Date.now() % audioLen;
}
