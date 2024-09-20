function encodeBase64() {
    const inputText = document.getElementById('inputText').value;
    if (inputText) {
        const encodedText = btoa(inputText);
        document.getElementById('outputText').value = encodedText;
    } else {
        alert('Please enter text to encode.');
    }
}

function decodeBase64() {
    const inputText = document.getElementById('inputText').value;
    try {
        const decodedText = atob(inputText);
        document.getElementById('outputText').value = decodedText;
    } catch (e) {
        alert('Invalid Base64 string. Please enter a valid string to decode.');
    }
}

function clearFields() {
    document.getElementById('inputText').value = '';
    document.getElementById('outputText').value = '';
}

function copyToClipboard() {
    const outputText = document.getElementById('outputText');
    if (outputText.value) {
        outputText.select();
        document.execCommand('copy');
        alert('Result copied to clipboard!');
    } else {
        alert('There is nothing to copy.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});