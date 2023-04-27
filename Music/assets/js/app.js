// Define class Music
class Music {
    #openListBtn = HTMLElement;
    #closeListBtn = HTMLElement;
    #nextBtn = HTMLElement;
    #playBtn = HTMLElement;
    #prevBtn = HTMLElement;
    #repeatBtn = HTMLElement;
    #musicBar = HTMLElement;
    #musicCurrentTime = HTMLElement;
    #musicDuration = HTMLElement;
    #musicProgress = HTMLElement;
    #musicAudio = HTMLElement;
    #musicPlaylist = HTMLElement;

    #musics = Array;
    #isPlaying = Boolean;
    #isRepeatSong = Boolean;
    #currentSongIndex = Number;

    constructor(musics) {
        this.#openListBtn = document.querySelector("#openListBtn");
        this.#closeListBtn = document.querySelector("#closeListBtn");
        this.#prevBtn = document.querySelector("#musicPrevBtn");
        this.#playBtn = document.querySelector("#musicPlayBtn");
        this.#nextBtn = document.querySelector("#musicNextBtn");
        this.#repeatBtn = document.querySelector("#musicRepeatBtn");
        this.#musicBar = document.querySelector("#musicBar");
        this.#musicCurrentTime = document.querySelector("#musicCurrentTime");
        this.#musicDuration = document.querySelector("#musicDuration");
        this.#musicProgress = document.querySelector("#musicProgress");
        this.#musicAudio = document.querySelector("#musicAudio");
        this.#musicPlaylist = document.querySelector("#musicPlaylist");

        this.#musics = musics || [];
        this.#isPlaying = false;
        this.#isRepeatSong = false;
        this.#currentSongIndex = 0;

        this.#createPlaylist();
    }

    #handleEvent() {
        const playHandle = this.#play.bind(this);
        const nextHandle = this.#next.bind(this);
        const prevHandle = this.#prev.bind(this);
        const repeatHandle = this.#repeat.bind(this);
        const barHandle = this.#barUpdate.bind(this);
        const timeUpdateHandle = this.#progress.bind(this);
        const loadedDataHandle = this.#loadData.bind(this);
        const endedHandle = this.#ended.bind(this);
        const showPlaylistHandle = this.#showPlaylist.bind(this);
        const closePlaylistHandle = this.#closePlaylist.bind(this);
        const updateHandle = this.#update.bind(this);

        // Play / pause song
        this.#playBtn.onclick = playHandle;

        // Next song
        this.#nextBtn.onclick = nextHandle;

        // Prev song
        this.#prevBtn.onclick = prevHandle;

        // Repeat song
        this.#repeatBtn.onclick = repeatHandle;

        // Update progress and time
        this.#musicAudio.ontimeupdate = function (e) {
            timeUpdateHandle(e.target);

