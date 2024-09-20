var P, R, N, pie, line;
var loan_amt_input = document.getElementById("loan-amount-input");
var int_rate_input = document.getElementById("interest-rate-input");
var loan_period_input = document.getElementById("loan-period-input");

// update loan amount
loan_amt_input.addEventListener("input", (self) => {
    let formattedValue = self.target.value.replace(/,/g, ''); // Remove existing commas
    formattedValue = parseFloat(formattedValue).toLocaleString('si-LK'); // Format as comma-separated
    self.target.value = formattedValue;
    P = parseFloat(formattedValue.replace(/,/g, '')) || 0;
    displayDetails();
});

// update Rate of Interest
int_rate_input.addEventListener("input", (self) => {
    R = parseFloat(self.target.value) / 100;
    displayDetails();
});

// update loan period
loan_period_input.addEventListener("input", (self) => {
    N = parseFloat(self.target.value);
    displayDetails();
});

// calculate total Interest payable
function calculateLoanDetails(p, r, emi) {
    let totalInterest = 0;
    let yearlyInterest = [];
    let yearPrincipal = [];
    let years = [];
    let year = 1;
    let [counter, principal, interes] = [0, 0, 0];
    while (p > 0) {
        let interest = parseFloat(p) * parseFloat(r);
        p = parseFloat(p) - (parseFloat(emi) - interest);
        totalInterest += interest;
        principal += parseFloat(emi) - interest;
        interes += interest;
        if (++counter == 12) {
            years.push(year++);
            yearlyInterest.push(parseInt(interes));
            yearPrincipal.push(parseInt(principal));
            counter = 0;
        }
    }
    line.data.datasets[0].data = yearPrincipal;
    line.data.datasets[1].data = yearlyInterest;
    line.data.labels = years;
    return totalInterest;
}

// calculate details
function displayDetails() {
    let r = R / 12;
    let n = N * 12;

    let num = P * r * Math.pow(1 + r, n);
    let denom = Math.pow(1 + r, n) - 1;
    let emi = num / denom;

    let payableInterest = calculateLoanDetails(P, r, emi);

    document.querySelector("#cp").innerText = P.toLocaleString("si-LK") + " Rs.";
    document.querySelector("#ci").innerText = payableInterest.toLocaleString("si-LK") + " Rs.";
    document.querySelector("#ct").innerText = (P + payableInterest).toLocaleString("si-LK") + " Rs.";
    document.querySelector("#price").innerText = emi.toLocaleString("si-LK") + " Rs.";

    pie.data.datasets[0].data[0] = P;
    pie.data.datasets[0].data[1] = payableInterest;
    pie.update();
    line.update();
}

// Initialize everything
function initialize() {
    P = parseFloat(loan_amt_input.value.replace(/,/g, '')) || 0;
    R = parseFloat(int_rate_input.value) / 100;
    N = parseFloat(loan_period_input.value);

    line = new Chart(document.getElementById("lineChart"), {
        data: {
            datasets: [
                {
                    type: "line",
                    label: "ප්‍රධාන ගෙවීම්",
                    borderColor: "#e85c0d",
                    data: []
                },
                {
                    type: "line",
                    label: "උසස් ගාස්තු ගෙවීම්",
                    borderColor: "#c7253e",
                    data: []
                }
            ],
            labels: []
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "වාර්ෂික ගෙවීම් විග්‍රහය"
                }
            },
            scales: {
                x: {
                    title: {
                        color: "grey",
                        display: true,
                        text: "අවුරුදු ගතවූ කාලය"
                    }
                },
                y: {
                    title: {
                        color: "grey",
                        display: true,
                        text: "මුදල (Rs.)"
                    }
                }
            }
        }
    });

    pie = new Chart(document.getElementById("pieChart"), {
        type: "doughnut",
        data: {
            labels: ["ප්‍රධාන මුදල", "උසස් ගාස්තු"],
            datasets: [
                {
                    label: "ලෝන් විස්තර",
                    data: [0, 0],
                    backgroundColor: ["#e85c0d", "#c7253e"],
                    hoverOffset: 4
                }
            ]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "ගෙවීම් විග්‍රහය"
                }
            }
        }
    });
    displayDetails();
}
initialize();

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});