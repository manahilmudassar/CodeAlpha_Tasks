/**
 * Interactive Image Gallery Logic
 * 36 Images included with optimized loading and strict filtering.
 */

// Image Data Array (36 Images - Removed Hamster, Turtle, Old Stone Entrance, Corridor Walk)
const images = [
    // --- USER PROVIDED IMAGES ---
    { id: 1, src: 'https://z-cdn-media.chatglm.cn/files/8171f9f9-790e-4c91-b8ce-bc93cd4d9282.png?auth_key=1884831696-aa2b96e543db48a8a30fb2b48560fff3-0-b602671fd37736021a8e8195ca81b17d', category: 'food', title: 'Healthy Eggplant & Salad Plate' },
    { id: 2, src: 'https://z-cdn-media.chatglm.cn/files/bf76c7dd-b1ee-470b-bc01-89aab5692502.png?auth_key=1884831696-9977ef0944cd4aa0a965ee47f0cb9a66-0-1093b5cc740f8463e893451839993f0e', category: 'tech', title: 'Digital Global Connectivity Network' },

    // --- FOOD (6) ---
    { id: 3, src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80', category: 'food', title: 'Salad Bowl' },
    { id: 4, src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80', category: 'food', title: 'Gourmet Pizza' },
    { id: 5, src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80', category: 'food', title: 'Lunch' },
    { id: 6, src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80', category: 'food', title: 'Pancakes' },
    { id: 7, src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80', category: 'food', title: 'Burger & Fries' },

    // --- TECH (6) ---
    { id: 8, src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80', category: 'tech', title: 'Circuit Board' },
    { id: 9, src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80', category: 'tech', title: 'Workspace Setup' },
    { id: 10, src: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80', category: 'tech', title: 'Laptop Code' },
    { id: 11, src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80', category: 'tech', title: 'Modern Laptop' },
    { id: 12, src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80', category: 'tech', title: 'Matrix Data' },

    // --- NATURE (5) ---
    { id: 13, src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80', category: 'nature', title: 'Mountain Mist' },
    { id: 14, src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80', category: 'nature', title: 'Lake Reflection' },
    { id: 15, src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80', category: 'nature', title: 'Forest Sunrays' },
    { id: 16, src: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=80', category: 'nature', title: 'Green Valley' },
    { id: 17, src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80', category: 'nature', title: 'Ocean Cliff' },

    // --- CITY (5) ---
    { id: 18, src: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=800&q=80', category: 'city', title: 'City Architecture' },
    { id: 19, src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80', category: 'city', title: 'Paris Street' },
    { id: 20, src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80', category: 'city', title: 'Alleyway' },
    { id: 21, src: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=800&q=80', category: 'city', title: 'Tokyo Intersection' },
    { id: 22, src: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80', category: 'city', title: 'Night City Walk' },

    // --- ANIMALS (3) ---
    { id: 23, src: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80', category: 'animals', title: 'Tiger' },
    { id: 25, src: 'https://z-cdn-media.chatglm.cn/files/22d2ea08-fdcb-4fe5-b151-62963af3b2dd.png?auth_key=1884833003-fb4f1e1511b248d68ae0214c9a6f1ead-0-11e5a6ff91b8c391d58bb472d59253fb', category: 'animals', title: 'Cute Cat' },
    { id: 27, src: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80', category: 'animals', title: 'Husky Dog' },

    // --- CARS (5) ---
    { id: 28, src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80', category: 'cars', title: 'Sports Car' },
    { id: 29, src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80', category: 'cars', title: 'Yellow Offroad' },
    { id: 30, src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80', category: 'cars', title: 'Race Prep' },
    { id: 31, src: 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80', category: 'cars', title: 'Wheel Detail' },
    { id: 32, src: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80', category: 'cars', title: 'Vintage Coupe' },

    // --- ARCHITECTURE (6) ---
    { id: 33, src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80', category: 'architecture', title: 'Modern Curves' },
    { id: 34, src: 'https://images.unsplash.com/photo-1496564203457-11bb12075d90?auto=format&fit=crop&w=800&q=80', category: 'architecture', title: 'Stairwell' },
    { id: 35, src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80', category: 'architecture', title: 'Symmetrical Design' },
    { id: 37, src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', category: 'architecture', title: 'Office Interior' },
    { id: 38, src: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=800&q=80', category: 'architecture', title: 'Library View' },
    { id: 39, src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80', category: 'architecture', title: 'Glass Facade' }
];

// DOM Elements
const galleryGrid = document.getElementById('galleryGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const caption = document.getElementById('caption');
const closeBtn = document.getElementById('closeLightbox');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// State variables
let currentImageIndex = 0;
let currentFilteredImages = [];

/**
 * Initialize Filter Button Counts
 * Dynamically calculates how many images are in each category and appends it to the button text.
 */
function initFilterCounts() {
    filterBtns.forEach(btn => {
        const cat = btn.dataset.filter;
        const count = images.filter(img => cat === 'all' || img.category === cat).length;
        // Capitalize first letter for display
        const name = cat.charAt(0).toUpperCase() + cat.slice(1);
        btn.innerText = `${name} (${count})`;
    });
}

/**
 * Render Gallery Items based on category filter
 */
function renderGallery(filter = 'all') {
    galleryGrid.innerHTML = '';
    
    // Strictly filter images based on category
    currentFilteredImages = images.filter(img => filter === 'all' || img.category === filter);
    
    // Loop through filtered images and create DOM elements
    currentFilteredImages.forEach((image, index) => {
        const item = document.createElement('div');
        item.classList.add('gallery-item');
        item.dataset.index = index;
        
        item.innerHTML = `
            <img src="${image.src}" alt="${image.title}" loading="lazy">
            <div class="overlay">
                <h3>${image.title}</h3>
                <p>${image.category}</p>
            </div>
        `;
        
        // Add click event listener to open lightbox
        item.addEventListener('click', () => openLightbox(index));
        
        galleryGrid.appendChild(item);
        
        // Trigger CSS transition for staggered fade-in (Capped delay for performance)
        setTimeout(() => {
            item.classList.add('visible');
        }, Math.min(30 * index, 600)); 
    });
}

/**
 * Lightbox Functions
 */
function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

function updateLightboxImage() {
    const image = currentFilteredImages[currentImageIndex];
    if (image) {
        lightboxImg.src = image.src;
        caption.innerText = `${image.title} (${currentImageIndex + 1} / ${currentFilteredImages.length})`;
    }
}

function nextImage() {
    // Use modulo to loop back to the first image if at the end
    currentImageIndex = (currentImageIndex + 1) % currentFilteredImages.length;
    updateLightboxImage();
}

function prevImage() {
    // Use modulo to loop to the last image if at the beginning
    currentImageIndex = (currentImageIndex - 1 + currentFilteredImages.length) % currentFilteredImages.length;
    updateLightboxImage();
}

/**
 * Event Listeners
 */
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Re-render gallery with selected filter
        renderGallery(btn.dataset.filter);
    });
});

// Lightbox controls
closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });
prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });

// Close lightbox if clicking outside the image/buttons
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
    }
});

// Keyboard Navigation for Lightbox
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape': closeLightbox(); break;
        case 'ArrowRight': nextImage(); break;
        case 'ArrowLeft': prevImage(); break;
    }
});

// Initialize Gallery on Page Load
initFilterCounts();
renderGallery();