            // Update time
            loadedDataHandle(e.target);
        };

        // Main music loaded data
        this.#musicAudio.onloadeddata = function (e) {
            loadedDataHandle(e.target);
        };

        // Update time
        this.#musicBar.onclick = function (e) {
            barHandle(e);
        };

        // Audio on end
        this.#musicAudio.onended = endedHandle;

        // Show playlist
        this.#openListBtn.onclick = function () {
            // show playlist song
            showPlaylistHandle();
        };

        // Close playlist
        this.#closeListBtn.onclick = function () {
            // close playlist song
            closePlaylistHandle();
        };

        // Event when click song in playlist
        let musicBoxs = this.#musicPlaylist.querySelectorAll(".music--box");

        musicBoxs.forEach((musicBox, index) => {
            musicBox.onclick = function () {
                // close playlist song
                closePlaylistHandle();
                updateHandle(index);
            };
        });
    }

    #createPlaylist() {
        let musicList = document.createElement("div");
        musicList.classList.add("music--list");

        this.#musics.map(({ name, artist, imgSrc }, index) => {
            musicList.innerHTML += `
                <div class="music--box" data-playing="${
                    index === this.#currentSongIndex ? "true" : "false"
                }">
                    <div class="music--box__img">
                        <img
                            src="${imgSrc}"
                            alt="${name} by ${artist}"
                        />
                    </div>
                    <div class="music--box__content">
                        <h6 class="music--box__name">${name}</h6>
                        <p class="music--box__artist">${artist}</p>
                    </div>
                </div>
            `;
        });

        this.#musicPlaylist.appendChild(musicList);
    }

    #show() {
        // Get info current song
        const { name, artist, imgSrc, audioSrc } =
            this.#musics[this.#currentSongIndex];

        // Show info
        const musicCdImage = document.querySelector(".music--cd img");
        const musicName = document.querySelector(".music--name");
        const musicArtist = document.querySelector(".music--artist");

        musicCdImage.setAttribute("src", imgSrc);
        musicName.innerText = name;
        musicArtist.innerText = artist;
        this.#musicAudio.setAttribute("src", audioSrc);
    }

    #showPlaylist() {
        this.#musicPlaylist.setAttribute("data-show", "true");
    }

    #closePlaylist() {
        this.#musicPlaylist.setAttribute("data-show", "false");
    }

    #spinCd() {
        const musicCd = document.querySelector(".music--cd");

        if (this.#isPlaying) {
            this.#playBtn.innerHTML = `<span class="material-icons"> pause </span>`;
            // Start spin image
            musicCd.setAttribute("data-spin", "true");
        } else {
            this.#playBtn.innerHTML = `<span class="material-icons"> play_arrow </span>`;
            // Pause spin image
            musicCd.setAttribute("data-spin", "false");
        }
    }

    #play() {
        this.#isPlaying = !this.#isPlaying;

        if (this.#isPlaying) {
            this.#musicAudio.play();
        } else {
            this.#musicAudio.pause();
        }

        this.#spinCd();
    }

    #next() {
        this.#currentSongIndex++;

        if (this.#currentSongIndex > this.#musics.length - 1) {
            this.#currentSongIndex = 0;
        }

        // Show song
        this.#show();

        // Play song
        this.#isPlaying = true;
        this.#musicAudio.play();

        // spin image
        this.#spinCd();
    }

    #prev() {
        this.#currentSongIndex--;
        if (this.#currentSongIndex < 0) {
            this.#currentSongIndex = this.#musics.length - 1;
        }

        // Show song
        this.#show();

        // Play song
        this.#isPlaying = true;
        this.#musicAudio.play();

        // spin image
        this.#spinCd();
    }

    #repeat() {
        this.#isRepeatSong = !this.#isRepeatSong;
        this.#repeatBtn.setAttribute("data-repeat", `${this.#isRepeatSong}`);
    }

    #progress(e) {
        const { currentTime, duration } = e;
        let progressWidth = (currentTime / duration) * 100;
        this.#musicProgress.style.width = `${progressWidth}%`;
    }

    #loadData(e) {
        const { currentTime, duration } = e;

        let totalMin = Math.floor(duration / 60);
        let totalSec = Math.floor(duration % 60);
        if (totalMin < 10) totalMin = `0${totalMin}`;
        if (totalSec < 10) totalSec = `0${totalSec}`;

        let currentlMin = Math.floor(currentTime / 60);
        let currentlSec = Math.floor(currentTime % 60);
        if (currentlMin < 10) currentlMin = `0${currentlMin}`;
        if (currentlSec < 10) currentlSec = `0${currentlSec}`;

        this.#musicCurrentTime.innerText = `${currentlMin}:${currentlSec}`;
        this.#musicDuration.innerText = `${totalMin}:${totalSec}`;
    }

    #ended() {
        if (this.#isRepeatSong) {
            // Play song again
            this.#isPlaying = true;
            this.#musicAudio.play();
        } else {
            this.#next();
        }
    }

    #barUpdate(e) {
        let musicBarWidthVal = this.#musicBar.clientWidth;
        let clickedOffSetX = e.offsetX;
        let songDuration = this.#musicAudio.duration;

        this.#musicAudio.currentTime =
            (clickedOffSetX / musicBarWidthVal) * songDuration;

        // Play song
        this.#isPlaying = true;
        this.#musicAudio.play();

        // spin image
        this.#spinCd();
    }

    #update(songCurrentIndex) {
        if (this.#currentSongIndex === songCurrentIndex) {
            return;
        }

        this.#currentSongIndex = songCurrentIndex;

        this.#musicPlaylist
            .querySelectorAll(".music--box")
            .forEach((item, index) => {
                songCurrentIndex === index
                    ? item.setAttribute("data-playing", "true")
                    : item.setAttribute("data-playing", "false");
            });

        // Show song
        this.#show();

        // Play song
        this.#isPlaying = true;
        this.#musicAudio.play();

        // spin image
        this.#spinCd();
    }

    start() {
        // Event listener
        this.#handleEvent();

        // Show song
        this.#show();
    }
}

