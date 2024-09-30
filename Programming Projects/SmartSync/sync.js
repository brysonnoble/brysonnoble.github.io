function PlaySample(file) {  
  const audio0 = new Audio('https://brysonnoble.github.io/Programming%20Projects/SmartSync/Sample_Audio/a0.mp3');
  const audio1 = new Audio('https://brysonnoble.github.io/Programming%20Projects/SmartSync/Sample_Audio/a1.mp3');
  const audio2 = new Audio('https://brysonnoble.github.io/Programming%20Projects/SmartSync/Sample_Audio/a2.mp3');

  audio0.pause();
  audio1.pause();
  audio2.pause();

  // Wait for the audio file's metadata to load before accessing duration
  switch (file) {
    case 0:
      audio0.addEventListener('loadedmetadata', () => {
        // Set currentTime in seconds, but calculate PlayheadPos in milliseconds
        let playheadTimeInMs = PlayheadPos(audio0.duration * 1000);
        audio0.currentTime = playheadTimeInMs / 1000; // Convert ms to seconds
        audio0.play();
      });
      break;
    case 1:
      audio1.addEventListener('loadedmetadata', () => {
        let playheadTimeInMs = PlayheadPos(audio1.duration * 1000);
        audio1.currentTime = playheadTimeInMs / 1000; // Convert ms to seconds
        audio1.play();
      });
      break;
    case 2:
      audio2.addEventListener('loadedmetadata', () => {
        let playheadTimeInMs = PlayheadPos(audio2.duration * 1000);
        audio2.currentTime = playheadTimeInMs / 1000; // Convert ms to seconds
        audio2.play();
      });
      break;
    default:
      break;
  }
}

function PlayheadPos(audioLen) {
  alert(Date.now() % audioLen);
  return Date.now() % audioLen;  // Returning milliseconds
}
