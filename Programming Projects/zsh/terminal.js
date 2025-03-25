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
        
        // Create the prompt element
        const prompt = document.createElement("span");
        prompt.className = "prompt";
        prompt.textContent = "~/home > ";

        // Create the rprompt element
        const rprompt = document.createElement("span");
        rprompt.className = "rprompt";
        rprompt.textContent = time;

        // Create the new line container
        const line = document.createElement("div");
        line.className = "line";
        line.appendChild(prompt);

        // Add the user's input (if any) between prompt and rprompt
        if (input) {
            const inputNode = document.createTextNode(input);
            line.appendChild(inputNode);
        }

        line.appendChild(rprompt);

        // Append the new line to the terminal
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight; // Scroll to the bottom
    };

    // Event listener for keydown
    terminal.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            // Get the current line's input
            const inputText = terminal.lastElementChild.textContent.replace("~/home > ", "").trim();

            // Freeze the current line by disabling contentEditable
            const currentLine = terminal.lastElementChild;
            currentLine.contentEditable = "false";

            // Append a new prompt and rprompt
            addLine();
        }
    });

    // Initialize the terminal with the first line
    addLine(); // Add the initial line with just the prompt
});
