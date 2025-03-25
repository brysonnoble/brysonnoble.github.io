document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');

    const addLine = (input = "") => {
        const fullPath = " ~/home/user ";

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
        path.textContent = " user ";

        const arrow = document.createElement("span");
        arrow.style.color = "white"; // White arrow
        arrow.textContent = "➧ ";

        // Create RPROMPT with the full path
        const leftBracket = document.createElement("span");
        leftBracket.style.color = "white"; // White bracket
        leftBracket.textContent = "[";

        const fullPathElement = document.createElement("span");
        fullPathElement.style.color = "red"; // Red full path
        fullPathElement.textContent = fullPath;

        const rightBracket = document.createElement("span");
        rightBracket.style.color = "white"; // White bracket
        rightBracket.textContent = "]";

        const rprompt = document.createElement("span");
        rprompt.className = "rprompt";
        rprompt.appendChild(leftBracket);
        rprompt.appendChild(fullPathElement);
        rprompt.appendChild(rightBracket);

        // Create the new line container
        const line = document.createElement("div");
        line.className = "line";

        // Create an editable section for user input
        const editableInput = document.createElement("span");
        editableInput.className = "editable-input";
        editableInput.contentEditable = "true"; // Make only this part editable
        editableInput.tabIndex = 0; // Make it focusable

        // Append the prompt components
        line.appendChild(box1);
        line.appendChild(box2);
        line.appendChild(box3);
        line.appendChild(path);
        line.appendChild(arrow);

        // Add user input section
        line.appendChild(editableInput);

        // Append RPROMPT
        line.appendChild(rprompt);

        // Append the new line to the terminal
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight; // Scroll to the bottom

        // Automatically focus on the editable input
        editableInput.focus();
    };

    terminal.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            // Get the current line's input text
            const editableInput = terminal.lastElementChild.querySelector(".editable-input");
            const inputText = editableInput.textContent.trim();

            // Freeze the current line's input
            editableInput.contentEditable = "false"; // Make it uneditable

            // Append a new line with prompt and RPROMPT
            addLine();
        }
    });

    // Initialize the terminal with the first line
    addLine(); // Add the initial line
});
