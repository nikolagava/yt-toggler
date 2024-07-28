javascript: (function () {
    if (window.location.hostname !== 'www.youtube.com') {
        return;
    }

    const url = window.location.href;

    if (url.includes("watch")) {
        const regExp = /\/watch\?v=(.*)/gm;
        const match = regExp.exec(url);

        if (match.length == 2) {
            window.location.href = `https://www.youtube.com/shorts/${match[1]}`;
        } else {
            console.log("Couldn't match Youtube Video", url);
        }

    } else if (url.includes("shorts")) {
        const regExp = /\/shorts\/(.*)/gm;
        const match = regExp.exec(url);

        if (match.length == 2) {
            window.location.href = `https://www.youtube.com/watch?v=${match[1]}`;
        } else {
            console.log("Couldn't match Youtube Short", url);
        }
    }
})();