function generateSitemap() {
    const url = document.getElementById('urlInput').value;
    if (url === "") {
        alert("Please enter a valid URL");
        return;
    }
    
    // Simulate sitemap generation (in real case, API or backend call needed)
    const sitemap = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${url}/</loc>
            <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
            <changefreq>daily</changefreq>
            <priority>1.00</priority>
        </url>
        <url>
            <loc>${url}/about</loc>
            <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.80</priority>
        </url>
        <url>
            <loc>${url}/contact</loc>
            <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
            <changefreq>yearly</changefreq>
            <priority>0.60</priority>
        </url>
    </urlset>`;

    document.getElementById('sitemapOutput').value = sitemap;
}

function copyToClipboard() {
    const output = document.getElementById('sitemapOutput');
    output.select();
    document.execCommand('copy');
    alert('Sitemap copied to clipboard!');
}

function clearOutput() {
    document.getElementById('sitemapOutput').value = "";
}

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});