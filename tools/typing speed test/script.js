let textToType = "The quick brown fox jumps over the lazy dog."; // The sentence to type
let typingArea = document.getElementById('typing-area');
let timerDisplay = document.getElementById('timer');
let wpmDisplay = document.getElementById('wpm');
let accuracyDisplay = document.getElementById('accuracy');
let restartBtn = document.getElementById('restart-btn');

let startTime, timerInterval;
let typingStarted = false;
let correctChars = 0;
let totalChars = textToType.length;

// Function to start the timer
function startTimer() {
    startTime = new Date().getTime(); // Record start time
    timerInterval = setInterval(function () {
        let elapsedTime = (new Date().getTime() - startTime) / 1000; // Time in seconds
        timerDisplay.innerText = `Time: ${elapsedTime.toFixed(1)}s`;
    }, 100);
}

// Function to stop the timer and calculate stats
function stopTimer() {
    clearInterval(timerInterval); // Stop the timer
    let elapsedTime = (new Date().getTime() - startTime) / 1000; // Final time in seconds
    let timeInMinutes = elapsedTime / 60; // Time in minutes

    let wordsTyped = textToType.split(" ").length; // Number of words in the sentence
    let wpm = Math.round(wordsTyped / timeInMinutes); // Calculate WPM

    let accuracy = ((correctChars / totalChars) * 100).toFixed(2); // Calculate accuracy percentage

    // Display results
    timerDisplay.innerText = `Time: ${elapsedTime.toFixed(1)}s`;
    wpmDisplay.innerText = `WPM: ${wpm}`;
    accuracyDisplay.innerText = `Accuracy: ${accuracy}%`;
}

// Event listener for typing input
typingArea.addEventListener('input', function () {
    let typedText = typingArea.value;

    // Start the timer on the first input
    if (!typingStarted) {
        typingStarted = true;
        startTimer();
    }

    // Count correct characters
    correctChars = 0;
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === textToType[i]) {
            correctChars++;
        }
    }
});

// Event listener to stop typing when Enter key is pressed
typingArea.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent Enter key from creating a new line

        let typedText = typingArea.value.trim(); // Trim any extra spaces

        // Stop the timer if the full sentence is typed correctly
        if (typedText === textToType) {
            typingArea.disabled = true; // Disable textarea once typing is complete
            stopTimer(); // Stop the timer and calculate WPM and accuracy
        } else {
            alert('The sentence is not fully typed or incorrect!');
        }
    }
});

// Restart button functionality
restartBtn.addEventListener('click', function () {
    typingArea.value = ''; // Clear the typing area
    typingArea.disabled = false; // Enable typing area
    typingStarted = false; // Reset typing state
    correctChars = 0; // Reset correct character count
    clearInterval(timerInterval); // Stop the timer
    timerDisplay.innerText = 'Time: 0s'; // Reset timer display
    wpmDisplay.innerText = 'WPM: 0'; // Reset WPM display
    accuracyDisplay.innerText = 'Accuracy: 100%'; // Reset accuracy display
});

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});