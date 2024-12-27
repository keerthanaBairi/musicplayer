const audio = document.getElementById('audio');
const audioSource = document.getElementById('audio-source');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const songName = document.getElementById('song-name');

// Store the list of songs and the current song index
let currentSongIndex = 0;
let songs = [];

// Fetch song list from backend
fetch('/api/songs')
    .then(response => response.json())
    .then(data => {
        songs = data.songs;
        loadSong(currentSongIndex);
    });

// Load song based on the index
function loadSong(index) {
    audioSource.src = `/music/${songs[index]}`;
    audio.load(); // Reload audio to update the source
    songName.textContent = songs[index];
}

// Toggle play/pause functionality
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        audio.pause();
        playPauseBtn.textContent = 'Play';
    }
}

// Play next song
function playNext() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playPauseBtn.textContent = 'Pause';
}

// Play previous song
function playPrev() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playPauseBtn.textContent = 'Pause';
}

// Event listeners
playPauseBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrev);

// Automatically play next song when current song ends
audio.addEventListener('ended', playNext);
