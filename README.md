Front-End Development Tasks Portfolio:
This repository contains a collection of front-end development tasks built using pure HTML5, CSS3, and Vanilla JavaScript. No external frameworks or libraries (like React, Vue, or Tailwind) were used, with the exception of Font Awesome icons for the music player.
Project Overview:
This project encompasses three distinct web applications designed to showcase core front-end development skills: DOM manipulation, responsive layout design, state management, event handling, and dynamic UI rendering.
Folder Structure:
It is recommended to place these files in their respective folders to keep the project organized:
front-end-portfolio/│├── task-1-image-gallery/│   ├── index.html│   ├── style.css│   └── script.js│├── task-2-calculator/│   ├── index.html│   ├── style.css│   └── script.js│└── task-4-music-player/    ├── index.html    ├── style.css    └── script.js
Task 1: Interactive Image Gallery
A responsive, interactive image gallery featuring a filtering system, a full-screen lightbox view, next/prev navigation, and smooth hover/transition animations.
Features
•	Dynamic Filtering: Filter images by categories (Food, Tech, Nature, City, Animals, Cars, Architecture) with dynamic count badges.
•	Lightbox Modal: Full-screen view with caption and image counter (e.g., 1/36).
•	Navigation: Next/Previous buttons inside the lightbox, strictly cycling through the currently filtered images.
•	Keyboard Support: Arrow keys (Left/Right) for navigation and Escape to close the lightbox.
•	Optimized Loading: Uses loading="lazy" for images and capped staggered fade-in animations for performance.
•	Hover Effects: Image zoom, dark gradient overlay displaying title and category.
How to Run
1.	Navigate to the task-1-image-gallery folder.
2.	Open index.html in your web browser.
Task 2: Modern Interactive Calculator:
A sleek, fully functional calculator built with Vanilla JavaScript. It performs arithmetic operations safely without using the dangerous eval() function.
Features
•	Arithmetic Operations: Addition, Subtraction, Multiplication, Division.
•	Real-Time Display: Dual-screen layout showing calculation history and current input.
•	Utility Functions: All Clear (AC), Delete (DEL), and Percentage (%) calculations.
•	Error Handling: Gracefully catches division by zero with an "Error" message and shake animation.
•	Safe Logic: Uses custom parsing and calculation logic (No eval()).
•	Responsive Design: Adapts to mobile, tablet, and desktop screens.
Bonus Features
•	Full Keyboard Support:
•	Numbers: 0-9
•	Operators: +, -, *, /
•	Calculate: Enter or =
•	Clear All: Escape
•	Delete Last: Backspace
•	Styling Enhancements: 3D button press animations, gradient backgrounds, and a shake animation on errors.
How to Run
1.	Navigate to the task-2-calculator folder.
2.	Open index.html in your web browser.
Task 4: JavaScript Music Player”
A modern music player featuring a glassmorphism UI, complete audio controls, a playlist, and an auto-spinning vinyl album art animation.
Features
•	Audio Controls: Play, Pause, Next, and Previous track functionality.
•	Track Details: Displays current song title, artist name, and album artwork.
•	Seekable Progress Bar: Displays elapsed time and total duration. Users can click and drag to seek through the track.
•	Volume Control: Slider to adjust volume and a mute/unmute toggle button.
•	Playlist: A scrollable, clickable playlist that highlights the currently active track.
Bonus Features
•	Autoplay: Automatically plays the next track when the current one ends.
•	Visual Polish: Album art rotates like a vinyl record while playing and pauses when the music is paused.
•	Glassmorphism UI: Modern, translucent design with backdrop blur effects.
How to Run
1.	Navigate to the task-4-music-player folder.
2.	Open index.html in your web browser. (Requires an internet connection to load the royalty-free SoundHelix audio tracks and Unsplash images).
