document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('terminal');

    // prompt & rprompt
    
    textarea.value = '~/home > ';

    textarea.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const currentText = textarea.value;
            textarea.value = currentText + '\n~/ > ';
            textarea.scrollTop = textarea.scrollHeight;
        }
    });
});
