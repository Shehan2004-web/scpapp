document.addEventListener('mousemove', (event) => {
    const container = document.querySelector('.container');
    const x = event.clientX / window.innerWidth - 0.5; // Normalize mouse position
    const y = event.clientY / window.innerHeight - 0.5; // Normalize mouse position

    // Adjust the container position based on mouse movement
    container.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
});
