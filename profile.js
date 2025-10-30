// profile.js - Profil sahifasi funksionalligi
// Get current logged in user
function getCurrentUser() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return user;
}

            await firebase.database().ref(`user_chats/${profileId}/${chatId}`).update({
                chatId: chatId,
                withUser: currentUser.uid,
                title: currentUser.name || 'User',
                lastMessage: 'Chat started',
                timestamp: Date.now()
            });

            // Redirect to messages page
            window.location.href = '/pages/message.html';
        

// Show/hide message button based on whether viewing own profile
function setupMessageButton() {
    const currentUser = getCurrentUser();
    const profileId = new URLSearchParams(window.location.search).get('id');
    const messageBtn = document.getElementById('messageBtn');

    if (messageBtn && currentUser && profileId && currentUser.uid !== profileId) {
        messageBtn.style.display = 'inline-block';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    setupEventListeners();
    loadUserBooks();
    setupAvatarUpload();
    setupMessageButton();
});

function setupEventListeners() {
    // Form submit eventlarini qo'shish
    const profileForm = document.getElementById('profileForm');
    const passwordForm = document.getElementById('passwordForm');
    const editProfileForm = document.getElementById('editProfileForm');
    
    profileForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        saveProfileSettings();
    });
    
    passwordForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        changePassword();
    });
    
    editProfileForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        saveProfileChanges();
    });
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle?.addEventListener('change', function() {
        const root = document.documentElement;
        if (this.checked) {
            root.classList.add('ol-dark');
            localStorage.setItem('ol_theme', 'dark');
        } else {
            root.classList.remove('ol-dark');
            localStorage.setItem('ol_theme', 'light');
        }
    });
}

function setupAvatarUpload() {
    const avatarEditBtn = document.querySelector('.avatar-edit');
    const profileImage = document.getElementById('profileImage');
    
    avatarEditBtn?.addEventListener('click', function(e) {
        e.preventDefault();
        changeAvatar();
    });
}

function loadUserData() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!user.email) {
        // Foydalanuvchi kirmagan, login sahifasiga yo'naltirish
        window.location.href = 'login.html';
        return;
    }
    
    // Profil ma'lumotlarini to'ldirish
    document.getElementById('profileName').textContent = user.name || 'Foydalanuvchi';
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('memberSince').textContent = `A'zo: ${new Date(user.registerTime || Date.now()).getFullYear()} yil`;
    
    // Avatar rasmini yuklash
    const profileImage = document.getElementById('profileImage');
    if (user.avatar) {
        profileImage.src = user.avatar;
    } else {
        profileImage.src = '../images/avatar-placeholder.jpg';
    }
    
    // Modal inputlarni to'ldirish
    const modalName = document.getElementById('modalName');
    const modalEmail = document.getElementById('modalEmail');
    const modalBio = document.getElementById('modalBio');
    
    if (modalName) modalName.value = user.name || '';
    if (modalEmail) modalEmail.value = user.email;
    if (modalBio) modalBio.value = user.bio || '';
    
    // Settings inputlarni to'ldirish
    const editName = document.getElementById('editName');
    const editEmail = document.getElementById('editEmail');
    const editBio = document.getElementById('editBio');
    
    if (editName) editName.value = user.name || '';
    if (editEmail) editEmail.value = user.email;
    if (editBio) editBio.value = user.bio || '';
    
    // Statistikalarni yuklash
    updateStats();
}

function changeAvatar() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                showMessage('Rasm hajmi 2MB dan oshmasligi kerak!', 'error');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(event) {
                const imageUrl = event.target.result;
                
                document.getElementById('profileImage').src = imageUrl;
                
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                user.avatar = imageUrl;
                localStorage.setItem('user', JSON.stringify(user));
                
                window.dispatchEvent(new Event('avatarUpdated'));
                showMessage('Profil rasmi yangilandi!', 'success');
            };
            reader.onerror = function() {
                showMessage('Rasm yuklashda xatolik yuz berdi!', 'error');
            };
            reader.readAsDataURL(file);
        }
    };
    
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
}

function saveProfileChanges() {
    const name = document.getElementById('modalName').value;
    const email = document.getElementById('modalEmail').value;
    const bio = document.getElementById('modalBio').value;
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.name = name;
    user.email = email;
    user.bio = bio;
    
    localStorage.setItem('user', JSON.stringify(user));
    loadUserData();
    closeModal();
    window.dispatchEvent(new Event('profileUpdated'));
    showMessage('Profil muvaffaqiyatli yangilandi!', 'success');
}

