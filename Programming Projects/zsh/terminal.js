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
    path.style.color = "yellow"; // Yellow path
    path.textContent = " home ";

    const arrow = document.createElement("span");
    arrow.style.color = "white"; // White arrow
    arrow.textContent = "➧ ";

    // Create rprompt element
    const rprompt = document.createElement("span");
    rprompt.className = "rprompt";
    rprompt.textContent = time;

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
