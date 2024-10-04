let currentScreenSize = 'desktop'; // Default screen size
let deviceInfo = '';

const mobileDevices = {
    'iphone-16': { name: 'iPhone 16', width: 390, height: 844 },
    'galaxy-s23': { name: 'Samsung Galaxy S23', width: 412, height: 915 },
    'pixel-7': { name: 'Google Pixel 7', width: 412, height: 915 },
    // Add more mobile devices as needed
};

function loadWebsite() {
    const url = document.getElementById('url-input').value;
    const iframe = document.getElementById('responsive-frame');

    if (!url) {
        alert('Please enter a URL');
        return;
    }

    // Set the URL for the iframe
    iframe.src = url;

    // Adjust the iframe size based on the selected screen size
    setIframeSize();
}

function setScreenSize(size) {
    currentScreenSize = size; // Update the current screen size
    setIframeSize(); // Adjust iframe size
}

function setIframeSize() {
    const iframe = document.getElementById('responsive-frame');
    const deviceInfoDiv = document.getElementById('device-info');

    // Adjust the iframe size based on the current screen size
    switch (currentScreenSize) {
        case 'desktop':
            iframe.style.width = '1920px';
            iframe.style.height = '1080px';
            deviceInfoDiv.innerHTML = 'Screen Size: 1920x1080';
            break;
        case 'tablet':
            iframe.style.width = '768px';
            iframe.style.height = '1024px';
            deviceInfoDiv.innerHTML = 'Screen Size: 768x1024';
            break;
        case 'mobile':
            const selectedDevice = prompt("Enter mobile device (e.g., iphone-16, galaxy-s23):").toLowerCase();
            if (mobileDevices[selectedDevice]) {
                const device = mobileDevices[selectedDevice];
                iframe.style.width = device.width + 'px';
                iframe.style.height = device.height + 'px';
                deviceInfoDiv.innerHTML = `Device: ${device.name} (Screen Size: ${device.width}x${device.height})`;
            } else {
                alert('Device not found!');
                deviceInfoDiv.innerHTML = '';
            }
            break;
    }
}
