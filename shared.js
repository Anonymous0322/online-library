// shared.js - injects header/footer and provides notification/chat helpers
(function(){
  function applyLanguage(lang){
    try{
      if(!I18N[lang]) lang = 'uz';
      document.documentElement.setAttribute('data-lang', lang);
      // set html lang attribute for accessibility and assistive tech
      try{ document.documentElement.lang = lang; }catch(e){}
      // translate all elements with data-i18n
      document.querySelectorAll('[data-i18n]').forEach(el=>{
        const key = el.getAttribute('data-i18n');
        if(I18N[lang][key]) el.textContent = I18N[lang][key];
      });
      // update dynamic placeholders
      const searchInput = document.getElementById('searchInputShared');
      if(searchInput) searchInput.placeholder = I18N[lang].search_placeholder;
      // update account label if present
      const accLabel = document.querySelector('.account-label');
      if(accLabel) accLabel.textContent = I18N[lang].account_label;
      // translate profile label if any element refers to profile
      document.querySelectorAll('[data-i18n="profile"]').forEach(el=>{ if(I18N[lang].profile) el.textContent = I18N[lang].profile; });
      // store selection
      localStorage.setItem('site_lang', lang);
      // Try to translate in-page static text by replacing known Uzbek source phrases
      try{ translatePage(lang); }catch(e){ /* non-fatal */ }
    }catch(e){ console.warn('applyLanguage failed', e); }
  }

  // Replace Uzbek source phrases across visible text nodes with translations for `lang`.
  // This is a best-effort approach: it replaces substrings that exactly match the Uzbek source
  // from I18N. It avoids script/style/input areas.
  function translatePage(lang){
    if(!I18N || !I18N.uz) return;
    const keys = Object.keys(I18N.uz);
    if(!keys.length) return;

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    const skipTags = new Set(['SCRIPT','STYLE','TEXTAREA','CODE','PRE','NOSCRIPT']);
    let node;
    while(node = walker.nextNode()){
      try{
        const parent = node.parentElement;
        if(!parent) continue;
        if(skipTags.has(parent.tagName)) continue;
        if(parent.closest && parent.closest('[data-noi18n]')) continue;
        let text = node.nodeValue;
        if(!text || !text.trim()) continue;
        let replaced = text;
        keys.forEach(k=>{
          const src = I18N.uz[k];
          const tgt = (I18N[lang] && I18N[lang][k]) ? I18N[lang][k] : src;
          if(src && src !== tgt && replaced.indexOf(src) !== -1){
            // global replace of exact substring
            replaced = replaced.split(src).join(tgt);
          }
        });
        if(replaced !== text){ node.nodeValue = replaced; }
      }catch(e){ /* ignore node errors */ }
    }
  }
  // Header and footer template copied from index.html simplified
  const headerHtml = `
  <nav class="top-nav">
    <div class="container">
      <div class="nav-left">
        <a href="/index.html" class="nav-link"><span data-i18n="nav_mybooks">Mening Kitoblarim</span></a>
            <div class="dropdown">
          
          
</div>
      </div>
      
      <div class="nav-right">
        <div class="language-selector" id="languageSelectorShared">
          <span class="lang-current" id="langCurrent">O'zbek</span>
          <div class="lang-chooser" id="langChooser">
            <button class="lang-item" data-lang="uz">O'zbek</button>
            <button class="lang-item" data-lang="ru">Русский</button>
            <button class="lang-item" data-lang="en">English</button>
          </div>
        </div>
        <div class="account-menu" id="accountMenuShared">
          <button class="account-btn" id="accountBtnShared">
            <img id="accountAvatarSharedImg" class="account-avatar" src="/images/avatar-placeholder.jpg" alt="Account" />
            <span class="account-label" data-i18n="account_label">Account</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="account-dropdown" id="accountDropdownShared">
            <button class="account-item" id="profileShared">Profile</button>
            <button class="account-item" id="switchAccountShared">Hisob almashtrish</button>
            <button class="account-item danger" id="logoutShared">Hisobdan chiqish</button>
          </div>
        </div>
        <div id="authSection">
          <a href="pages/login.html" class="btn btn-primary">Kirish</a>
          <a href="pages/register.html" class="btn btn-outline">Ro'yxatdan o'tish</a>
      </div>
      </div>
    </div>
  </nav>
  <header class="main-header">
    <div class="container">
      <div class="header-content">
        <div class="logo-section">
          <a href="/index.html" class="logo">
            <i class="fas fa-book-open"></i>
            <span>Online Kutubxona</span>
          </a>
        </div>
        <div class="search-section" id="searchSectionPlaceholder"></div>

        <div class="header-actions">
          <button id="themeToggleShared" class="icon-btn" title="Tema o'zgartirish">
            <i class="fas fa-moon"></i>
          </button>
          <div class="notification-bell" id="notificationBellShared">
            <div class="bell-container">
              <i class="fas fa-bell bell-icon"></i>
              <span class="notification-badge" id="notificationBadgeShared">0</span>
            </div>
            <div class="notification-dropdown" id="notificationDropdownShared">
              <div class="notification-header">
                <h3>Bildirishnomalar</h3>
                <button class="mark-all-read" id="markAllReadShared">Barchasini o'qilgan deb belgilash</button>
              </div>
              <div class="notification-list" id="notificationListShared">
                <div class="notification-empty">
                  <i class="fas fa-bell-slash"></i>
                  <p>Hozircha bildirishnoma yo'q</p>
                </div>
              </div>
              <div class="notification-footer">
                <button class="view-all-btn" id="viewAllNotificationsShared">
                  <i class="fas fa-chevron-down"></i>
                  Barchasini ko'rish
                </button>
              </div>
            </div>
          </div>
        </div>

        <script>
          // Add event listener for the view all button
          document.getElementById('viewAllNotificationsShared')?.addEventListener('click', function() {
            const dropdown = document.getElementById('notificationDropdownShared');
            dropdown.classList.toggle('expanded');
            
            // Change the icon and text based on expanded state
            const button = this;
            if (dropdown.classList.contains('expanded')) {
              button.innerHTML = '<i class="fas fa-chevron-up"></i> Yopish';
            } else {
              button.innerHTML = '<i class="fas fa-chevron-down"></i> Barchasini ko\'rish';
            }
          });
        </script>
      </div>
    </div>
  </header>
`;

  const footerHtml = `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Online Kutubxona</h3>
          <ul>
            <li><a href="#">Vizyon</a></li>
            <li><a href="#">Ko'ngilli</a></li>
            <li><a href="#">Biz bilan Hamkorlik</a></li>
            <li><a href="#">Ish O'rinlari</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Kashf Etish</h3>
          <ul>
            <li><a href="/index.html">Bosh Sahifa</a></li>
            <li><a href="/pages/books.html">Kitoblar</a></li>
            <li><a href="#">Mualliflar</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Yordam</h3>
          <ul>
            <li><a href="/pages/profile.html">Profil</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© <span id="yearShared"></span> Online Kutubxona. Barcha huquqlar himoyalangan.</p>
      </div>
    </div>
  </footer>
`;

  // Insert templates into placeholders
  function inject() {
    // Ensure Font Awesome is available on pages that don't include it
    try{
      if(!document.querySelector('link[href*="font-awesome"]')){
        const fa = document.createElement('link');
        fa.rel = 'stylesheet';
        fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(fa);
      }
    }catch(e){console.warn('could not inject font-awesome', e)}

    const headerPlace = document.getElementById('siteHeader');
    const footerPlace = document.getElementById('siteFooter');
    if (headerPlace) headerPlace.innerHTML = headerHtml;
    if (footerPlace) footerPlace.innerHTML = footerHtml;

    // Set year
    const yearEl = document.getElementById('yearShared');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // initialize theme
    initTheme();

    // Language: apply stored language and wire selector
    try{
      const savedLang = localStorage.getItem('site_lang') || 'uz';
      applyLanguage(savedLang);
      const langCurrent = document.getElementById('langCurrent');
      const langChooser = document.getElementById('langChooser');
      if(langCurrent && langChooser){
        langCurrent.addEventListener('click', function(e){ e.stopPropagation(); langChooser.classList.toggle('show'); });
        document.addEventListener('click', function(e){ if(!langCurrent.contains(e.target) && !langChooser.contains(e.target)) langChooser.classList.remove('show'); });
        langChooser.querySelectorAll('.lang-item').forEach(btn=>{
          btn.addEventListener('click', function(){ const l = btn.getAttribute('data-lang'); applyLanguage(l); langCurrent.textContent = btn.textContent; langChooser.classList.remove('show'); });
        });
      }
    }catch(e){ console.warn('language wiring failed', e); }

    // Only show the search form on the homepage
    try{
      const path = (window.location.pathname || '').replace(/\\/g, '/');
      const isHome = path.endsWith('/index.html') || path === '/' || path === '' || (new RegExp('(^|/)index\\.html$')).test(path);
      const searchPlaceholder = document.getElementById('searchSectionPlaceholder');
      if(searchPlaceholder){
        if(isHome){
          searchPlaceholder.innerHTML = `
            <form id="searchFormShared" class="search-form">
              <div class="search-input-group">
                <input id="searchInputShared" class="search-input" type="search" placeholder="Kitob, muallif yoki mavzu qidiring..." />
                <button type="submit" class="search-btn">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </form>`;
        } else {
          searchPlaceholder.innerHTML = '';
        }
      }
      // If we're on the homepage, ensure any header text-profile buttons are removed so avatar is used
      if(isHome){
        try{ document.querySelectorAll('#siteHeader .profile-text-btn').forEach(n=>n.remove()); }catch(e){}
      }
    }catch(e){console.warn('search placeholder error', e)}

    // If user is not logged in, hide notification and chat controls and skip realtime wiring
    try{
      const user = JSON.parse(localStorage.getItem('user')||'{}');
      const bellEl = document.getElementById('notificationBellShared');
      const chatEl = document.getElementById('chatToggleShared');
      const authSection = document.getElementById('authSection');
      if(!user || !user.uid){
        if(bellEl) bellEl.style.display = 'none';
        if(chatEl) chatEl.style.display = 'none';
        // keep auth links (already present) — ensure login/register visible
        if(authSection) authSection.style.display = 'flex';
        return; // skip setting up notification handlers
      } else {
        // If user is logged in, show a Profile button (styled primary) unless we're already on the profile page.
        if(authSection){
          try{
            const curPath = (window.location.pathname || '').replace(/\\/g, '/');
            const onProfile = curPath.endsWith('/pages/profile.html') || curPath.endsWith('/profile.html') || (new RegExp('(^|/)profile\\.html$')).test(curPath);
            if(onProfile){
              authSection.innerHTML = '';
            } else {
              // On homepage we want the profile option inside the Account dropdown instead of visible in header
              if(isHome){
                // Do not inject the extra homepage avatar; leave authSection empty so only the account control remains
                authSection.innerHTML = '';
                // account dropdown still contains Profile as first item
              } else {
                // Show avatar (if available) or initials as button linking to profile
                const photo = (user && user.photoURL) ? user.photoURL : '/images/avatar-placeholder.jpg';
                const name = (user && user.name) ? user.name : (user && user.email) ? user.email.split('@')[0] : 'Profil';
                const initials = name.split(' ').map(p=>p[0]).slice(0,2).join('').toUpperCase();
                authSection.innerHTML = `
                  <div class="profile-area">
                    <a href="/pages/profile.html" class="btn btn-outline profile-text-btn">Profil</a>
                    <a href="/pages/profile.html" class="profile-avatar-btn" title="Profil">
                      <img src="${photo}" alt="${name}" class="header-avatar" onerror="this.src='/images/avatar-placeholder.jpg'" />
                    </a>
                  </div>`;
              }
            }
          }catch(err){ 
            // fallback: keep authSection empty (no extra avatar)
            authSection.innerHTML = '';
          }
        }
      }

    }catch(err){ console.warn('shared.inject user check failed', err); }

    // initialize notification handlers (for logged-in users)
    setupNotificationHandlers();

    // Set account avatar images if user available
    try{
      const userObj = JSON.parse(localStorage.getItem('user')||'{}');
      const accountImg = document.getElementById('accountAvatarSharedImg');
      const homeAvatarBtn = document.getElementById('accountAvatarHome');
      const photo = (userObj && userObj.photoURL) ? userObj.photoURL : '/images/avatar-placeholder.jpg';
      if(accountImg) accountImg.src = photo;
      if(homeAvatarBtn){
        const img = homeAvatarBtn.querySelector('img');
        if(img) img.src = photo;
      }
    }catch(e){ /* noop */ }

    // Account dropdown wiring (toggle and actions)
    try{
      const accountBtn = document.getElementById('accountBtnShared');
      const accountDropdown = document.getElementById('accountDropdownShared');
      const switchBtn = document.getElementById('switchAccountShared');
      const logoutBtn = document.getElementById('logoutShared');
      const profileBtn = document.getElementById('profileShared');
      const langCurrent = document.getElementById('langCurrent');
      // set current label from storage
      try{ if(langCurrent){ const stored = localStorage.getItem('site_lang') || 'uz'; const btn = document.querySelector(`#langChooser .lang-item[data-lang="${stored}"]`); if(btn) langCurrent.textContent = btn.textContent; } }catch(e){}
      const accountAvatarHome = document.getElementById('accountAvatarHome');
      if(accountBtn && accountDropdown){
        accountBtn.addEventListener('click', function(e){ e.stopPropagation(); accountDropdown.classList.toggle('show'); });
        // also let homepage avatar toggle
        if(accountAvatarHome){ accountAvatarHome.addEventListener('click', function(e){ e.stopPropagation(); accountDropdown.classList.toggle('show'); }); }
        document.addEventListener('click', function(e){ if(!accountBtn.contains(e.target) && !(accountAvatarHome && accountAvatarHome.contains(e.target)) && !accountDropdown.contains(e.target)) accountDropdown.classList.remove('show'); });
      }
      if(profileBtn){ profileBtn.addEventListener('click', function(){ window.location.href = '/pages/profile.html'; }); }
      if(switchBtn){ switchBtn.addEventListener('click', function(){ localStorage.removeItem('user'); window.location.href = '/pages/login.html'; }); }
      if(logoutBtn){ logoutBtn.addEventListener('click', function(){ localStorage.removeItem('user'); window.location.href = '/pages/login.html'; }); }
    }catch(e){ console.warn('account dropdown wiring failed', e); }
  }

  // THEME MANAGEMENT
  function applyTheme(isDark){
    try{
      if(isDark){
        document.documentElement.classList.add('ol-dark');
      } else {
        document.documentElement.classList.remove('ol-dark');
      }
      // update header toggle icon/text if present
      const sharedBtn = document.getElementById('themeToggleShared');
      if(sharedBtn){
        sharedBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      }
      // update any page-level toggle with id themeToggle
      const pageToggle = document.getElementById('themeToggle');
      if(pageToggle){
        pageToggle.textContent = isDark ? '☀️' : '🌙';
      }
    }catch(e){console.warn('applyTheme failed', e)}
  }

  function initTheme(){
    const saved = localStorage.getItem('ol_theme') || localStorage.getItem('darkTheme');
    const isDark = saved === 'dark' || saved === 'true';
    applyTheme(isDark);

    // signal other scripts that theme is centrally handled
    window.__shared_theme_handled = true;

    // Header toggle
    const sharedBtn = document.getElementById('themeToggleShared');
    if(sharedBtn){
      sharedBtn.addEventListener('click', function(){
        const nowDark = !document.documentElement.classList.contains('ol-dark');
        localStorage.setItem('ol_theme', nowDark ? 'dark' : 'light');
        applyTheme(nowDark);
      });
    }

    // Also bind any page-level toggle (id=themeToggle) to use the same behavior
    const pageBtn = document.getElementById('themeToggle');
    if(pageBtn){
      pageBtn.addEventListener('click', function(){
        const nowDark = !document.documentElement.classList.contains('ol-dark');
        localStorage.setItem('ol_theme', nowDark ? 'dark' : 'light');
        applyTheme(nowDark);
      });
    }
  }

  // Notification handlers (simple front-end + Firebase realtime if available)
  function setupNotificationHandlers(){
    const bell = document.getElementById('notificationBellShared');
    const dropdown = document.getElementById('notificationDropdownShared');
    const badge = document.getElementById('notificationBadgeShared');
    const list = document.getElementById('notificationListShared');
    const markAll = document.getElementById('markAllReadShared');

  const user = JSON.parse(localStorage.getItem('user')||'{}');
  // If there is no logged-in user, do not wire notifications
  if(!user || !user.uid) return;

  if(!bell) return;

    bell.addEventListener('click', function(e){
      e.stopPropagation();
      dropdown.classList.toggle('show');
      const bellIcon = bell.querySelector('.bell-icon');
      if(bellIcon) {
        bellIcon.style.animation = 'ring 0.6s ease';
        setTimeout(()=> bellIcon.style.animation = '', 600);
      }
    });

    document.addEventListener('click', function(e){
      if(!bell.contains(e.target)) dropdown.classList.remove('show');
    });

    markAll && markAll.addEventListener('click', function(){
      const unread = list.querySelectorAll('.notification-item.unread');
      unread.forEach(i => i.classList.remove('unread'));
      badge.textContent = '0'; badge.style.display = 'none';
    });

    // Try wiring firebase if available
    if(window.firebase && firebase.database){
      try{
        const user = JSON.parse(localStorage.getItem('user')||'{}');
        const messagesRef = firebase.database().ref('messages');
        messagesRef.on('child_added', snapshot=>{
          const messages = snapshot.val();
          if(messages){
            Object.values(messages).forEach(m=>{
              // create notif
              createNotification(m.senderName||'Anon', m.text||'Yangi xabar');
            });
          }
        });
      }catch(err){
        console.warn('Firebase notifications failed', err);
      }
    }

    function createNotification(sender, text){
      if(!list) return;
      const item = document.createElement('div');
      item.className = 'notification-item unread';
      item.innerHTML = `<div class="notification-icon">💬</div><div class="notification-content"><div class="notification-text"><strong>${sender}</strong>: ${text}</div><div class="notification-time">Hozir</div></div>`;
      item.dataset.message = text;

      // Open preview modal when clicked
      item.addEventListener('click', function(){
        openNotificationPreview(sender, text);
        item.classList.remove('unread');
        updateBadge();
      });
      list.insertBefore(item, list.firstChild);
      // update badge
      const count = list.querySelectorAll('.notification-item.unread').length;
      badge.textContent = count; badge.style.display = 'flex';
      // short auto remove
      setTimeout(()=>{ if(item.parentNode) item.remove(); updateBadge(); }, 7000);
    }

    function openNotificationPreview(sender, text) {
      // Create modal
      const modal = document.createElement('div');
      modal.className = 'notification-modal-overlay';
      modal.innerHTML = `
        <div class="notification-modal">
          <div class="notification-modal-header">
            <strong>${sender}</strong>
            <button class="close-modal">×</button>
          </div>
          <div class="notification-modal-body">${text}</div>
          <div class="notification-modal-footer">
            <a href="/pages/message.html" class="btn btn-primary">To'liq xabarlarga o'tish</a>
          </div>
        </div>
      `;

      document.body.appendChild(modal);
      modal.querySelector('.close-modal').addEventListener('click', ()=> modal.remove());
      modal.addEventListener('click', (e)=>{ if(e.target === modal) modal.remove(); });
      // auto remove after 6s
      setTimeout(()=>{ if(modal.parentNode) modal.remove(); }, 6000);
    }

    function updateBadge(){
      const count = list.querySelectorAll('.notification-item.unread').length;
      if(count>0){ badge.textContent = count; badge.style.display='flex'; } else { badge.style.display='none'; }
    }
  }

  // Expose inject to window for pages to call after load
  window.__shared_inject = inject;
})();
