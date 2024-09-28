function Generate(resNum) {
  for (let i = 0; i < resNum; i++) {
    const newTextElement = document.createElement('span');
    newTextElement.textContent = samples[Math.floor(Math.random() * samples.length)];

    newTextElement.style.opacity = 0;
    newTextElement.style.transition = 'opacity 0.5s ease-in-out';

    document.getElementById("outputText").appendChild(newTextElement);
    document.getElementById("outputText").appendChild(document.createElement('br'));
    document.getElementById("outputText").appendChild(document.createElement('br'));

    setTimeout(() => {
      newTextElement.style.opacity = 1;
    }, 10);
  }
}
