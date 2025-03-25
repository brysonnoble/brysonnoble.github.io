const textarea = document.getElementById('terminal');

textarea.value = '~/ > ';

textarea.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const currentText = textarea.value;
        textarea.value = currentText + '\n~/ > ';
    }
});
