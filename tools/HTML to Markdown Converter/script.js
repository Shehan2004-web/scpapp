document.getElementById('convertBtn').addEventListener('click', function() {
    const htmlInput = document.getElementById('htmlInput').value;
    
    // Use a DOM parser to convert the HTML string into a document object
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlInput, 'text/html');

    // Convert the HTML document to Markdown recursively
    const convertNodeToMarkdown = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent;
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
            const tag = node.tagName.toLowerCase();

            switch(tag) {
                case 'h1': return `# ${node.textContent}\n`;
                case 'h2': return `## ${node.textContent}\n`;
                case 'h3': return `### ${node.textContent}\n`;
                case 'h4': return `#### ${node.textContent}\n`;
                case 'h5': return `##### ${node.textContent}\n`;
                case 'h6': return `###### ${node.textContent}\n`;
                case 'p': return `${node.textContent}\n\n`;
                case 'strong': return `**${node.textContent}**`;
                case 'em': return `*${node.textContent}*`;
                case 'ul': return `${[...node.children].map(li => `- ${convertNodeToMarkdown(li)}`).join('\n')}\n`;
                case 'ol': return `${[...node.children].map((li, idx) => `${idx + 1}. ${convertNodeToMarkdown(li)}`).join('\n')}\n`;
                case 'li': return `${node.textContent}`;
                case 'a': return `[${node.textContent}](${node.getAttribute('href')})`;
                case 'img': return `![${node.getAttribute('alt') || ''}](${node.getAttribute('src')})`;
                case 'blockquote': return `> ${node.textContent}\n`;
                case 'code': return `\`${node.textContent}\``;
                case 'pre': return `\`\`\`\n${node.textContent}\n\`\`\``;
                case 'br': return `\n`;
                case 'hr': return `---\n`;
                default: return node.textContent;
            }
        }

        return '';
    };

    // Iterate over the HTML body children and convert each node
    let markdownOutput = '';
    [...doc.body.childNodes].forEach(node => {
        markdownOutput += convertNodeToMarkdown(node);
    });

    document.getElementById('markdownOutput').value = markdownOutput;
});

document.getElementById('clearBtn').addEventListener('click', function() {
    document.getElementById('htmlInput').value = '';
    document.getElementById('markdownOutput').value = '';
});

document.getElementById('copyBtn').addEventListener('click', function() {
    const markdownOutput = document.getElementById('markdownOutput');
    markdownOutput.select();
    document.execCommand('copy');
    alert('Markdown copied to clipboard!');
});

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});