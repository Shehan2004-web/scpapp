document.getElementById('file').addEventListener('change', function (event) {
    const fileInput = event.target;
    const fileUploadContainer = document.querySelector('.file-upload-container');
    const loaderContainer = document.querySelector('.loader-container');
    const resizeImageContainer = document.querySelector('.resize-image');
    const uploadedImage = document.getElementById('uploadedImage');

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        
        reader.onloadstart = function () {
            loaderContainer.style.display = '';
            fileUploadContainer.style.display = 'none';
        };

        reader.onload = function (e) {
            setTimeout(function () {
                loaderContainer.style.display = 'none';
            resizeImageContainer.style.display = '';
            }, 2000);

            uploadedImage.src = e.target.result;
        };


        reader.readAsDataURL(fileInput.files[0]);
    }
});

const downloadButton = document.getElementById('downloadImage');
downloadButton.addEventListener('click', function () {
    const resizedImage = document.getElementById('uploadedImage');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = parseInt(document.getElementById('imageWidth').value) || resizedImage.width;
    canvas.height = parseInt(document.getElementById('imageHeight').value) || resizedImage.height;

    ctx.drawImage(resizedImage, 0, 0, canvas.width, canvas.height);

    const downloadLink = document.createElement('a');
    downloadLink.href = canvas.toDataURL('image/jpeg');
    downloadLink.download = 'resized_image.jpg';
    downloadLink.click();
});

// nav 

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});

// single page
