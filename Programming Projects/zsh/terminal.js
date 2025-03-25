document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.querySelector('.terminal');
    const textarea = document.getElementById('terminal');

    const rprompt = document.createElement('div');
    rprompt.id = 'rprompt';
    rprompt.style.position = 'absolute';
    rprompt.style.right = '10px';
    rprompt.style.top = '10px';
    rprompt.style.color = 'red';
    rprompt.style.fontFamily = 'Cascadia Mono';
    rprompt.style.fontSize = '12px';

    terminal.appendChild(rprompt);

    const getCurrentTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `[${hours}:${minutes}:${seconds}]`;
    };

    const updateRPROMPT = () => {
        rprompt.textContent = getCurrentTime();
    };

    setInterval(updateRPROMPT, 1000);

    textarea.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const currentText = textarea.value;
            textarea.value = `${currentText}\n~/home > `;
            textarea.scrollTop = textarea.scrollHeight;
        }
    });
});
