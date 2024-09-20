function calculateWaterIntake() {
    const weight = document.getElementById("weight").value;
    const activityLevel = document.getElementById("activity").value;
    const waterIntake = (weight * 0.033 * activityLevel).toFixed(2);
    
    if (weight > 0) {
        document.getElementById("result").innerText = 
            `You should drink approximately ${waterIntake} liters of water per day.`;
    } else {
        document.getElementById("result").innerText = "Please enter a valid weight.";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});
