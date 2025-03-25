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

        // Create the new line container
        const line = document.createElement("div");
        line.className = "line";
        line.contentEditable = "true"; // Make the div editable
        line.tabIndex = 0; // Make the div focusable

        line.appendChild(prompt);

        // Insert user's input between prompt and rprompt (if any)
        if (input) {
            const inputNode = document.createTextNode(input);
            line.appendChild(inputNode);
        }

        line.appendChild(rprompt);

        // Append the new line to the terminal
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight; // Scroll to the bottom

        // Automatically focus and set the caret position
        line.focus();
        const range = document.createRange();
        const selection = window.getSelection();
        range.setStart(line, 1); // Set caret position after the prompt (node index 1)
        range.collapse(true); // Collapse range to the caret position
        selection.removeAllRanges();
        selection.addRange(range);
    };

    terminal.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            // Get the current line's input text
            const inputText = terminal.lastElementChild.textContent.replace("■■■ home ➧ ", "").trim();

            // Freeze the current line
            const currentLine = terminal.lastElementChild;
            currentLine.contentEditable = "false"; // Make it uneditable

            // Append a new prompt and rprompt
            addLine();
        }
    });

    // Initialize the terminal with the first line
    addLine(); // Add the initial line
});
