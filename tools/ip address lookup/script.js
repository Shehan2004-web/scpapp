function lookupIP() {
    const ip = document.getElementById('ipInput').value;
    if (!ip) {
        alert('Please enter an IP address');
        return;
    }

    // Fetch IP details from an API (you can use a real IP lookup API here)
    fetch(`https://ipapi.co/${ip}/json/`)
        .then(response => response.json())
        .then(data => {
            const resultContainer = document.getElementById('result');
            resultContainer.style.display = 'block';
            resultContainer.innerHTML = `
                <p><strong>IP Address:</strong> ${data.ip}</p>
                <p><strong>City:</strong> ${data.city}</p>
                <p><strong>Region:</strong> ${data.region}</p>
                <p><strong>Country:</strong> ${data.country_name}</p>
                <p><strong>Latitude:</strong> ${data.latitude}</p>
                <p><strong>Longitude:</strong> ${data.longitude}</p>
            `;
        })
        .catch(error => {
            alert('Failed to retrieve IP information');
            console.error(error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});