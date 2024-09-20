function generateRobots() {
    const userAgent = document.getElementById("user-agent").value || "*";
    const disallow = document.getElementById("disallow").value || "/";
    const allow = document.getElementById("allow").value || "";

    let robotsTxt = `User-agent: ${userAgent}\nDisallow: ${disallow}`;
    
    if (allow) {
        robotsTxt += `\nAllow: ${allow}`;
    }

    document.getElementById("robots-output").textContent = robotsTxt;
}

function clearFields() {
    document.getElementById("user-agent").value = "";
    document.getElementById("disallow").value = "";
    document.getElementById("allow").value = "";
    document.getElementById("robots-output").textContent = "";
}

function copyToClipboard() {
    const robotsOutput = document.getElementById("robots-output").textContent;
    navigator.clipboard.writeText(robotsOutput).then(() => {
        alert("Copied to clipboard!");
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});