// Firebase konfiguratsiyasi
const firebaseConfig = {
    apiKey: "AIzaSyDICLwZdvBwXEqam4i3CHdz7lq4hPjx_g8",
    authDomain: "onlinelibrary-2025.firebaseapp.com",
    projectId: "onlinelibrary-2025",
    storageBucket: "onlinelibrary-2025.firebasestorage.app",
    messagingSenderId: "994522635573",
    appId: "1:994522635573:web:64c304a2a0d7a6d849007c",
    measurementId: "G-NFRDRHWGM7"
};

// Kitoblar karuseli
function initializeCarousel() {
    const carousel = document.getElementById('featuredBooks');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const featuredDotsContainer = document.getElementById('carouselDots');
    
    if (!carousel || !prevButton || !nextButton || !featuredDotsContainer) return;

    // Kitoblar ma'lumotlari
    const books = [
        {
            title: "O'tkan Kunlar",
            author: "Abdulla Qodiriy",
            cover: "images/books/sample-cover-1.jpg",
            rating: 4.8,
            year: 1926,
            pages: 420,
            description: "O'zbek adabiyotining eng sara asarlaridan biri"
        },
        {
            title: "Kecha va Kunduz",
            author: "Cho'lpon",
            cover: "images/books/sample-cover-2.jpg",
            rating: 4.6,
            year: 1936,
            pages: 320,
            description: "XX asr o'zbek adabiyotining nodir namunasi"
        },
        {
            title: "Ulug' Bek",
            author: "Adil Yaqubov",
            cover: "images/books/sample-cover-3.jpg",
            rating: 4.7,
            year: 1974,
            pages: 480,
            description: "Buyuk alloma haqidagi tarixiy roman"
        },
        {
            title: "Dunyoning Ishlari",
            author: "O'tkir Hoshimov",
            cover: "images/books/sample-cover-4.jpg",
            rating: 4.9,
            year: 1990,
            pages: 320,
            description: "Hayotiy voqealar asosida yozilgan qissa"
        },
        {
            title: "Psixologiya Asoslari",
            author: "Karim Qodirov", 
            cover: "images/books/sample-cover-5.jpg",
            rating: 4.3,
            year: 2015,
            pages: 360,
            description: "Zamonaviy psixologiya bo'yicha qo'llanma"
        },
        {
          title: "Dunyoning Ishlarigdfg",
          author: "O'tkir Hoshimov",
          cover: "images/books/sample-cover-5.jpg",
          rating: 4.9,
          category: "fiction",
          description: "Hayotiy hikoyalar to'plami bo'lib, kundalik hayotdan lavhalar aks etgan"
        },
        {
          title: "Dunyoniasdasdng Ishlari",
          author: "O'tkir Hoshimov",
          cover: "images/books/sample-cover-5.jpg",
          rating: 4.9,
          category: "fiction",
          description: "Hayotiy hikoyalar to'plami bo'lib, kundalik hayotdan lavhalar aks etgan"
        },
        {
          title: "Dunyasasfoning Ishlari",
          author: "O'tkir Hoshimov",
          cover: "images/books/sample-cover-5.jpg",
          rating: 4.9,
          category: "fiction",
          description: "Hayotiy hikoyalar to'plami bo'lib, kundalik hayotdan lavhalar aks etgan"
        },
        {
          title: "Dunyoning Ishlari",
          author: "O'tkir Hoshimov",
          cover: "images/books/sample-cover-5.jpg",
          rating: 4.9,
          category: "fiction",
          description: "Hayotiy hikoyalar to'plami bo'lib, kundalik hayotdan lavhalar aks etgan"
        },
        {
          title: "Dunyoning Ishlari",
          author: "O'tkir Hoshimov",
          cover: "images/books/sample-cover-5.jpg",
          rating: 4.9,
          category: "fiction",
          description: "Hayotiy hikoyalar to'plami bo'lib, kundalik hayotdan lavhalar aks etgan"
        },
        {
          title: "Dunyoning Ishlari",
          author: "O'tkir Hoshimov",
          cover: "images/books/sample-cover-5.jpg",
          rating: 4.9,
          category: "fiction",
          description: "Hayotiy hikoyalar to'plami bo'lib, kundalik hayotdan lavhalar aks etgan"
        },
        {
          title: "Dunyoning Ishlari",
          author: "O'tkir Hoshimov",
          cover: "images/books/sample-cover-5.jpg",
          rating: 4.9,
          category: "fiction",
          description: "Hayotiy hikoyalar to'plami bo'lib, kundalik hayotdan lavhalar aks etgan"
        }
    ];

    let currentIndex = 0;
    const itemsPerPage = 3;
    const totalPages = Math.ceil(books.length / itemsPerPage);

    function createBookCard(book) {
        return `
            <div class="book-card">
                <div class="book-cover">
                    <img src="${book.cover}" alt="${book.title}" loading="lazy">
                    <div class="book-actions">
                        <button class="action-btn read-btn">
                            <i class="fas fa-book-open"></i>
                            O'qish
                        </button>
                        <button class="action-btn save-btn">
                            <i class="fas fa-bookmark"></i>
                            Saqlash
                        </button>
                    </div>
                </div>
                <div class="book-info">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">${book.author}</p>
                    <div class="book-rating">
                        ${generateStars(book.rating)}
                        <span class="rating-value">${book.rating}</span>
                    </div>
                    <div class="book-meta">
                        <span class="year">${book.year}</span>
                        <span class="pages">${book.pages} bet</span>
                    </div>
                </div>
            </div>
        `;
    }
    

    
    

    function generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === fullStars && hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    }

    function updateCarousel() {
        const start = currentIndex * itemsPerPage;
        const end = start + itemsPerPage;
        const visibleBooks = books.slice(start, end);
        
        carousel.innerHTML = visibleBooks.map(book => createBookCard(book)).join('');
        updateDots();
        updateButtons();
    }

    function createDots() {
        featuredDotsContainer.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Sahifa ${i + 1}`);
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
            });
            featuredDotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        const dots = featuredDotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function updateButtons() {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === totalPages - 1;
    }

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < totalPages - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Initialize carousel
    createDots();
    updateCarousel();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
});

// Firebase ni ishga tushirish
if (typeof firebase !== 'undefined' && firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

// Asosiy funksiyalar
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupTheme();
    setupSearch();
    setupAuth();
    loadPopularBooks();
    setupSlider();
    updateFooterYear();
}



    let currentIndex = 0;
    const itemsPerPage = 3;
    const totalPages = Math.ceil(booksData.length / itemsPerPage);

    function createBookCard(book) {
        return `
            <div class="book-card">
                <div class="book-cover">
                    <img src="${book.cover}" alt="${book.title}" loading="lazy">
                    <div class="book-actions">
                        <button class="action-btn read-btn">
                            <i class="fas fa-book-open"></i>
                            O'qish
                        </button>
                        <button class="action-btn save-btn">
                            <i class="fas fa-bookmark"></i>
                            Saqlash
                        </button>
                    </div>
                </div>
                <div class="book-info">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">${book.author}</p>
                    <div class="book-rating">
                        ${generateStars(book.rating)}
                        <span class="rating-value">${book.rating}</span>
                    </div>
                    <div class="book-meta">
                        <span class="year">${book.year}</span>
                        <span class="pages">${book.pages} bet</span>
                    </div>
                </div>
            </div>
        `;
    }

    function generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === fullStars && hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    }

    function updateCarousel() {
        const start = currentIndex * itemsPerPage;
        const end = start + itemsPerPage;
        const visibleBooks = booksData.slice(start, end);
        
        carousel.innerHTML = visibleBooks.map(book => createBookCard(book)).join('');
        updateDots();
        updateButtons();
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function updateButtons() {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === totalPages - 1;
    }

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < totalPages - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Kitoblarni karuselga joylashtirish
    books.forEach(book => {
        const bookCard = createBookCard(book);
        carousel.appendChild(bookCard);
    });

    // Nuqtalarni yaratish
    const dotsContainer = document.getElementById('carouselDots');
    const totalSlides = Math.ceil(books.length / 4);
    
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('data-slide', i);
        dotsContainer.appendChild(dot);
    }

    // Karusel funksionalligi
    let currentSlide = 0;
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const dots = document.querySelectorAll('.carousel-dot');

    function updateCarousel() {
        const slideWidth = carousel.offsetWidth;
        carousel.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        
        // Nuqtalarni yangilash
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    // Tugmalar uchun hodisalar
    prevButton.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    // Nuqtalar uchun hodisalar
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
            resetAutoSlide();
        });
    });

    // Avtomatik slayd
    let autoSlideInterval;
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3000); // Har 3 sekundda
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    startAutoSlide();

// Kitob kartasini yaratish funksiyasi
function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card';
    
    card.innerHTML = `
        <div class="book-cover">
            <img src="${book.cover}" alt="${book.title}" />
        </div>
        <div class="book-info">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">${book.author}</p>
            <div class="book-rating">
                <i class="fas fa-star"></i>
                <span>${book.rating}</span>
            </div>
        </div>
    `;
    
    return card;
}

// Theme sozlamalari
function setupTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('ol_theme');

    // Saqlangan temani yuklash
    if (savedTheme === 'dark') {
        root.classList.add('ol-dark');
        if (themeToggle) themeToggle.textContent = '☀️';
    }

    // Theme toggle event — if shared.js isn't handling theme already
    if (!window.__shared_theme_handled && themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = root.classList.toggle('ol-dark');
            themeToggle.textContent = isDark ? '☀️' : '🌙';
            localStorage.setItem('ol_theme', isDark ? 'dark' : 'light');
        });
    }
}

document.querySelector("#darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});


// Qidiruv tizimi
function setupSearch() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            
            if (query) {
                // Qidiruv natijalariga yo'naltirish
                window.location.href = `books.html?search=${encodeURIComponent(query)}`;
            }
        });

        // Real-time search suggestions (keyingi versiya uchun)
        searchInput.addEventListener('input', debounce(function() {
            const query = this.value.trim();
            if (query.length > 2) {
                showSearchSuggestions(query);
            }
        }, 300));
    }
}

// Debounce funksiyasi
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Qidiruv takliflari
function showSearchSuggestions(query) {
    console.log('Qidiruv takliflari:', query);
    // Keyingi versiyada amalga oshiriladi
}

// Auth tizimi
function setupAuth() {
    const authSection = document.getElementById('authSection');
    
    if (!authSection) return;

    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (userData.uid) {
        // Foydalanuvchi tizimga kirgan
        authSection.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <a href="pages/profile.html" class="btn btn-outline">
                    ${userData.name || 'Profil'}
                </a>
                <button class="btn btn-outline" onclick="logout()">
                    Chiqish
                </button>
            </div>
        `;
    } else {
        // Foydalanuvchi tizimga kirmagan
        authSection.innerHTML = `
            <a href="pages/login.html" class="btn btn-outline">Kirish</a>
        `;
    }
}

