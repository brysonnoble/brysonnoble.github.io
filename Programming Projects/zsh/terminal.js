document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');

    const addLine = (input = "") => {
        const fullPath = " ~/home/user ";

        // stylng
        const box1 = document.createElement("span");
        box1.style.color = "white";
        box1.textContent = "■";
    
        const box2 = document.createElement("span");
        box2.style.color = "blue";
        box2.textContent = "■";
    
        const box3 = document.createElement("span");
        box3.style.color = "red";
        box3.textContent = "■";
    
        const path = document.createElement("span");
        path.style.color = "gold";
        path.textContent = " user ";
    
        const arrow = document.createElement("span");
        arrow.style.color = "white";
        arrow.textContent = "➧ ";

        // rprompt
        const leftBracket = document.createElement("span");
        leftBracket.style.color = "white";
        leftBracket.textContent = "[";
    
        const fullPathElement = document.createElement("span");
        fullPathElement.style.color = "red";
        fullPathElement.textContent = fullPath;
    
        const rightBracket = document.createElement("span");
        rightBracket.style.color = "white";
        rightBracket.textContent = "]";
    
        const rprompt = document.createElement("span");
        rprompt.className = "rprompt";
        rprompt.appendChild(leftBracket);
        rprompt.appendChild(fullPathElement);
        rprompt.appendChild(rightBracket);
    
        const line = document.createElement("div");
        line.className = "line";
        line.contentEditable = "true";
        line.tabIndex = 0;
    
        // prompt
        line.appendChild(box1);
        line.appendChild(box2);
        line.appendChild(box3);
        line.appendChild(path);
        line.appendChild(arrow);
    
        if (input) {
            const inputNode = document.createTextNode(input);
            line.appendChild(inputNode);
        }
    
        line.appendChild(rprompt);
    
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
    
        line.focus();
        const range = document.createRange();
        const selection = window.getSelection();
        range.setStart(line, line.childNodes.length - 1);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
    };


    terminal.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            const inputText = terminal.lastElementChild.textContent.replace("■■■ user ➧ ", "").trim();

            const currentLine = terminal.lastElementChild;
            currentLine.contentEditable = "false";

            addLine();
        }
    });

    addLine();
});
