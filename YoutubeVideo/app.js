class Video {
    #playBtn = HTMLButtonElement;
    #volumeBtn = HTMLButtonElement;
    #miniPlayerBtn = HTMLButtonElement;
    #theaterModeBtn = HTMLButtonElement;
    #fullScreenBtn = HTMLButtonElement;

    #volumeRange = HTMLInputElement;

    #videoElement = HTMLVideoElement;
    #videoTimelineElement = HTMLDivElement;

    #isThumbShow = Boolean;
    #isPlay = Boolean;
    #isMute = Boolean;
    #isMiniMode = Boolean;
    #isTheaterMode = Boolean;
    #isFullScreen = Boolean;

    #volumeValue = Number;
    #seekValue = Number;

    constructor() {
        this.#playBtn = document.querySelector("#playBtn");
        this.#volumeBtn = document.querySelector("#volumeBtn");
        this.#miniPlayerBtn = document.querySelector("#miniPlayerBtn");
        this.#theaterModeBtn = document.querySelector("#theaterModeBtn");
        this.#fullScreenBtn = document.querySelector("#fullScreenBtn");

        this.#volumeRange = document.querySelector("#volumeRange");

        this.#videoElement = document.querySelector("#videoElement");
        this.#videoTimelineElement = document.querySelector(".video--timeline");

        this.#isThumbShow = true;
        this.#isPlay = false;
        this.#isMute = false;
        this.#isMiniMode = false;
        this.#isTheaterMode = false;
        this.#isFullScreen = false;

        this.#volumeValue = 1;
        this.#seekValue = 5;
    }

    #eventHandle() {
        const playHandle = this.#play.bind(this);
        const volumeHandle = this.#volume.bind(this);
        const updateVolumeHandle = this.#updateVolume.bind(this);
        const updateTotalDurationHandle = this.#updateTotalDuration.bind(this);
        const updateCurrentDurationHandle =
            this.#updateCurrentDuration.bind(this);
        const videoEndedHandle = this.#end.bind(this);
        const miniPlayerModeHandle = this.#miniPlayer.bind(this);
        const leaveMiniPlayerModeHandle = this.#leaveMiniPlayer.bind(this);
        const theaterModeHandle = this.#theaterMode.bind(this);
        const fullScreenHandle = this.#fullScreen.bind(this);
        const timelineHandle = this.#updateTimeline.bind(this);
        const seekHandle = this.#seek.bind(this);

        this.#videoElement.onloadeddata = function () {
            let totalTime = this.duration;

            updateTotalDurationHandle(totalTime);
        };

        this.#playBtn.onclick = function () {
            playHandle();
        };

        this.#volumeBtn.onclick = function () {
            volumeHandle();
        };

        this.#volumeRange.oninput = function () {
            let volValue = this.value;
            updateVolumeHandle(volValue);
        };

        this.#videoElement.ontimeupdate = function () {
            let currentTime = this.currentTime;
            updateCurrentDurationHandle(currentTime);
        };

        this.#videoElement.onended = function () {
            videoEndedHandle();
        };

        this.#miniPlayerBtn.onclick = function () {
            miniPlayerModeHandle();
        };

        this.#videoElement.addEventListener(
            "leavepictureinpicture",
            function () {
                leaveMiniPlayerModeHandle();
            }
        );

        this.#theaterModeBtn.onclick = function () {
            theaterModeHandle();
        };

        this.#fullScreenBtn.onclick = function () {
            fullScreenHandle();
        };

        this.#videoTimelineElement.onclick = function (e) {
            let rect = this.getBoundingClientRect();

            const percent =
                Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;

            timelineHandle(percent);
        };

        document.addEventListener("keydown", (e) => {
            switch (e.key.toLowerCase()) {
                case " ":
                case "k":
                    playHandle();
                    break;
                case "m":
                    volumeHandle();
                    break;
                case "i":
                    miniPlayerModeHandle();
                    break;
                case "t":
                    theaterModeHandle();
                    break;
                case "f":
                    fullScreenHandle();
                    break;
                case "arrowright":
                    seekHandle("right");
                    break;
                case "arrowleft":
                    seekHandle("left");
                    break;
            }
        });
    }

    #play() {
        // Hide thumb image video
        if (this.#isThumbShow) {
            this.#isThumbShow = false;
            document
                .querySelector(".video--thumb")
                .setAttribute("data-show", "false");
        }

        // Update state of video
        this.#isPlay = !this.#isPlay;

        // Play / pause base on state of video
        if (this.#isPlay) {
            // Update icon on play button
            this.#playBtn.innerHTML = `
                <svg class="pause-icon" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M14,19H18V5H14M6,19H10V5H6V19Z"
                    />
                </svg>
            `;

            // Play video
            this.#videoElement.play();
        } else {
            // Update icon on play button
            this.#playBtn.innerHTML = `
                <svg class="play-icon" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M8,5.14V19.14L19,12.14L8,5.14Z"
                    />
                </svg>
            `;

            // Pause video
            this.#videoElement.pause();
        }
    }

    #volume() {
        // Update state volume of video
        this.#isMute = !this.#isMute;

        // Mute / unmute sounds of video
        if (this.#isMute) {
            this.#volumeBtn.innerHTML = `
                <svg viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"
                    />
                </svg>
            `;

            // Mute video
            this.#videoElement.muted = true;

            // Update volume range
            this.#volumeRange.value = 0;
        } else {
            let volumeIcon =
                this.#volumeValue > 0.5
                    ? `   <svg class="volume-high-icon" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
                    />
                </svg>`
                    : `
                <svg class="volume-low-icon" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z"
                    />
                </svg>
            `;

            this.#volumeBtn.innerHTML = volumeIcon;

            // Unmute video
            this.#videoElement.muted = false;

            // Update volume range
            this.#volumeRange.value = this.#volumeValue;
        }
    }

    #updateVolume(value) {
        // Update and setup volume value
        this.#volumeValue = value;
        this.#videoElement.volume = this.#volumeValue;

        // Show icon volume
        let volumeIcon =
            this.#volumeValue > 0.5
                ? `   <svg class="volume-high-icon" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
                    />
                </svg>`
                : `
                <svg class="volume-low-icon" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z"
                    />
                </svg>
            `;

        this.#volumeBtn.innerHTML = volumeIcon;
    }

    #updateTotalDuration(time) {
        document.querySelector("#videoDurationTotal").innerText =
            this.#formatDuration(time);
    }

    #updateCurrentDuration(time) {
        document.querySelector("#videoDurationCurrent").innerText =
            this.#formatDuration(time);

        document.querySelector("#videoTimelineCurrent").style.width = `
            ${(time / this.#videoElement.duration) * 100}%
        `;
    }

    #leadingZeroFormatter = new Intl.NumberFormat(undefined, {
        minimumIntegerDigits: 2,
    });

    #formatDuration(time) {
        const seconds = Math.floor(time % 60);
        const minutes = Math.floor(time / 60) % 60;
        const hours = Math.floor(time / 3600);

        if (hours === 0) {
            return `${minutes}:${this.#leadingZeroFormatter.format(seconds)}`;
        } else {
            return `${hours}:${this.#leadingZeroFormatter.format(
                minutes
            )}:${this.#leadingZeroFormatter.format(seconds)}`;
        }
    }

    #end() {
        this.#isPlay = false;

        // Update icon on play button
        this.#playBtn.innerHTML = `
            <svg class="play-icon" viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M8,5.14V19.14L19,12.14L8,5.14Z"
                />
            </svg>
        `;

        // Pause video
        this.#videoElement.pause();
    }

    #miniPlayer() {
        this.#isMiniMode = !this.#isMiniMode;

        if (this.#isMiniMode) {
            this.#videoElement.requestPictureInPicture();
        } else {
            document.exitPictureInPicture();
        }
    }

    #leaveMiniPlayer() {
        if (!this.#isPlay) {
            return;
        }

        this.#play();
    }

    #theaterMode() {
        this.#isTheaterMode = !this.#isTheaterMode;

        document
            .querySelector(".video")
            .setAttribute("data-theater", `${this.#isTheaterMode}`);
    }

    #fullScreen() {
        this.#isFullScreen = !this.#isFullScreen;

        if (this.#isFullScreen && document.fullscreenElement == null) {
            document.querySelector(".video").requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    #updateTimeline(percent) {
        let time = this.#videoElement.duration * percent;

        if (!this.#isPlay) {
            this.#play();
        }

        this.#videoElement.currentTime = time;
        this.#updateCurrentDuration(time);
    }

    #seek(option) {
        switch (option) {
            case "right":
                this.#videoElement.currentTime += this.#seekValue;
                break;
            case "left":
                this.#videoElement.currentTime -= this.#seekValue;
                break;
        }
    }

    start() {
        // Listen Event
        this.#eventHandle();

        // Set volumn range value
        this.#volumeRange.value = this.#volumeValue;
    }
}

let youtubeVideo = new Video();

youtubeVideo.start();
