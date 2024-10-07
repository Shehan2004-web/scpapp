document.getElementById('generate').addEventListener('click', function() {
    const url = document.getElementById('videoURL').value;
    const width = document.getElementById('width').value || 560;
    const height = document.getElementById('height').value || 315;
    const startMinute = document.getElementById('startMinute').value;
    const startSecond = document.getElementById('startSecond').value;
    const endMinute = document.getElementById('endMinute').value;
    const endSecond = document.getElementById('endSecond').value;
    const loop = document.getElementById('loop').checked ? 1 : 0;
    const autoplay = document.getElementById('autoplay').checked ? 1 : 0;
    const fullscreen = document.getElementById('fullscreen').checked ? 1 : 0;
    const controls = document.getElementById('controls').checked ? 0 : 1;
    const logo = document.getElementById('logo').checked ? 0 : 1;
    const privacy = document.getElementById('privacy').checked ? 'https://www.youtube-nocookie.com/embed/' : 'https://www.youtube.com/embed/';
    const responsive = document.getElementById('responsive').checked;

    let embedURL = `${privacy}${url.split('v=')[1].split('&')[0]}?loop=${loop}&autoplay=${autoplay}&modestbranding=${logo}&controls=${controls}&showinfo=0`;
    
    if (startMinute || startSecond) {
        const startTime = (parseInt(startMinute || 0) * 60) + (parseInt(startSecond || 0));
        embedURL += `&start=${startTime}`;
    }
    
    if (endMinute || endSecond) {
        const endTime = (parseInt(endMinute || 0) * 60) + (parseInt(endSecond || 0));
        embedURL += `&end=${endTime}`;
    }
    
    let iframeCode = `<iframe width="${width}" height="${height}" src="${embedURL}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

    if (responsive) {
        iframeCode = `<div style="position:relative;width:100%;height:0;padding-bottom:56.25%;"><iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" src="${embedURL}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
    }
    
    document.getElementById('htmlCode').value = iframeCode;
});

document.getElementById('copy').addEventListener('click', function() {
    const htmlCode = document.getElementById('htmlCode');
    htmlCode.select();
    document.execCommand('copy');
    alert('Embed code copied to clipboard');
});