// Chiqish funksiyasi
function logout() {
    if (confirm('Hisobdan chiqishni istaysizmi?')) {
        localStorage.removeItem('user');
        localStorage.removeItem('userStats');
        
        // Firebase dan chiqish
        if (typeof firebase !== 'undefined') {
            firebase.auth().signOut().catch(error => {
                console.error('Logout error:', error);
            });
        }
        
        // Sahifani yangilash
        window.location.reload();
    }
}

// Ommabop kitoblarni yuklash
function loadPopularBooks() {
    const popularSlider = document.getElementById('popularSlider');
    
    if (!popularSlider) return;

    // Namuna kitoblar ma'lumotlari
    const popularBooks = [
        {
            id: 1,
            title: "O'tkan Kunlar",
            author: "Abdulla Qodiriy",
            cover: "images/sample-cover-1.jpg",
            rating: 4.8,
            category: "fiction"
        },
        {
            id: 2,
            title: "Kecha va Kunduz",
            author: "Cho'lpon",
            cover: "images/sample-cover-2.jpg",
            rating: 4.6,
            category: "fiction"
        },
        {
            id: 3,
            title: "Ulug' Bek",
            author: "Adil Yaqubov",
            cover: "images/sample-cover-3.jpg",
            rating: 4.7,
            category: "history"
        },
        {
            id: 4,
            title: "Sariq Devni Minib",
            author: "Xudoyberdi To'xtaboyev",
            cover: "images/sample-cover-4.jpg",
            rating: 4.5,
            category: "fiction"
        },
        {
            id: 5,
            title: "Dunyoning Ishlari",
            author: "O'tkir Hoshimov",
            cover: "images/sample-cover-5.jpg",
            rating: 4.9,
            category: "fiction"
        },
        
    ];

    // Kitob kartalarini yaratish
    popularSlider.innerHTML = popularBooks.map(book => `
        <div class="book-card">
            <img src="${book.cover}" alt="${book.title}" class="book-cover" 
                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDIwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Ik03NSA3NUgxMjVWMTI1SDc1Vjc1WiIgZmlsbD0iIzljYTViZiIvPgo8dGV4dCB4PSIxMDAiIHk9IjE3MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZjNzI4MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5LaXRvYiBtdXphkkk8L3RleHQ+Cjwvc3ZnPgo='">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">${book.author}</p>
            <div class="book-meta">
                <div class="book-rating">
                    ${'★'.repeat(Math.floor(book.rating))}${book.rating % 1 ? '½' : ''}
                    <span style="color: var(--muted-text); font-size: 0.875rem; margin-left: 4px;">
                        (${book.rating})
                    </span>
                </div>
            </div>
            <div class="book-actions">
                <button class="btn btn-primary" onclick="readBook(${book.id})" style="flex: 1;">
                    O'qish
                </button>
                <button class="icon-btn" onclick="toggleFavorite(${book.id})" title="Sevimlilarga qo'shish">
                    ♡
                </button>
            </div>
        </div>
    `).join('');
}

