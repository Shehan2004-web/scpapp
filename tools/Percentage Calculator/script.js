document.getElementById('calculateBtn').addEventListener('click', function() {
    const value = parseFloat(document.getElementById('value').value);
    const percentage = parseFloat(document.getElementById('percentage').value);
    
    if (!isNaN(value) && !isNaN(percentage)) {
        const result = (value * percentage) / 100;
        document.getElementById('resultValue').textContent = result.toFixed(2);
    } else {
        document.getElementById('resultValue').textContent = 'Invalid input';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});