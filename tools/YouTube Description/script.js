// Generate and update the preview
function updatePreview() {
    const aboutVideo = document.getElementById('about-video').value;
    const timestamps = document.getElementById('timestamps').value;
    const aboutChannel = document.getElementById('about-channel').value;
    const contactSocial = document.getElementById('contact-social').value;

    const aboutVideoToggle = document.getElementById('about-video-toggle').checked;
    const timestampsToggle = document.getElementById('timestamps-toggle').checked;
    const aboutChannelToggle = document.getElementById('about-channel-toggle').checked;
    const contactSocialToggle = document.getElementById('contact-social-toggle').checked;

    let description = '';

    if (aboutVideoToggle && aboutVideo.trim()) {
        description += aboutVideo + '\n\n';
    }
    if (timestampsToggle && timestamps.trim()) {
        description += 'Timestamps:\n' + timestamps + '\n\n';
    }
    if (aboutChannelToggle && aboutChannel.trim()) {
        description += aboutChannel + '\n\n';
    }
    if (contactSocialToggle && contactSocial.trim()) {
        description += contactSocial + '\n\n';
    }

    document.getElementById('description-preview').innerText = description;
}

// Event listeners to update the preview in real-time
document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('input', updatePreview);
});
document.querySelectorAll('input[type=checkbox]').forEach(checkbox => {
    checkbox.addEventListener('change', updatePreview);
});

// Copy Description to Clipboard
document.querySelector('.generate-btn').addEventListener('click', function() {
    const description = document.getElementById('description-preview').innerText;
    navigator.clipboard.writeText(description).then(() => {
        alert('Description copied to clipboard!');
    });
});

// Clear all input fields
document.querySelector('.clear-btn').addEventListener('click', function() {
    document.getElementById('about-video').value = '';
    document.getElementById('timestamps').value = '';
    document.getElementById('about-channel').value = '';
    document.getElementById('contact-social').value = '';
    updatePreview();
});
