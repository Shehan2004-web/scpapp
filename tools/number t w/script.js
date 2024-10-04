function numberToWords(num) {
    const belowTwenty = [
        "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
        "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
        "Eighteen", "Nineteen"
    ];
    const tens = [
        "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
    ];
    const aboveHundred = [
        "", "Thousand", "Million", "Billion"
    ];

    if (num < 20) return belowTwenty[num];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? " " + belowTwenty[num % 10] : "");
    if (num < 1000) return belowTwenty[Math.floor(num / 100)] + " Hundred" + (num % 100 ? " " + numberToWords(num % 100) : "");
    
    for (let i = 0; i < aboveHundred.length; i++) {
        const unit = Math.pow(1000, i);
        if (num < unit * 1000) {
            return numberToWords(Math.floor(num / unit)) + " " + aboveHundred[i] + (num % unit ? " " + numberToWords(num % unit) : "");
        }
    }
}

function numberToSinhalaWords(num) {
    const belowTwentySinhala = [
        "සීරුමුව", "එක", "දෙක", "තුන", "හතර", "පහ", "හය", "හත", "අට", "නවය", "දහය", 
        "එක්දහස්", "දෙදහස්", "තුන්දහස්", "හරදහස්", "පන්දහස්", "හයදහස්", "හත්දහස්", 
        "අටදහස්", "නවදහස්"
    ];
    const tensSinhala = [
        "", "", "විස්ස", "තිහ", "හතලිහ", "පනස්", "හැට", "හැත්ත", "අසු", "අනු"
    ];
    const aboveHundredSinhala = [
        "", "දහස", "මිලියන", "බිලියන"
    ];

    if (num < 20) return belowTwentySinhala[num];
    if (num < 100) return tensSinhala[Math.floor(num / 10)] + (num % 10 ? " " + belowTwentySinhala[num % 10] : "");
    if (num < 1000) return belowTwentySinhala[Math.floor(num / 100)] + " රු" + (num % 100 ? " " + numberToSinhalaWords(num % 100) : "");
    
    for (let i = 0; i < aboveHundredSinhala.length; i++) {
        const unit = Math.pow(1000, i);
        if (num < unit * 1000) {
            return numberToSinhalaWords(Math.floor(num / unit)) + " " + aboveHundredSinhala[i] + (num % unit ? " " + numberToSinhalaWords(num % unit) : "");
        }
    }
}

document.getElementById("convertButton").addEventListener("click", () => {
    const numberInput = document.getElementById("numberInput").value;
    const englishOutput = document.getElementById("englishOutput");
    const sinhalaOutput = document.getElementById("sinhalaOutput");
    
    if (numberInput) {
        const englishWords = numberToWords(Number(numberInput));
        const sinhalaWords = numberToSinhalaWords(Number(numberInput));
        englishOutput.textContent = `English: ${englishWords}`;
        sinhalaOutput.textContent = `සිංහල: ${sinhalaWords}`;
    } else {
        englishOutput.textContent = "Please enter a valid number.";
        sinhalaOutput.textContent = "";
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});

// single page