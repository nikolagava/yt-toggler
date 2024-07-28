javascript: (function () {
    if (window.location.hostname !== 'www.youtube.com') {
        return;
    }

    const url = window.location.href;

    if (url.includes("watch")) {
        const regExp = /v=([^&]*)/gm; /* only take 'v' parameter, ignore the rest */
        const match = regExp.exec(url);

        if (match.length == 2) {
            window.location.href = `https://www.youtube.com/shorts/${match[1]}`;
        } else {
            console.log("Couldn't match Youtube Video", url);
        }
    } else if (url.includes("shorts")) {
        const regExp = /\/shorts\/(.*)/gm;
        const match = regExp.exec(url);

        var videoTimeSeconds = null;

        const videoProgressBar = document.querySelector("div.PlayerControlsProgressBarHost");
        if (videoProgressBar) {
            const videoPercentage = Number(videoProgressBar.getAttribute("aria-valuenow"));
            const adaptiveFormats = ytInitialPlayerResponse?.streamingData?.adaptiveFormats;

            if (videoPercentage && adaptiveFormats && adaptiveFormats.length > 0) {
                /* take any format and get video duration from it */
                const randomFormat = adaptiveFormats[Math.floor(Math.random() * adaptiveFormats.length)];

                if (randomFormat && randomFormat.approxDurationMs) {
                    const shortDuration = Number(randomFormat.approxDurationMs / 1000);
                    videoTimeSeconds = parseInt(Number(videoPercentage / 100 * shortDuration));
                }
            }
        }

        if (match.length == 2) {
            const v = `v=${match[1]}`;
            const t = videoTimeSeconds && videoTimeSeconds > 0 ? `&t=${videoTimeSeconds}s` : '';
            window.location.href = `https://www.youtube.com/watch?${v}${t}`
        } else {
            console.log("Couldn't match Youtube Short", url);
        }
    }
})();