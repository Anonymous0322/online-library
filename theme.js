// theme.js - barcha sahifalar uchun
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('themeToggle');
    this.init();
  }

  init() {
    if (this.themeToggle) {
      // If shared.js handles theme globally, defer to it
      if (window.__shared_theme_handled) {
        // sync initial state with shared manager
        const isDark = localStorage.getItem('ol_theme') === 'dark' || localStorage.getItem('darkTheme') === 'true';
        document.documentElement.classList.toggle('ol-dark', isDark);
        this.themeToggle.textContent = isDark ? '☀️' : '🌙';
        return;
      }

      this.initializeTheme();
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  }

  initializeTheme() {
    const isDark = localStorage.getItem('darkTheme') === 'true';
    if (isDark) {
      document.body.classList.add('ol-dark');
      this.themeToggle.textContent = '☀️';
    } else {
      document.body.classList.remove('ol-dark');
      this.themeToggle.textContent = '🌙';
    }
  }

  toggleTheme() {
    const isDark = document.body.classList.toggle('ol-dark');
    localStorage.setItem('darkTheme', isDark);
    this.themeToggle.textContent = isDark ? '☀️' : '🌙';
  }
}

// Sahifa yuklanganda ishga tushirish
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
});