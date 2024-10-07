function updateViews() {
    const viewsRange = document.getElementById('viewsRange').value;
    document.getElementById('views').value = viewsRange;
}

function updateCPM() {
    const cpmRange = document.getElementById('cpmRange').value;
    document.getElementById('cpm').value = cpmRange;
}

function calculateEarnings() {
    const views = parseInt(document.getElementById('views').value);
    const cpm = parseFloat(document.getElementById('cpm').value);
    const notRobot = document.getElementById('notRobot').checked;

    if (!notRobot) {
        alert("Please confirm you're not a robot.");
        return;
    }

    const dailyEarnings = (views / 1000) * cpm;
    const monthlyEarnings = dailyEarnings * 30;
    const yearlyEarnings = dailyEarnings * 365;

    document.getElementById('dailyEarnings').innerText = `$${dailyEarnings.toFixed(2)}`;
    document.getElementById('monthlyEarnings').innerText = `$${monthlyEarnings.toFixed(2)}`;
    document.getElementById('yearlyEarnings').innerText = `$${yearlyEarnings.toFixed(2)}`;
}
