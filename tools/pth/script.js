document.getElementById("pdfForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const fileInput = document.getElementById("pdfFile");
    const resultDiv = document.getElementById("result");
    const htmlCodePre = document.getElementById("htmlCode");
    const livePreviewDiv = document.getElementById("livePreview");
    const previewContainer = document.getElementById("previewContainer");
    const downloadBtn = document.getElementById("downloadBtn");
    const copyBtn = document.getElementById("copyBtn");

    const file = fileInput.files[0];

    if (file && file.type === "application/pdf") {
        const fileReader = new FileReader();

        fileReader.onload = function () {
            const typedarray = new Uint8Array(this.result);
            pdfjsLib.getDocument(typedarray).promise.then(pdf => {
                let htmlOutput = "";
                const totalPages = pdf.numPages;
                let pagePromises = [];

                for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
                    pagePromises.push(
                        pdf.getPage(pageNum).then(page => {
                            return page.getTextContent().then(textContent => {
                                const textItems = textContent.items;
                                let currentParagraph = "";
                                let currentTitle = "";
                                let lastY = null;

                                textItems.forEach(item => {
                                    const text = item.str.trim();
                                    const yPosition = item.transform[5]; // Y position of the text

                                    // Identify titles (for simplicity, let's assume titles are bold and larger font)
                                    if (item.fontName.includes('Bold')) {
                                        if (currentTitle) {
                                            // Push the previous title if exists
                                            htmlOutput += `<h2>${currentTitle}</h2>`;
                                            currentTitle = "";
                                        }
                                        currentTitle = text;
                                    } else if (text.startsWith('http')) {
                                        // Identify links
                                        htmlOutput += `<a href="${text}" target="_blank">${text}</a><br>`;
                                    } else if (text === '') {
                                        return; // Skip empty strings
                                    } else {
                                        // Detect new paragraph
                                        if (lastY !== null && Math.abs(yPosition - lastY) < 10) {
                                            // Continue the paragraph
                                            currentParagraph += ` ${text}`;
                                        } else {
                                            // New line indicates a new paragraph
                                            if (currentParagraph) {
                                                htmlOutput += `<p>${currentParagraph}</p>`;
                                                currentParagraph = ""; // Reset the current paragraph
                                            }
                                            currentParagraph += text; // Start a new paragraph
                                        }
                                    }
                                    lastY = yPosition; // Update the last Y position
                                });

                                // Finalize the last paragraph if it exists
                                if (currentParagraph) {
                                    htmlOutput += `<p>${currentParagraph}</p>`;
                                }
                            });
                        })
                    );
                }

                Promise.all(pagePromises).then(() => {
                    // Display the output
                    resultDiv.classList.remove("hidden");
                    livePreviewDiv.classList.remove("hidden");
                    downloadBtn.classList.remove("hidden");
                    copyBtn.classList.remove("hidden");
                    htmlCodePre.textContent = htmlOutput; // Display the generated HTML code
                    previewContainer.innerHTML = htmlOutput; // Update the live preview
                });
            });
        };

        fileReader.readAsArrayBuffer(file);
    } else {
        alert("Please upload a valid PDF file.");
    }
});

// Function to download HTML
function downloadHTML(html) {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted_elements.html'; // Set the file name
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Function to copy HTML to clipboard
function copyToClipboard(html) {
    navigator.clipboard.writeText(html).then(() => {
        alert('HTML code copied to clipboard!');
    }).catch(err => {
        alert('Failed to copy HTML code: ' + err);
    });
}

// Clear the form and results
document.getElementById("clearBtn").addEventListener("click", function () {
    document.getElementById("pdfForm").reset();
    document.getElementById("result").classList.add("hidden");
    document.getElementById("livePreview").classList.add("hidden");
    document.getElementById("htmlCode").textContent = ""; // Clear HTML code
    document.getElementById("previewContainer").innerHTML = ""; // Clear preview
});
