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
