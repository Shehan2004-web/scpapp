document.getElementById('upload-btn').addEventListener('click', function() {
    const input = document.getElementById('file-input');
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const arrayBuffer = event.target.result;
            mammoth.convertToHtml({arrayBuffer: arrayBuffer})
                .then(function(result) {
                    const output = document.getElementById('output');
                    const livePreview = document.getElementById('live-preview');
                    const htmlContent = generateHtml(result.value);
                    output.value = htmlContent; // Display the generated HTML code
                    livePreview.innerHTML = htmlContent; // Show live preview
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

// Function to generate HTML code from the extracted content
function generateHtml(content) {
    // Create a temporary DOM element to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;

    // Extract specific elements and generate HTML code
    const links = tempDiv.querySelectorAll('a');
    const tables = tempDiv.querySelectorAll('table');
    const lists = tempDiv.querySelectorAll('ul, ol');

    let htmlOutput = "";

    // Handle links
    links.forEach(link => {
        htmlOutput += `<a href="${link.href}">${link.textContent}</a>\n`;
    });

    // Handle tables
    tables.forEach(table => {
        htmlOutput += '<table>\n';
        table.querySelectorAll('tr').forEach(row => {
            htmlOutput += '  <tr>\n';
            row.querySelectorAll('td, th').forEach(cell => {
                const tag = cell.tagName === 'TH' ? 'th' : 'td';
                htmlOutput += `    <${tag}>${cell.innerHTML}</${tag}>\n`;
            });
            htmlOutput += '  </tr>\n';
        });
        htmlOutput += '</table>\n';
    });

    // Handle lists
    lists.forEach(list => {
        const tag = list.tagName === 'UL' ? 'ul' : 'ol';
        htmlOutput += `<${tag}>\n`;
        list.querySelectorAll('li').forEach(item => {
            htmlOutput += `  <li>${item.innerHTML}</li>\n`;
        });
        htmlOutput += `</${tag}>\n`;
    });

    // Extract bold, italic, underline, superscript, subscript, and emphasized text
    const bolds = tempDiv.querySelectorAll('b, strong');
    bolds.forEach(bold => {
        htmlOutput += `<b>${bold.textContent}</b>\n`;
    });

    const italics = tempDiv.querySelectorAll('i, em');
    italics.forEach(italic => {
        htmlOutput += `<i>${italic.textContent}</i>\n`;
    });

    const underlines = tempDiv.querySelectorAll('u');
    underlines.forEach(underline => {
        htmlOutput += `<u>${underline.textContent}</u>\n`;
    });

    const superscripts = tempDiv.querySelectorAll('sup');
    superscripts.forEach(sup => {
        htmlOutput += `<sup>${sup.textContent}</sup>\n`;
    });

    const subscripts = tempDiv.querySelectorAll('sub');
    subscripts.forEach(sub => {
        htmlOutput += `<sub>${sub.textContent}</sub>\n`;
    });

    // Add alignment and input examples if necessary (for demo purposes)
    htmlOutput += `<div style="text-align:center;">Centered text</div>\n`;
    htmlOutput += `<input type="text" placeholder="Sample Input" />\n`;

    return htmlOutput;
}

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

    const blob = new Blob([output], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated_code.html'; // Set the file name
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});