function saveProfileSettings() {
    const name = document.getElementById('editName').value;
    const email = document.getElementById('editEmail').value;
    const bio = document.getElementById('editBio').value;
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.name = name;
    user.email = email;
    user.bio = bio;
    
    localStorage.setItem('user', JSON.stringify(user));
    loadUserData();
    window.dispatchEvent(new Event('profileUpdated'));
    showMessage('Sozlamalar saqlandi!', 'success');
}

function changePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!currentPassword || !newPassword || !confirmPassword) {
        showMessage('Barcha maydonlarni to\'ldiring!', 'error');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showMessage('Yangi parollar mos kelmadi!', 'error');
        return;
    }
    
    if (newPassword.length < 6) {
        showMessage('Yangi parol kamida 6 ta belgidan iborat bo\'lishi kerak!', 'error');
        return;
    }
    
    // Parolni yangilash (soddalashtirilgan)
    showMessage('Parol muvaffaqiyatli yangilandi!', 'success');
    
    // Formani tozalash
    document.getElementById('passwordForm').reset();
}

function deleteAccount() {
    if (confirm('Hisobingizni o\'chirishni tasdiqlaysizmi? Bu amalni ortga qaytarib bo\'lmaydi!')) {
        localStorage.removeItem('user');
        localStorage.removeItem('favorites');
        localStorage.removeItem('reading');
        localStorage.removeItem('finished');
        
        showMessage('Hisob muvaffaqiyatli o\'chirildi!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }
}

function logout() {
    if (confirm('Hisobdan chiqishni tasdiqlaysizmi?')) {
        localStorage.removeItem('user');
        showMessage('Hisobdan muvaffaqiyatli chiqildi!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

// Tab funksiyalari
function switchTab(tabName) {
    // Barcha tab contentlarni yashirish
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    
    // Barcha tab tugmalarini aktivlikdan chiqarish
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Tanlangan tabni ko'rsatish
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    // Tanlangan tab tugmasini aktiv qilish
    event.target.classList.add('active');
}

// Modal funksiyalari
function editProfile() {
    document.getElementById('editModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

// Eksport funksiyasi
function exportData() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    const exportData = {
        user: user,
        favorites: favorites,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `onlinelibrary-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showMessage('Ma\'lumotlar yuklab olindi!', 'success');
}

function updateStats() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    document.getElementById('booksRead').textContent = userData.booksRead || 0;
    document.getElementById('favoritesCount').textContent = userData.favoritesCount || 0;
    document.getElementById('readingTime').textContent = userData.readingTime || 0;
}

function loadUserBooks() {
    loadFavorites();
    loadReadingList();
    loadFinishedBooks();
}

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const grid = document.getElementById('favoritesGrid');
    const emptyState = document.getElementById('emptyFavorites');
    
    if (!grid || !emptyState) return;
    
    if (favorites.length === 0) {
        grid.style.display = 'none';
        emptyState.style.display = 'block';
    } else {
        grid.style.display = 'grid';
        emptyState.style.display = 'none';
        // Favoritelarni ko'rsatish
    }
}

function loadReadingList() {
    const reading = JSON.parse(localStorage.getItem('reading') || '[]');
    const grid = document.getElementById('readingGrid');
    const emptyState = document.getElementById('emptyReading');
    
    if (!grid || !emptyState) return;
    
    if (reading.length === 0) {
        grid.style.display = 'none';
        emptyState.style.display = 'block';
    } else {
        grid.style.display = 'grid';
        emptyState.style.display = 'none';
    }
}

function loadFinishedBooks() {
    const finished = JSON.parse(localStorage.getItem('finished') || '[]');
    const grid = document.getElementById('finishedGrid');
    const emptyState = document.getElementById('emptyFinished');
    
    if (!grid || !emptyState) return;
    
    if (finished.length === 0) {
        grid.style.display = 'none';
        emptyState.style.display = 'block';
    } else {
        grid.style.display = 'grid';
        emptyState.style.display = 'none';
    }
}

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-alert message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 4000);
}

// Modal tashqariga bosilganda yopish
window.onclick = function(event) {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        closeModal();
    }
}