// Slider boshqaruvi
function setupSlider() {
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const slider = document.getElementById('popularSlider');

    if (!prevBtn || !nextBtn || !slider) return;

    const scrollAmount = 300;

    prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
}

// Kitob o'qish funksiyasi
function readBook(bookId) {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!userData.uid) {
        if (confirm("Kitob o'qish uchun tizimga kiring. Hozir kirishni istaysizmi?")) {
            window.location.href = 'pages/login.html';
        }
        return;
    }

    // O'qish sahifasiga yo'naltirish
    window.location.href = `pages/reader.html?book=${bookId}`;
}

// Sevimlilarga qo'shish
function toggleFavorite(bookId) {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!userData.uid) {
        if (confirm("Sevimlilarga qo'shish uchun tizimga kiring. Hozir kirishni istaysizmi?")) {
            window.location.href = 'pages/login.html';
        }
        return;
    }

    const favorites = JSON.parse(localStorage.getItem('favoriteBooks') || '[]');
    const isFavorite = favorites.includes(bookId);

    if (isFavorite) {
        // Olib tashlash
        const index = favorites.indexOf(bookId);
        favorites.splice(index, 1);
        showMessage('Sevimlilardan olib tashlandi', 'info');
    } else {
        // Qo'shish
        favorites.push(bookId);
        showMessage('Sevimlilarga qo\'shildi', 'success');
    }

    localStorage.setItem('favoriteBooks', JSON.stringify(favorites));
    
    // UI ni yangilash
    updateFavoriteButton(bookId, !isFavorite);
}

