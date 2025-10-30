// Messaging functionality
let currentChat = null;
let currentUser = null;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize current user
    currentUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (!currentUser) {
        window.location.href = '/pages/login.html';
        return;
    }

    // Initialize messaging UI
    initializeMessaging();
});

function initializeMessaging() {
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const convoList = document.getElementById('convoList');

    // Load user's conversations
    loadConversations();

    // Handle new message submission
    messageForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        const message = messageInput.value.trim();
        if (message && currentChat) {
            sendMessage(message);
            messageInput.value = '';
        }
    });
}

async function loadConversations() {
    const convoList = document.getElementById('convoList');
    const userChatsRef = firebase.database().ref(`user_chats/${currentUser.uid}`);

    userChatsRef.on('value', (snapshot) => {
        const chats = snapshot.val() || {};
        convoList.innerHTML = '';

        // Sort chats by timestamp
        const sortedChats = Object.values(chats).sort((a, b) => b.timestamp - a.timestamp);

        sortedChats.forEach(chat => {
            const convoEl = createConversationElement(chat);
            convoList.appendChild(convoEl);
        });
    });
}

function createConversationElement(chat) {
    const div = document.createElement('div');
    div.className = 'convo-item';
    div.dataset.chatId = chat.chatId;

    const avatar = document.createElement('div');
    avatar.className = 'convo-avatar';
    avatar.textContent = chat.title.charAt(0).toUpperCase();

    const content = document.createElement('div');
    content.className = 'convo-content';

    const title = document.createElement('div');
    title.className = 'convo-title';
    title.textContent = chat.title;

    const preview = document.createElement('div');
    preview.className = 'convo-preview';
    preview.textContent = chat.lastMessage || 'No messages yet';

    content.appendChild(title);
    content.appendChild(preview);
    div.appendChild(avatar);
    div.appendChild(content);

    div.addEventListener('click', () => openChat(chat.chatId, chat.withUser, chat.title));

    return div;
}

function openChat(chatId, withUserId, title) {
    currentChat = { id: chatId, withUser: withUserId };
    
    // Update UI
    document.getElementById('chatWith').textContent = title;
    
    // Clear previous messages
    const messagesList = document.getElementById('messagesList');
    messagesList.innerHTML = '';

    // Load and listen for messages
    const chatRef = firebase.database().ref(`chats/${chatId}/messages`);
    chatRef.off(); // Remove previous listeners
    chatRef.on('child_added', (snapshot) => {
        const message = snapshot.val();
        displayMessage(message);
    });

    // Mark conversation as active
    document.querySelectorAll('.convo-item').forEach(el => {
        el.classList.remove('active');
        if (el.dataset.chatId === chatId) {
            el.classList.add('active');
        }
    });
}

function displayMessage(message) {
    const messagesList = document.getElementById('messagesList');
    const div = document.createElement('div');
    div.className = `message ${message.sender === currentUser.uid ? 'sent' : 'received'}`;
    
    const text = document.createElement('div');
    text.textContent = message.text;
    
    const time = document.createElement('div');
    time.className = 'message-time';
    time.textContent = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    div.appendChild(text);
    div.appendChild(time);
    messagesList.appendChild(div);
    
    // Scroll to bottom
    messagesList.scrollTop = messagesList.scrollHeight;
}

async function sendMessage(text) {
    if (!currentChat || !text) return;

    const messageData = {
        text: text,
        sender: currentUser.uid,
        timestamp: Date.now()
    };

    // Add message to chat
    const chatRef = firebase.database().ref(`chats/${currentChat.id}`);
    const newMessageRef = chatRef.child('messages').push();
    await newMessageRef.set(messageData);

    // Update last message for both users
    await firebase.database().ref(`user_chats/${currentUser.uid}/${currentChat.id}`).update({
        lastMessage: text,
        timestamp: messageData.timestamp
    });

    await firebase.database().ref(`user_chats/${currentChat.withUser}/${currentChat.id}`).update({
        lastMessage: text,
        timestamp: messageData.timestamp
    });
}
