// Utility function to get element by id
const $ = (id) => document.getElementById(id);

// Minification functions
function minifyHTML(input) {
    return input
        .replace(/\s+/g, ' ')
        .replace(/>\s+</g, '><')
        .replace(/<!--.*?-->/gs, '')
        .trim();
}

function minifyCSS(input) {
    return input
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/([^0-9a-zA-Z\.#])\s+/g, '$1')
        .replace(/\s([^0-9a-zA-Z\.#]+)/g, '$1')
        .replace(/;}/g, '}')
        .replace(/\s+{/g, '{')
        .replace(/}(\s+)/g, '}\n')
        .trim();
}

function minifyJS(input) {
    return input
        .replace(/\/\/.*$/gm, '')
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/^\s*\n/gm, '')
        .replace(/\s+/g, ' ')
        .replace(/(\s*=\s*)/g, '=')
        .replace(/(\s*\+\s*)/g, '+')
        .replace(/(\s*,\s*)/g, ',')
        .trim();
}

// Maxification (formatting) functions
function maxifyHTML(input) {
    let formatted = '';
    let indent = 0;
    
    input.split(/>\s*</).forEach(element => {
        if (element.match(/^\/\w/)) {
            indent--;
        }
        formatted += '\n' + '  '.repeat(indent) + '<' + element + '>';
        if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith('input')) {
            indent++;
        }
    });
    
    return formatted.slice(1);
}

function maxifyCSS(input) {
    return input
        .replace(/\s*{\s*/g, ' {\n    ')
        .replace(/;\s*/g, ';\n    ')
        .replace(/\s*}\s*/g, '\n}\n\n')
        .replace(/\n    \n/g, '\n')
        .trim();
}

function maxifyJS(input) {
    let formatted = '';
    let indent = 0;
    let inString = false;
    let inComment = false;
    
    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        const nextChar = input[i + 1] || '';
        
        if (!inString && !inComment) {
            if (char === '{') {
                formatted += ' {\n' + '    '.repeat(++indent);
            } else if (char === '}') {
                formatted = formatted.trimEnd() + '\n' + '    '.repeat(--indent) + '}\n';
            } else if (char === ';') {
                formatted += ';\n' + '    '.repeat(indent);
            } else if (char === '/' && nextChar === '/') {
                inComment = 'single';
                formatted += char;
            } else if (char === '/' && nextChar === '*') {
                inComment = 'multi';
                formatted += char;
            } else {
                formatted += char;
            }
        } else if (inString) {
            formatted += char;
            if (char === inString && input[i - 1] !== '\\') {
                inString = false;
            }
        } else if (inComment) {
            formatted += char;
            if (inComment === 'single' && char === '\n') {
                inComment = false;
            } else if (inComment === 'multi' && char === '*' && nextChar === '/') {
                inComment = false;
            }
        }
        
        if (!inString && (char === '"' || char === "'")) {
            inString = char;
        }
    }
    
    return formatted.trim();
}

// Main minify function
function minify(type) {
    const input = $('minifier-input').value;
    let output = '';
    
    switch (type) {
        case 'HTML':
            output = minifyHTML(input);
            break;
        case 'CSS':
            output = minifyCSS(input);
            break;
        case 'JS':
            output = minifyJS(input);
            break;
    }
    
    $('minifier-output').value = output;
    showNotice(`${type} minified successfully!`);
}

// Main maxify function
function maxify(type) {
    const input = $('maxifier-input').value;
    let output = '';
    
    switch (type) {
        case 'HTML':
            output = maxifyHTML(input);
            break;
        case 'CSS':
            output = maxifyCSS(input);
            break;
        case 'JS':
            output = maxifyJS(input);
            break;
    }
    
    $('maxifier-output').value = output;
    showNotice(`${type} maxified (formatted) successfully!`);
}

// Clear functions
function clearMinifier() {
    $('minifier-input').value = '';
    $('minifier-output').value = '';
    showNotice('Minifier cleared!');
}

function clearMaxifier() {
    $('maxifier-input').value = '';
    $('maxifier-output').value = '';
    showNotice('Maxifier cleared!');
}

// Function to copy output to clipboard
function copyToClipboard(elementId) {
    const outputElement = $(elementId);
    outputElement.select();
    document.execCommand('copy');
    showNotice('Copied to clipboard!');
}

// Utility function to show notices
function showNotice(message) {
    const notice = $('notice');
    notice.textContent = message;
    notice.style.display = 'block';
    notice.style.backgroundColor = '#4CAF50';
    notice.style.color = 'white';
    setTimeout(() => {
        notice.style.display = 'none';
    }, 3000);
}

// Event listeners
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
        const action = e.target.textContent.split(' ')[0].toLowerCase();
        const type = e.target.textContent.split(' ')[1];
        if (action === 'minify' || action === 'maxify') {
            window[action](type);
        }
    });
});

$('minifier-input').addEventListener('input', () => {
    $('minifier-output').value = '';
});

$('maxifier-input').addEventListener('input', () => {
    $('maxifier-output').value = '';
});