// Sevimlilar tugmasini yangilash
function updateFavoriteButton(bookId, isFavorite) {
    const buttons = document.querySelectorAll(`[onclick="toggleFavorite(${bookId})"]`);
    buttons.forEach(btn => {
        btn.textContent = isFavorite ? '♥' : '♡';
        btn.style.color = isFavorite ? '#ef4444' : '';
    });
}

// Xabar ko'rsatish funksiyasi
function showMessage(message, type = 'info') {
    // Mavjud xabarlarni olib tashlash
    const existingMessages = document.querySelectorAll('.message-toast');
    existingMessages.forEach(msg => msg.remove());

    const messageDiv = document.createElement('div');
    messageDiv.className = 'message-toast';
    messageDiv.textContent = message;
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };

    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        background: ${colors[type] || colors.info};
        box-shadow: var(--shadow-lg);
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        }
    }, 3000);
}

// Footer yilini yangilash
function updateFooterYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// CSS animatsiyalari
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .loading {
        position: relative;
        color: transparent !important;
    }
    
    .loading::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Global funksiyalar
window.readBook = readBook;
window.toggleFavorite = toggleFavorite;
window.logout = logout;

// PWA funksiyalari (keyingi versiya uchun)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('ServiceWorker registration failed: ', registrationError);
            });
    });
}



