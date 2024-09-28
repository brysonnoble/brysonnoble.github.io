function Generate(resNum) {
  for (let i = 0; i < resNum; i++) {
    const newTextElement = document.createElement('span');
    newTextElement.textContent = samples[Math.floor(Math.random() * samples.length)];

    // Apply a wipe-in transition using CSS
    newTextElement.style.opacity = 0;
    newTextElement.style.transition = 'opacity 0.5s ease-in-out';

    // Add the element to the DOM
    document.getElementById("outputText").appendChild(newTextElement);
    document.getElementById("outputText").appendChild(document.createElement('br')); // Add a break after each element

    // Trigger the transition by setting opacity to 1
    setTimeout(() => {
      newTextElement.style.opacity = 1;
    }, 10);
  }
}
