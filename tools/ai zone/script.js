document.getElementById("searchButton").addEventListener("click", function () {
    const searchTerm = document.getElementById("searchInput").value;
    // Handle the search action here
    console.log("Searching for:", searchTerm);
});




// Filter by Pricing Type (e.g., Free, Freemium, Paid)
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        const type = this.innerText; // Get the text (e.g., Free, Paid)
        filterToolsByType(type);
    });
});

function filterToolsByType(type) {
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        if (card.getAttribute('data-type') === type || type === 'All') {
            card.style.display = 'block'; // Show matching cards
        } else {
            card.style.display = 'none'; // Hide non-matching cards
        }
    });
}

// Filter by Category (e.g., Image Creator, Design)
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', function() {
        const category = this.innerText; // Get the text (e.g., Image Creator)
        filterToolsByCategory(category);
    });
});

function filterToolsByCategory(category) {
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        if (card.getAttribute('data-category') === category || category === 'All') {
            card.style.display = 'block'; // Show matching cards
        } else {
            card.style.display = 'none'; // Hide non-matching cards
        }
    });
}

