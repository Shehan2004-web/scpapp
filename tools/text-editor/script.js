const optionsButtons = document.querySelectorAll(".option-button");

// Function to modify text based on button click
function modifyText(command, value = null) {
    document.execCommand(command, false, value);
}

// Event listeners for format buttons
optionsButtons.forEach(button => {
    button.addEventListener("click", () => {
        modifyText(button.id);
        button.classList.toggle("active");
    });
});

// Prevent default behavior on link button click
document.getElementById("createLink").addEventListener("click", () => {
    const url = prompt("Enter URL:");
    if (url) modifyText("createLink", url);
});

// Initial settings
document.getElementById("fontSize").addEventListener("change", (e) => {
    modifyText("fontSize", e.target.value);
});

document.getElementById("fontName").addEventListener("change", (e) => {
    modifyText("fontName", e.target.value);
});

document.getElementById("formatBlock").addEventListener("change", (e) => {
    modifyText("formatBlock", e.target.value);
});

document.getElementById("text-input").focus();


document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});