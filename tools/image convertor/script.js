const upload = document.getElementById('upload');
const dropArea = document.getElementById('drop-area');
const format = document.getElementById('format');
const convertButton = document.getElementById('convert');
const downloadLink = document.getElementById('download');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let image = new Image();

// Function to handle file upload and drawing
function handleFile(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
        image.onload = function() {
            const scaleFactor = Math.min(400 / image.width, 400 / image.height);
            canvas.width = image.width * scaleFactor;
            canvas.height = image.height * scaleFactor;
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            canvas.style.display = 'block'; // Show canvas after drawing
        }
        image.src = event.target.result;
    }
    reader.readAsDataURL(file);
}

// Event listener for file input change
upload.addEventListener('change', function(e) {
    handleFile(e.target.files[0]);
});

// Event listeners for drag-and-drop functionality
dropArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    e.stopPropagation();
    dropArea.style.backgroundColor = '#2a5298';
});

dropArea.addEventListener('dragleave', function(e) {
    e.preventDefault();
    e.stopPropagation();
    dropArea.style.backgroundColor = 'transparent';
});

dropArea.addEventListener('drop', function(e) {
    e.preventDefault();
    e.stopPropagation();
    dropArea.style.backgroundColor = 'transparent';
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
});

// Event listener for convert button click
convertButton.addEventListener('click', function() {
    if (image.src) {
        const selectedFormat = format.value;
        let extension = selectedFormat.split('/')[1];
        if (extension === 'jpeg') extension = 'jpg'; // Adjust extension for JPG

        const dataURL = canvas.toDataURL(selectedFormat);
        downloadLink.href = dataURL;
        downloadLink.download = `converted_image.${extension}`;
        downloadLink.style.display = 'block';
        downloadLink.textContent = 'Download Converted Image';
    } else {
        alert('Please upload an image first.');
    }
});


// nave 

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});
