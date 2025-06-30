const songs = [
  {
    title: "Sapphire",
    artist: "Ed Sheeran",
    src: "music/song1.mp3",
    image: "images/song1.jpg"
  },
  {
    title: "Faded",
    artist: "Alan Walker",
    src: "music/song2.mp3",
    image: "images/song2.jpg"
  }
];

let currentSongIndex = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");
const playlist = document.getElementById("playlist");

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  cover.src = song.image;
  highlightPlaylist(index);
}

function playSong() {
  audio.play();
  playBtn.textContent = "⏸";
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶️";
}

function togglePlayPause() {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  playSong();
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  playSong();
}

function updateProgress() {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent || 0;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
}

function setProgress(e) {
  const value = e.target.value;
  audio.currentTime = (value / 100) * audio.duration;
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

function changeVolume(e) {
  audio.volume = e.target.value;
}

function highlightPlaylist(index) {
  const items = document.querySelectorAll("#playlist li");
  items.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

function buildPlaylist() {
  songs.forEach((song, i) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener("click", () => {
      currentSongIndex = i;
      loadSong(i);
      playSong();
    });
    playlist.appendChild(li);
  });
}

// Event Listeners
playBtn.addEventListener("click", togglePlayPause);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong);
progress.addEventListener("input", setProgress);
volumeSlider.addEventListener("input", changeVolume);

// Init
buildPlaylist();
loadSong(currentSongIndex);
