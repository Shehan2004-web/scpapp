document.getElementById('generateBtn').addEventListener('click', () => {
    const fileInput = document.getElementById('excelFile').files[0];
    if (fileInput) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // Clear previous output
            document.getElementById('htmlTableOutput').innerHTML = '';
            let allTablesHTML = '';

            // Iterate through each sheet
            workbook.SheetNames.forEach(sheetName => {
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                let currentTableHTML = ''; // To store the HTML for the current table
                let isTableStarted = false; // Flag to track if we are within a table
                let gapCount = 0; // Counter to track gaps between rows

                jsonData.forEach((row, rowIndex) => {
                    const isRowEmpty = row.every(cell => cell === null || cell === '');
                    
                    if (!isRowEmpty) {
                        if (!isTableStarted) {
                            // Start a new table
                            currentTableHTML = `<div class="table-output"><h3>Table: ${sheetName}</h3><table>`;
                            isTableStarted = true;
                        }

                        currentTableHTML += '<tr>'; // Start a new row
                        row.forEach(cell => {
                            // Add cell data
                            currentTableHTML += `<td>${cell || ''}</td>`;
                        });
                        currentTableHTML += '</tr>'; // End the row
                        gapCount = 0; // Reset gap count
                    } else {
                        // Increment gap count for empty rows
                        gapCount++;
                        if (gapCount >= 1 && isTableStarted) {
                            // If there's a gap and we were inside a table, close the table
                            currentTableHTML += '</table></div>'; // Close table and div
                            allTablesHTML += currentTableHTML; // Append current table HTML
                            isTableStarted = false; // Reset table flag
                        }
                    }
                });

                // Close the last table if it was open
                if (isTableStarted) {
                    currentTableHTML += '</table></div>'; // Close table and div
                    allTablesHTML += currentTableHTML; // Append last table HTML
                }
            });

            // Display the combined HTML code in the textarea
            document.getElementById('htmlTableOutput').innerHTML = allTablesHTML;

            // Prepare full HTML document for download
            const fullHtmlDocument = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Generated Tables</title>
                    <style>
                        body {
                            background-color: #fff;
                            color: #000000;
                            font-family: 'Arial', sans-serif;
                            margin: 0;
                            padding: 20px;
                        }
                        .table-output {
                            border: 1px solid #000000;
                            padding: 10px;
                            margin: 20px 0; /* Margin to separate tables */
                        }
                        table {
                            border-collapse: collapse; /* Ensure borders collapse into single lines */
                            width: 100%; /* Full width for tables */
                        }
                        td, th {
                            border: 1px solid #000000; /* Border for each cell */
                            padding: 10px; /* Padding inside cells */
                            text-align: left; /* Align text */
                        }
                            footer {
                                margin-top: 20px;
                                text-align: center;
                                color: #c7253e;
                        }
                    </style>
                </head>
                <body>
                    <h1>Generated Tables</h1>
                    ${allTablesHTML}
                    <footer>
                          <p>Generated using <a href="https://www.scpapp.pro" style="color: #e85c0d;">SCP App</a></p>
                    </footer>
                </body>
                </html>
            `;

            // Display the HTML code for download
            document.getElementById('htmlCode').value = fullHtmlDocument;

            // Show copy and download buttons
            document.getElementById('copyHtmlBtn').style.display = 'inline-block';
            document.getElementById('downloadHtmlBtn').style.display = 'inline-block';
        };
        reader.readAsArrayBuffer(fileInput);
    } else {
        alert('Please upload an Excel file.');
    }
});

// Copy HTML code to clipboard
document.getElementById('copyHtmlBtn').addEventListener('click', () => {
    const htmlCode = document.getElementById('htmlCode');
    htmlCode.select();
    document.execCommand('copy');
    alert('HTML code copied to clipboard.');
});

// Download the HTML code as a file
document.getElementById('downloadHtmlBtn').addEventListener('click', () => {
    const htmlCode = document.getElementById('htmlCode').value;
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'generated_tables.html';
    link.click();
});
