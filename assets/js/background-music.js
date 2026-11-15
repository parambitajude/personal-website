document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("background-music");
    const toggle = document.getElementById("music-toggle");
    const label = toggle
        ? toggle.querySelector(".music-toggle-label")
        : null;
    const status = document.getElementById("music-status");

    if (!(audio instanceof HTMLAudioElement) ||
        !(toggle instanceof HTMLButtonElement) ||
        !label ||
        !(status instanceof HTMLElement)) {
        console.error("Background music player markup is incomplete.");
        return;
    }

    const updatePlaybackState = () => {
        const isPlaying = !audio.paused;
        label.textContent = isPlaying ? "Pause music" : "Play music";
        toggle.setAttribute("aria-label", isPlaying
            ? "Pause background music"
            : "Play background music");
        toggle.setAttribute("aria-pressed", String(isPlaying));

        if (isPlaying) {
            status.hidden = true;
        }
    };

    toggle.addEventListener("click", async () => {
        if (!audio.paused) {
            audio.pause();
            return;
        }

        status.hidden = true;

        try {
            await audio.play();
        } catch (error) {
            status.textContent = audio.error
                ? "The browser cannot play pogisong.mp3. Check that it is a valid MP3 audio file."
                : "Music could not start. Please try again.";
            status.hidden = false;
            console.error("Background music could not be played.", error);
        }
    });

    audio.addEventListener("play", updatePlaybackState);
    audio.addEventListener("pause", updatePlaybackState);
    audio.addEventListener("error", () => {
        status.textContent =
            "The browser cannot play pogisong.mp3. Check that it is a valid MP3 audio file.";
        status.hidden = false;
        console.error("Background music asset could not be loaded.", audio.error);
        updatePlaybackState();
    });
});
