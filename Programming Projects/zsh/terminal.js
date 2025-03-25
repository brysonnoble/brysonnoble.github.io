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
        line.appendChild(prompt);
        line.appendChild(document.createTextNode(input));
        line.appendChild(rprompt);

        // Append line to terminal
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
    };

    terminal.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const currentText = terminal.textContent.trim();
            addLine(currentText);
            terminal.textContent = ""; // Clear input for next line
        }
    });

    // Initialize the first prompt
    addLine();
});
