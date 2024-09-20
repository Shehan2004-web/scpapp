document.getElementById('repeat-button').addEventListener('click', function() {
    const textInput = document.getElementById('text-input').value;
    const repeatCount = parseInt(document.getElementById('repeat-count').value);
    const addNumbers = document.getElementById('add-numbers').checked;
    let output = '';

    if (textInput.trim() === '') {
        alert('Please enter some text to repeat.');
        return;
    }

    if (isNaN(repeatCount) || repeatCount < 1) {
        alert('Please enter a valid repeat count.');
        return;
    }

    for (let i = 0; i < repeatCount; i++) {
        if (addNumbers) {
            output += (i + 1) + '. ' + textInput + '\n';
        } else {
            output += textInput + '\n';
        }
    }

    document.getElementById('output').value = output.trim();
});

document.getElementById('copy-button').addEventListener('click', function() {
    const outputTextarea = document.getElementById('output');
    outputTextarea.select();
    document.execCommand('copy');
    alert('Output copied to clipboard!');
});

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});