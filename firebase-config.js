// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDICLwZdvBwXEqam4i3CHdz7lq4hPjx_g8",
    authDomain: "onlinelibrary-2025.firebaseapp.com",
    projectId: "onlinelibrary-2025",
    storageBucket: "onlinelibrary-2025.appspot.com",
    messagingSenderId: "994522635573",
    appId: "1:994522635573:web:64c304a2a0d7a6d849007c",
    databaseURL: "https://onlinelibrary-2025-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get database reference
const db = firebase.database();

// Get authentication reference
const auth = firebase.auth();

// Get storage reference
const storage = firebase.storage();