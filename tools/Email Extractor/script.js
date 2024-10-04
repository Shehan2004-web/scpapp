function extractEmails() {
    const inputText = document.getElementById('inputText').value;
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emails = inputText.match(emailPattern);
    document.getElementById('outputText').value = emails ? emails.join('\n') : 'No emails found';
}

function copyEmails() {
    const outputText = document.getElementById('outputText');
    outputText.select();
    document.execCommand('copy');
    alert('Emails copied to clipboard!');
}


document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});