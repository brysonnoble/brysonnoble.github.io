document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('terminal');

    // prompt & rprompt
    
    textarea.value = '~/ > ';
    
    textarea.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const currentText = textarea.value;
            textarea.value = currentText + '\n~/ > ';
        }
    });

    // cursor blinking

    textarea.addEventListener('focus', () => {
        textarea.style.caretColor = 'white';
    });
    
    textarea.addEventListener('blur', () => {
        textarea.style.caretColor = 'transparent';
    });
});
