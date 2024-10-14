document.getElementById('upload-btn').addEventListener('click', function() {
    const input = document.getElementById('file-input');
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const arrayBuffer = event.target.result;

            // Use Mammoth.js to convert .docx file to HTML
            mammoth.convertToHtml({
                arrayBuffer: arrayBuffer,
                styleMap: [
                    "p[style-name='Heading 1'] => h1:fresh",
                    "p[style-name='Heading 2'] => h2:fresh",
                    "p[style-name='Heading 3'] => h3:fresh",
                    "p[style-name='Heading 4'] => h4:fresh",
                    "p[style-name='Normal'] => p:fresh",
                    "p[style-name='Table'] => table:fresh",
                    "strong => strong",
                    "em => em",
                    "u => u",
                    "sup => sup",
                    "sub => sub",
                    "ul => ul",
                    "ol => ol",
                    "li => li",
                    "a => a"
                ] // Map Word styles to proper HTML tags
            })
            .then(function(result) {
                const output = document.getElementById('output');
                const livePreview = document.getElementById('live-preview');

                // Use the generated HTML from Mammoth.js directly
                const htmlContent = result.value; 
                output.value = htmlContent;  // Display HTML in the output textarea
                livePreview.innerHTML = htmlContent;  // Show live preview

                // Log warnings if there are any issues during conversion
                if (result.messages.length > 0) {
                    console.warn(result.messages);
                }
            })
            .catch(function(err) {
                console.error(err);
                alert('Error extracting content from the file.');
            });
        };

        reader.readAsArrayBuffer(file);
    } else {
        alert('Please select a file first.');
    }
});

// Clear button functionality
document.getElementById('clear-btn').addEventListener('click', function() {
    document.getElementById('file-input').value = '';
    document.getElementById('output').value = '';
    document.getElementById('live-preview').innerHTML = ''; // Clear live preview
});

// Copy to Clipboard functionality
document.getElementById('copy-btn').addEventListener('click', function() {
    const output = document.getElementById('output');
    if (output.value.trim() === '') {
        alert('Nothing to copy!');
        return;
    }

    navigator.clipboard.writeText(output.value).then(() => {
        alert('Copied to clipboard!');
    }).catch(err => {
        console.error('Unable to copy to clipboard', err);
    });
});

// Download HTML functionality
document.getElementById('download-btn').addEventListener('click', function() {
    const output = document.getElementById('output').value;
    if (output.trim() === '') {
        alert('No HTML code to download!');
        return;
    }

    // Add table border styles directly into the downloaded HTML file
    const styledHtml = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #ffffff;
            color: #000000;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background-color: #333;
          }
          th, td {
            border: 1px solid #000000;
            padding: 10px;
            text-align: left;
            color: #000000;
          }
          th {
            background-color: #444;
          }
          td {
            background-color: #ffffff;
          }
        </style>
      </head>
      <body>
        ${output}
      </body>
    </html>
    `;

    // Convert the styled HTML into a Blob and trigger the download
    const blob = new Blob([styledHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted_output_with_table_borders.html'; // Set the file name
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});