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
    
        // Create the prompt element with color-coded boxes
        const box1 = document.createElement("span");
        box1.style.color = "white"; // White box
        box1.textContent = "■";
    
        const box2 = document.createElement("span");
        box2.style.color = "blue"; // Blue box
        box2.textContent = "■";
    
        const box3 = document.createElement("span");
        box3.style.color = "red"; // Red box
        box3.textContent = "■";
    
        const path = document.createElement("span");
        path.style.color = "gold"; // Yellow path
        path.textContent = " home ";
    
        const arrow = document.createElement("span");
        arrow.style.color = "white"; // White arrow
        arrow.textContent = "➧ ";
    
        // Create RPROMPT elements: brackets (white) and time (red)
        const leftBracket = document.createElement("span");
        leftBracket.style.color = "white"; // White bracket
        leftBracket.textContent = "[";
    
        const timeElement = document.createElement("span");
        timeElement.style.color = "red"; // Red time
        timeElement.textContent = time.substring(1, time.length - 1); // Remove brackets from time string
    
        const rightBracket = document.createElement("span");
        rightBracket.style.color = "white"; // White bracket
        rightBracket.textContent = "]";
    
        // Create RPROMPT container
        const rprompt = document.createElement("span");
        rprompt.className = "rprompt";
        rprompt.appendChild(leftBracket);
        rprompt.appendChild(timeElement);
        rprompt.appendChild(rightBracket);
    
        // Create the new line container
        const line = document.createElement("div");
        line.className = "line";
        line.contentEditable = "true"; // Make the div editable
        line.tabIndex = 0; // Make the div focusable
    
        // Append the prompt components
        line.appendChild(box1);
        line.appendChild(box2);
        line.appendChild(box3);
        line.appendChild(path);
        line.appendChild(arrow);
    
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
        range.setStart(line, line.childNodes.length - 1); // Set caret position after the prompt
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
