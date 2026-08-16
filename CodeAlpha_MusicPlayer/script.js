/**
 * Music Player Logic
 * Handles play/pause, next/prev, progress, volume, and playlist.
 */

// Song Data Array (Using SoundHelix royalty-free audio)
const songs = [
    {
        title: "Sunset Drive",
        artist: "Synthwave Master",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=80"
    },
    {
        title: "Electric Dreams",
        artist: "Cyber Pop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=500&q=80"
    },
    {
        title: "Acoustic Breeze",
        artist: "Indie Strings",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=500&q=80"
    },
    {
        title: "Midnight Jazz",
        artist: "Smooth Collective",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        cover: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=500&q=80"
    }
];

// DOM Elements
const audio = document.getElementById('audio');
const titleEl = document.getElementById('title');
const artistEl = document.getElementById('artist');
const albumArt = document.getElementById('album-art');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volume = document.getElementById('volume');
const muteBtn = document.getElementById('mute-btn');
const playlistEl = document.getElementById('playlist');

let currentSongIndex = 0;
let isMuted = false;
let previousVolume = 1;

/**
 * Initialize Player
 */
function initPlayer() {
    loadSong(songs[currentSongIndex]);
    renderPlaylist();
}

/**
 * Load a song into the player
 */
function loadSong(song) {
    titleEl.innerText = song.title;
    artistEl.innerText = song.artist;
    audio.src = song.src;
    albumArt.src = song.cover;
    
    // Update active song in playlist
    updatePlaylistActive();
}

/**
 * Render Playlist dynamically
 */
function renderPlaylist() {
    playlistEl.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${song.title}</span><span>${song.artist}</span>`;
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(songs[currentSongIndex]);
            playSong();
        });
        playlistEl.appendChild(li);
    });
    updatePlaylistActive();
}

/**
 * Highlight the currently playing song in the playlist
 */
function updatePlaylistActive() {
    const items = playlistEl.querySelectorAll('li');
    items.forEach((item, index) => {
        if (index === currentSongIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

/**
 * Play Song
 */
function playSong() {
    playBtn.querySelector('i').classList.remove('fa-play');
    playBtn.querySelector('i').classList.add('fa-pause');
    albumArt.classList.add('playing');
    audio.play();
}

/**
 * Pause Song
 */
function pauseSong() {
    playBtn.querySelector('i').classList.remove('fa-pause');
    playBtn.querySelector('i').classList.add('fa-play');
    albumArt.classList.remove('playing');
    audio.pause();
}

/**
 * Previous Song
 */
function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(songs[currentSongIndex]);
    playSong();
}

/**
 * Next Song
 */
function nextSong() {
    currentSongIndex++;
    if (currentSongIndex > songs.length - 1) {
        currentSongIndex = 0;
    }
    loadSong(songs[currentSongIndex]);
    playSong();
}

/**
 * Update Progress Bar and Time
 */
function updateProgress() {
    const duration = audio.duration;
    const currentTime = audio.currentTime;
    const progressPercent = (currentTime / duration) * 100;
    
    progress.value = progressPercent;
    
    // Update Time Displays
    currentTimeEl.innerText = formatTime(currentTime);
    durationEl.innerText = formatTime(duration);
}

/**
 * Set Progress when user clicks/drags the bar
 */
function setProgress() {
    const duration = audio.duration;
    audio.currentTime = (progress.value / 100) * duration;
}

/**
 * Format time into MM:SS
 */
function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

/**
 * Set Volume
 */
function setVolume() {
    audio.volume = volume.value;
    
    if (audio.volume === 0) {
        muteBtn.querySelector('i').className = 'fas fa-volume-xmark';
        isMuted = true;
    } else {
        muteBtn.querySelector('i').className = 'fas fa-volume-high';
        isMuted = false;
    }
}

/**
 * Toggle Mute
 */
function toggleMute() {
    if (isMuted) {
        volume.value = previousVolume;
        audio.volume = previousVolume;
        muteBtn.querySelector('i').className = 'fas fa-volume-high';
    } else {
        previousVolume = volume.value;
        volume.value = 0;
        audio.volume = 0;
        muteBtn.querySelector('i').className = 'fas fa-volume-xmark';
    }
    isMuted = !isMuted;
}

/**
 * Event Listeners
 */
playBtn.addEventListener('click', () => {
    const isPlaying = playBtn.querySelector('i').classList.contains('fa-pause');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong); // Autoplay next song when current ends

progress.addEventListener('input', setProgress);
volume.addEventListener('input', setVolume);
muteBtn.addEventListener('click', toggleMute);

// Initialize
initPlayer();