document.querySelector('button').addEventListener('click', (e) => {
    var imageLink = 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Tokyo_Sky_Tree_2012.JPG',
        downloadSize = 8185374,
        time_start, time_end,
        downloadSrc = new Image();
    time_start = new Date().getTime();
    var cacheImg = "?nn=" + time_start;
    downloadSrc.src = imageLink + cacheImg;
    downloadSrc.onload = function () {
        time_end = new Date().getTime();
        var timeDuration = (time_end - time_start) / 1000;
        loadedBytes = downloadSize * 8,
        totalSpeed = ((loadedBytes / timeDuration) / 1024 / 1024).toFixed(2);
        let i = 0, speedOut;
        document.querySelector('.loader').style.display= '';
        document.querySelector('.btn').style.display= 'none';
        const animate = () => {
            if (i < totalSpeed) {
                document.querySelector('.content').innerHTML = i.toFixed(2) + '<small>Mbps</small>';
                setTimeout(animate, 20);
                i += 1.02;
            } else {
                document.querySelector('.content').innerHTML = totalSpeed + '<small>Mbps</small>';
                document.querySelector('.loader').style.display= 'none';
                document.querySelector('.btn').style.display= '';
            }
        }
        animate();

        document.querySelector('.content').innerHTML = totalSpeed + '<small>Mbps</small>';
        document.querySelector('.loader-content').classList.add('result');
        e.target.innerText = 'CHECK AGAIN';
    }
})


document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});