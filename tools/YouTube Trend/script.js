document.getElementById('searchBtn').addEventListener('click', () => {
    const country = document.getElementById('countrySelect').value;
    const numResults = document.getElementById('numResults').value;
    
    // Clear previous results
    document.getElementById('results').innerHTML = '';

    // YouTube API key (provided by you)
    const apiKey = 'AIzaSyC6HmQx6FKGqAhyGh2rGjR7tSknmXjF1so';

    // API call to get trending videos
    fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=${country}&maxResults=${numResults}&key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        if (data.items && data.items.length > 0) {
            data.items.forEach(video => {
                const videoElement = `
                    <div class="video-card">
                        <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}">
                        <h3>${video.snippet.title}</h3>
                        <p>Channel: ${video.snippet.channelTitle}</p>
                        <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank">Watch on YouTube</a>
                    </div>
                `;
                document.getElementById('results').innerHTML += videoElement;
            });
        } else {
            document.getElementById('results').innerHTML = '<p>No trending videos found.</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching trending videos:', error);
        document.getElementById('results').innerHTML = '<p>An error occurred while fetching trending videos.</p>';
    });
});
