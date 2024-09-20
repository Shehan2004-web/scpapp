document.addEventListener('DOMContentLoaded', () => {
    const colorInput = document.getElementById('colorInput');
    const colorValue = document.getElementById('colorValue');
    const randomPaletteBtn = document.getElementById('randomPaletteBtn');
    const paletteContainer = document.getElementById('palette');

    colorInput.addEventListener('input', () => {
        const selectedColor = colorInput.value;
        colorValue.textContent = selectedColor;
    });

    randomPaletteBtn.addEventListener('click', () => {
        generateRandomPalette();
    });

    function generateRandomPalette() {
        paletteContainer.innerHTML = '';
        for (let i = 0; i < 10; i++) {
            const randomColor = getRandomColor();
            const colorItem = document.createElement('div');
            colorItem.className = 'palette-item';
            colorItem.style.backgroundColor = randomColor;

            const colorCode = document.createElement('span');
            colorCode.textContent = randomColor;
            colorItem.appendChild(colorCode);

            colorItem.addEventListener('click', () => {
                copyToClipboard(randomColor);
                alert(`Copied ${randomColor} to clipboard!`);
            });

            paletteContainer.appendChild(colorItem);
        }
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function copyToClipboard(color) {
        navigator.clipboard.writeText(color).then(() => {
            console.log(`Copied ${color} to clipboard`);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});