document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('terminal');
    
    // prompt & rprompt
    const getCurrentTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `[${hours}:${minutes}:${seconds}]`;
    };

    const updateRPROMPT = () => {
        const time = getCurrentTime();
        textarea.value = `~/home > ${time}`;
    };

    updateRPROMPT();

    textarea.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const currentText = textarea.value;
            const time = getCurrentTime();
            textarea.value = `${currentText}\n~/home > ${time}`;
            textarea.scrollTop = textarea.scrollHeight;
        }
    });
});