// Variables
let musics = [
    {
        name: "2002",
        artist: "Anne Marie",
        imgSrc: "https://i1.sndcdn.com/artworks-000372374865-gkxr1g-t500x500.jpg",
        audioSrc: "https://tainhacmienphi.biz/download-music/325932",
    },
    {
        name: "left and right",
        artist: "charlie puth, jungkook",
        imgSrc: "https://i.ytimg.com/vi/mxi14CfMjEk/hqdefault.jpg",
        audioSrc: "https://tainhacmienphi.biz/download-music/414481",
    },
    {
        name: "glimpse of us",
        artist: "joji",
        imgSrc: "https://i.ytimg.com/vi/s0JJxPyhOH0/maxresdefault.jpg",
        audioSrc: "https://tainhacmienphi.biz/download-music/408927",
    },
    {
        name: "double take",
        artist: "dhruv",
        imgSrc: "https://i.ytimg.com/vi/Tx_gaWQh42U/maxresdefault.jpg",
        audioSrc: "https://tainhacmienphi.biz/download-music/288203",
    },
    {
        name: "abcdefu",
        artist: "gayle",
        imgSrc: "https://i.pinimg.com/originals/b2/93/e0/b293e0c3ca51d359106393ea1ed0afb2.jpg",
        audioSrc: "https://tainhacmienphi.biz/download-music/361215",
    },
    {
        name: "that girl",
        artist: "olly murs",
        imgSrc: "https://i.ytimg.com/vi/3q2IXr6fjh0/maxresdefault.jpg",
        audioSrc: "https://tainhacmienphi.biz/download-music/11",
    },
    {
        name: "Until I Found You",
        artist: "Stephen Sanchez",
        imgSrc: "https://cdn-2.tstatic.net/tribunnews/foto/bank/images/until-i-found-you-dipopulerkan-oleh-penyanyi-stephen-sanchez.jpg",
        audioSrc: "https://tainhacmienphi.biz/download-music/432324",
    },
    {
        name: "sugar",
        artist: "maroon 5",
        imgSrc: "https://avatar-nct.nixcdn.com/song/2018/06/22/0/c/c/b/1529655970762_640.jpg",
        audioSrc: "https://tainhacmienphi.biz/download-music/116",
    },
    {
        name: "All Falls Down",
        artist: "Alan Walker, Noah Cyrus, Digital Farm Animals",
        imgSrc: "https://avatar-nct.nixcdn.com/song/2017/10/27/9/d/8/d/1509093543890_640.jpg",
        audioSrc: "https://tainhacmienphi.biz/download-music/399",
    },
    {
        name: "faded",
        artist: "alan walker",
        imgSrc: "https://avatar-nct.nixcdn.com/song/2017/11/20/f/c/e/7/1511141429975_640.jpg",
        audioSrc: "https://tainhacmienphi.biz/download-music/413",
    },
];

// Function
function init() {
    let music = new Music(musics);
    music.start();
}

// Event Listener
document.addEventListener("DOMContentLoaded", init);
