// auth.js - compact auth helpers used by login/register pages
(function(){
  function showToast(message, type='info'){
    const el = document.createElement('div');
    el.className = `auth-toast ${type}`;
    el.textContent = message;
    el.style.cssText = 'position:fixed;right:20px;top:20px;padding:12px 16px;border-radius:8px;color:white;z-index:12000;';
    if(type==='success') el.style.background='#10b981';
    else if(type==='error') el.style.background='#ef4444';
    else el.style.background='#3b82f6';
    document.body.appendChild(el);
    setTimeout(()=> el.remove(), 3600);
  }

  function init(){
    const loginForm = document.getElementById('loginForm');
    const regForm = document.getElementById('regForm');

    if(loginForm){
      loginForm.addEventListener('submit', function(e){
        e.preventDefault();
        const email = (document.getElementById('email')||{}).value || '';
        const password = (document.getElementById('password')||{}).value || '';
        if(!email || !password){ showToast('Iltimos email va parol kiriting', 'error'); return; }
        if(window.firebase && firebase.auth){
          firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res=>{
              const u = res.user;
              const userData = { uid:u.uid, email:u.email, name:u.displayName||email.split('@')[0], loginTime: new Date().toISOString() };
              localStorage.setItem('user', JSON.stringify(userData));
              showToast('Muvaffaqiyatli kirildi', 'success');
              setTimeout(()=> window.location.href = '../index.html', 800);
            })
            .catch(err=> showToast(err.message || 'Login xatosi', 'error'));
        } else {
          localStorage.setItem('user', JSON.stringify({ uid:'guest-'+Date.now(), email, name: email.split('@')[0], loginTime: new Date().toISOString() }));
          showToast('Demo rejimida kirdingiz', 'success'); setTimeout(()=> window.location.href = '../index.html', 700);
        }
      });
    }

    if(regForm){
      regForm.addEventListener('submit', function(e){
        e.preventDefault();
        const name = (document.getElementById('rname')||{}).value || '';
        const email = (document.getElementById('remail')||{}).value || '';
        const password = (document.getElementById('rpassword')||{}).value || '';
        const confirm = (document.getElementById('rconfirm')||{}).value || '';
        if(!name || !email || !password){ showToast('Iltimos barcha maydonlarni to\'ldiring', 'error'); return; }
        if(password !== confirm){ showToast('Parollar mos emas', 'error'); return; }
        if(window.firebase && firebase.auth){
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(res=> res.user.updateProfile({ displayName: name }).then(()=>{
              const u = firebase.auth().currentUser;
              const userData = { uid: u.uid, email: u.email, name, registerTime: new Date().toISOString() };
              localStorage.setItem('user', JSON.stringify(userData));
              showToast('Muvaffaqiyatli ro\'yxatdan o\'tildi', 'success');
              setTimeout(()=> window.location.href = '../index.html', 900);
            }))
            .catch(err=> showToast(err.message || 'Ro\'yxatdan o\'tish xatosi', 'error'));
        } else {
          // local fallback
          const users = JSON.parse(localStorage.getItem('users')||'[]');
          users.push({ id:'local_'+Date.now(), name, email, password });
          localStorage.setItem('users', JSON.stringify(users));
          localStorage.setItem('user', JSON.stringify({ uid:'local_'+Date.now(), name, email, registerTime: new Date().toISOString() }));
          showToast('Demo rejimida ro\'yxatdan o\'tildi', 'success'); setTimeout(()=> window.location.href = '../index.html', 700);
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', init);
  window.__auth_showToast = showToast;
  // Google sign-in helper (used by login/register pages)
  async function signInWithGoogle(button){
    try{
      if(button){ button.classList.add('loading'); button.disabled = true; }
      if(!(window.firebase && firebase.auth)) throw new Error('Firebase yoqilgan emas');
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile'); provider.addScope('email');
      const result = await firebase.auth().signInWithPopup(provider);
      const user = result.user;
      const userData = { uid: user.uid, email: user.email, name: user.displayName, photoURL: user.photoURL, provider:'google', loginTime: new Date().toISOString() };
      localStorage.setItem('user', JSON.stringify(userData));
      showToast('Google orqali muvaffaqiyatli kirdingiz', 'success');
      setTimeout(()=> window.location.href = '../index.html', 900);
    }catch(err){
      if(button){ button.classList.remove('loading'); button.disabled = false; }
      showToast(err.message || 'Google login xatosi', 'error');
    }
  }
  window.signInWithGoogle = signInWithGoogle;
})();