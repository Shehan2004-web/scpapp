let vm = new Vue({
  el: 'main',
  data: {
    min: 3,
    max: 27,
    delta: 10,
    steps: 11,
    color1: '#e85c0d',
    color2: '#c7253e',
  },
  computed: {
    colors() {
      return this.interpolateColors(this.color1, this.color2, this.steps);
    },
    visualSteps() {
      return this.steps - 2;
    },
    visualStepsLabel() {
      return this.visualSteps === 1 ? 'step' : 'steps';
    },
  },
  methods: {
    interpolateColors(color1, color2, steps) {
      // Function to calculate the color steps
      let start = this.hexToRgb(color1);
      let end = this.hexToRgb(color2);
      let result = [];
      for (let i = 0; i < steps; i++) {
        let r = Math.round(start.r + ((end.r - start.r) * i / (steps - 1)));
        let g = Math.round(start.g + ((end.g - start.g) * i / (steps - 1)));
        let b = Math.round(start.b + ((end.b - start.b) * i / (steps - 1)));
        result.push([r, g, b]);
      }
      return result;
    },
    hexToRgb(hex) {
      let bigint = parseInt(hex.slice(1), 16);
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
      };
    },
    rgbToHex(r, g, b) {
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    },
    setStyles(color) {
      return `background: rgb(${color[0]}, ${color[1]}, ${color[2]}); color: ${this.adjust(color)}`;
    },
    adjust(color) {
      const hex = this.rgbToHex(color[0], color[1], color[2]);
      return this.foregroundAdjust(hex);
    },
    foregroundAdjust(hex) {
      // Adjust the foreground color based on the brightness of the background
      let rgb = this.hexToRgb(hex);
      let brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
      return brightness > 128 ? '#000000' : '#ffffff';
    },
    colorName(color) {
      return this.rgbToHex(color[0], color[1], color[2]);
    },
    copyColor(color) {
      const hexColor = this.rgbToHex(color[0], color[1], color[2]);
      navigator.clipboard.writeText(hexColor).then(() => {
        alert(`Color code ${hexColor} copied to clipboard!`);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    }
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
  });
});