// Karusel funksiyasi
    document.addEventListener('DOMContentLoaded', function() {
      initializeSlider();
    });

    function initializeSlider() {
      const slider = document.getElementById('popularSlider');
      const prevBtn = document.getElementById('prevSlide');
      const nextBtn = document.getElementById('nextSlide');

      if (!slider || !prevBtn || !nextBtn) return;

      const scrollAmount = 300;
      let autoScrollInterval;

      // Karuselni yangilash
      function updateSliderControls() {
        const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
        
        if (slider.scrollLeft <= 0) {
          prevBtn.disabled = true;
        } else {
          prevBtn.disabled = false;
        }

        if (slider.scrollLeft >= maxScrollLeft - 10) {
          nextBtn.disabled = true;
        } else {
          nextBtn.disabled = false;
        }
      }

      // Tugmalar uchun event listener'lar
      prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        resetAutoScroll();
      });

      nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        resetAutoScroll();
      });

      // Scroll event'ini kuzatish
      slider.addEventListener('scroll', updateSliderControls);

      // Avtomatik aylanish
      function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
          const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
          
          if (slider.scrollLeft >= maxScrollLeft - 10) {
            // Oxiriga yetganda, boshiga qaytish
            slider.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
          }
        }, 4000); // Har 4 soniyada bir
      }

      function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        startAutoScroll();
      }

      // Boshlang'ich holatni yangilash
      setTimeout(updateSliderControls, 100);
      
      // Avtomatik aylanishni boshlash
      startAutoScroll();

      // Slider fokus olganda avtomatik aylanishni to'xtatish
      slider.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
      });

      slider.addEventListener('mouseleave', () => {
        startAutoScroll();
      });

      // Touch events for mobile
      let startX;
      let scrollLeft;

      slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        clearInterval(autoScrollInterval);
      });

      slider.addEventListener('touchmove', (e) => {
        if (!startX) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
      });

      slider.addEventListener('touchend', () => {
        startAutoScroll();
      });
    }

    // Kitob ma'lumotlarini yuklash
    function loadPopularBooks() {
      const popularSlider = document.getElementById('popularSlider');
      
      if (!popularSlider) return;

      const popularBooks = [
        {
          id: 1,
          title: "O'tkan Kunlar",
          author: "Abdulla Qodiriy",
          cover: "images/books/sample-cover-1.jpg",
          rating: 4.8,
          category: "fiction",
          description: "O'zbek adabiyotining durdona asari"
        },
        {
          id: 2,
          title: "Mehrobdan Chayon",
          author: "Cho'lpon",
          cover: "images/books/sample-cover-2.jpg",
          rating: 4.6,
          category: "fiction",
          description: "She'riy roman bo'lib, inson qalbi va hissiyotlar olamini chuqur yoritadi"
        },
        {
          id: 3,
          title: "Ulug' Bek",
          author: "Adil Yaqubov",
          cover: "images/books/sample-cover-3.jpg",
          rating: 4.7,
          category: "history",
          description: "Buyuk astronom va hukmdor Ulug' Bek hayoti va ilmiy faoliyati haqida"
        },
        {
          id: 4,
          title: "Kecha va Kunduz",
          author: "Abdulhamid Cho`lpon",
          cover: "images/books/sample-cover-4.jpg",
          rating: 4.5,
          category: "fiction",
          description: "Urush va tinchlik mavzulariga bag'ishlangan qiziqarli roman"
        },
        {
          id: 5,
          title: "Dunyoning Ishlari",
          author: "O'tkir Hoshimov",
          cover: "images/books/sample-cover-5.jpg",
          rating: 4.9,
          category: "fiction",
          description: "Hayotiy hikoyalar to'plami bo'lib, kundalik hayotdan lavhalar aks etgan"
        }
      ];

      // Kitob kartalarini yaratish
      popularSlider.innerHTML = popularBooks.map(book => `
        <div class="book-card">
          <img src="${book.cover}" alt="${book.title}" class="book-cover" 
               onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDIwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Ik03NSA3NUgxMjVWMTI1SDc1Vjc1WiIgZmlsbD0iIzljYTViZiIvPgo8dGV4dCB4PSIxMDAiIHk9IjE3MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZjNzI4MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5LaXRvYiBtdXphkkk8L3RleHQ+Cjwvc3ZnPgo='">
          <h3 class="book-title">${book.title}</h3>
          <p class="book-author">${book.author}</p>
          <div class="book-meta">
            <div class="book-rating">
              ${'★'.repeat(Math.floor(book.rating))}${book.rating % 1 ? '½' : ''}
              <span style="color: var(--muted-text); font-size: 0.875rem; margin-left: 4px;">
                (${book.rating})
              </span>
            </div>
          </div>
          <p class="book-description" style="color: var(--muted-text); font-size: 0.875rem; margin-bottom: 1rem; line-height: 1.4;">
            ${book.description}
          </p>
          <div class="book-actions">
            <button class="btn btn-primary" onclick="readBook(${book.id})" style="flex: 1;">
              O'qish
            </button>
            <button class="icon-btn" onclick="toggleFavorite(${book.id})" title="Sevimlilarga qo'shish">
              ♡
            </button>
          </div>
        </div>
      `).join('');
    }

    // Sahifa yuklanganda kitoblarni yuklash
    setTimeout(loadPopularBooks, 100);
    setTimeout(initializeSlider, 200);



    document.addEventListener('DOMContentLoaded', function(){
  if(window.__shared_inject) window.__shared_inject();

  // --- Firebase init (only if not already initialized) ---
  (function(){
    const cfg = {
      apiKey: "AIzaSyDICLwZdvBwXEqam4i3CHdz7lq4hPjx_g8",
      authDomain: "onlinelibrary-2025.firebaseapp.com",
      projectId: "onlinelibrary-2025",
      storageBucket: "onlinelibrary-2025.appspot.com",
      messagingSenderId: "994522635573",
      appId: "1:994522635573:web:64c304a2a0d7a6d849007c",
      databaseURL: "https://onlinelibrary-2025-default-rtdb.firebaseio.com/"
    };
    try {
      if (!firebase.apps || !firebase.apps.length) {
        firebase.initializeApp(cfg);
      }
    } catch (e) {
      // ignore - already initialized
    }
  })();

  (function(){
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const convoListEl = document.getElementById('convoList');
    const messagesListEl = document.getElementById('messagesList');
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const messageSendBtn = document.getElementById('messageSendBtn');    
    if (user && user.uid) {
        // User is logged in
        messageForm.classList.remove('hidden');
        messageSendBtn.classList.remove('hidden');
        convoListEl.classList.remove('hidden');
        messagesListEl.classList.remove('hidden');
        messageInput.focus();
    }   else {
        // User is not logged in
        messageForm.classList.add('hidden');
        messageSendBtn.classList.add('hidden');
        convoListEl.classList.add('hidden');
        messagesListEl.classList.add('hidden');
    }
  })();  
});



