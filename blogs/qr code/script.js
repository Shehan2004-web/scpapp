// ClipboardJS initialization
const clipboard = new ClipboardJS('.copy-btn');

clipboard.on('success', function(e) {
    alert('Code copied to clipboard!');
    e.clearSelection();
});

clipboard.on('error', function(e) {
    alert('Failed to copy code!');
});

// Ensure the QR Code is generated on button click
document.getElementById('generateBtn').addEventListener('click', function() {
    const qrText = document.getElementById('qrText').value;

    if (qrText.trim() === "") {
        alert("Please enter some text or URL to generate QR code");
        return;
    }

    const qrCode = new QRious({
        element: document.getElementById('qrCode'),
        size: 200,
        value: qrText
    });
});

// Download QR Code functionality
document.getElementById('downloadBtn').addEventListener('click', function() {
    const qrCodeCanvas = document.querySelector('#qrCode canvas');
    const qrCodeImage = qrCodeCanvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = qrCodeImage;
    link.download = 'qr-code.png';
    link.click();
});



const menuIcon = document.getElementById('menu-icon');
const navLinks = document.querySelector('.nav-links');

// Toggle the nav menu for mobile
menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close the menu when clicking outside in mobile view
document.addEventListener('click', function(event) {
    const isClickInside = menuIcon.contains(event.target) || navLinks.contains(event.target);
    if (!isClickInside) {
        navLinks.classList.remove('active');
    }
});
