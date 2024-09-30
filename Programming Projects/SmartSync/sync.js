function updatePlayhead (audio) {
  const track = document.getElementById('track');
  const playhead = document.getElementById('playhead');
  
  function movePlayhead() {
    const percentage = (audio.currentTime / audio.duration) * 100;
    document.documentElement.style.setProperty('--playheadPos', `${percentage}%`);
    
    if (!audio.paused && !audio.ended) {
      requestAnimationFrame(movePlayhead);
    }
  }

  movePlayhead();
}

function PlaySample (file) {  
  const audio0 = new Audio('https://brysonnoble.github.io/Programming%20Projects/SmartSync/Sample_Audio/a0.mp3');
  const audio1 = new Audio('https://brysonnoble.github.io/Programming%20Projects/SmartSync/Sample_Audio/a1.mp3');
  const audio2 = new Audio('https://brysonnoble.github.io/Programming%20Projects/SmartSync/Sample_Audio/a2.mp3');

  let selectedAudio;

  switch (file) {
    case 0:
      selectedAudio = audio0;
      break;
    case 1:
      selectedAudio = audio1;
      break;
    case 2:
      selectedAudio = audio2;
      break;
    default:
      return;
  }

  selectedAudio.addEventListener('loadedmetadata', () => {
    let playheadTimeInMs = PlayheadPos(selectedAudio.duration * 1000);
    selectedAudio.currentTime = playheadTimeInMs / 1000;
    selectedAudio.play();
    updatePlayhead(selectedAudio);
  });
}

function PlayheadPos (audioLen) {
  return Date.now() % audioLen;
}
