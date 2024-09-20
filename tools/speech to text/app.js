const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const output = document.getElementById('output');
const languageSelect = document.getElementById('language-select');

let recognition;
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
} else {
    alert("Your browser doesn't support Speech Recognition. Please try Google Chrome.");
}

startBtn.addEventListener('click', () => {
    recognition.lang = languageSelect.value;
    recognition.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
});

stopBtn.addEventListener('click', () => {
    recognition.stop();
    startBtn.disabled = false;
    stopBtn.disabled = true;
});

recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
    }
    output.value = transcript;
};

recognition.onerror = (event) => {
    console.error(event.error);
    alert('Error occurred in recognition: ' + event.error);
    startBtn.disabled = false;
    stopBtn.disabled = true;
};

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});