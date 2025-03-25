document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');

    const getCurrentTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `[${hours}:${minutes}:${seconds}]`;
    };

    const addLine = (input = "") => {
        const time = getCurrentTime();
        
        // Create prompt element
        const prompt = document.createElement("span");
        prompt.className = "prompt";
        prompt.textContent = "~/home > ";

        // Create rprompt element
        const rprompt = document.createElement("span");
        rprompt.className = "rprompt";
        rprompt.textContent = time;

        // Create a new line element
        const line = document.createElement("div");
        line.className = "line";
        line.appendChild(prompt);
        line.appendChild(document.createTextNode(input));
        line.appendChild(rprompt);

        // Append the new line to the terminal
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
    };

    terminal.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            // Get input text (current line)
            const inputText = terminal.textContent.trim();

            // Add the input text to the terminal as a line
            addLine(inputText);

            // Clear terminal input for the next command
            terminal.innerHTML = ""; // Clear only the editable content
        }
    });

    // Initialize the first prompt on page load
    addLine();
});
