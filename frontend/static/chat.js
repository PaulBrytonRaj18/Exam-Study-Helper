/* chat.js */
const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Auto-scroll to bottom
function scrollToBottom() {
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Add message to UI
function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    
    // Allow basic formatting for bot responses
    if(sender === 'bot') {
        // Simple regex to bold text between ** ** (Markdown style)
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    }
    
    div.innerHTML = `<p>${text}</p>`;
    chatWindow.appendChild(div);
    scrollToBottom();
}

// Handle sending message
async function handleSend() {
    const query = userInput.value.trim();
    if (!query) return;

    // 1. Add User Message
    addMessage(query, 'user');
    userInput.value = '';

    // 2. Show Loading Indicator (Optional)
    const loadingId = 'loading-' + Date.now();
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message bot';
    loadingDiv.id = loadingId;
    loadingDiv.innerHTML = `<p style="color: var(--primary-neon);">Analysing vectors...</p>`;
    chatWindow.appendChild(loadingDiv);
    scrollToBottom();

    try {
        // NOTE: Backend Integration Point
        // const response = await fetch('/api/chat', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ query: query })
        // });
        // const data = await response.json();
        // const botResponse = data.answer;

        // SIMULATED RESPONSE (Remove this block when backend is ready)
        await new Promise(r => setTimeout(r, 1500)); // Fake delay
        const botResponse = "Based on **Chapter 4**, the mitochondria is indeed the powerhouse of the cell, but recent studies in your notes suggest a correlation with **ATP synthesis efficiency**.";

        // Remove loading and add real response
        document.getElementById(loadingId).remove();
        addMessage(botResponse, 'bot');

    } catch (error) {
        document.getElementById(loadingId).remove();
        addMessage("Error communicating with Neural Core.", 'bot');
        console.error(error);
    }
}

// Event Listeners
sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});