let thumbnailUrl = '';

function fetchThumbnail() {
    const videoUrl = document.getElementById('videoUrl').value;
    const videoId = videoUrl.split('v=')[1];

    if (videoId) {
        thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        const displayArea = document.getElementById('thumbnailDisplay');
        const downloadSection = document.getElementById('downloadSection');

        displayArea.innerHTML = `<img src="${thumbnailUrl}" alt="YouTube Thumbnail">`;
        downloadSection.style.display = "block"; // Show the download button
    } else {
        alert("Please enter a valid YouTube video URL.");
    }
}

function downloadThumbnail() {
    if (thumbnailUrl) {
        const link = document.createElement('a');
        link.href = thumbnailUrl;
        link.download = 'thumbnail.jpg'; // Default filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up the link element after the download starts
    } else {
        alert("No thumbnail to download!");
    }
}

function clearFields() {
    document.getElementById('videoUrl').value = ''; // Clear the input field
    document.getElementById('thumbnailDisplay').innerHTML = '<p>No thumbnail yet.</p>'; // Hide the thumbnail
    document.getElementById('downloadSection').style.display = 'none'; // Hide the download button
    thumbnailUrl = ''; // Reset the thumbnail URL
}
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});