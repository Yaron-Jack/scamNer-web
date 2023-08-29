// chatgpt.js
const API_KEY = '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';
const chatOutput = document.querySelector('.chat-output');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Function to send a message to ChatGPT
async function sendMessageToChatGPT(message) {
    try {
        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                prompt: message,
                max_tokens: 50,
            }),
        });

        if (!response.ok) {
            throw new Error('ChatGPT API request failed.');
        }

        const data = await response.json();
        const reply = data.choices[0].text;
        return reply;
    } catch (error) {
        console.error('Error sending message to ChatGPT:', error);
        return 'Sorry, there was an error. Please try again later.';
    }
}

// Function to display a message in the chat
function displayMessage(message, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'user-message' : 'chatbot-message';
    messageDiv.textContent = message;
    chatOutput.appendChild(messageDiv);
    chatOutput.scrollTop = chatOutput.scrollHeight;
}

// Event listener for sending messages
sendButton.addEventListener('click', async () => {
    const userMessage = userInput.value;
    if (userMessage.trim() === '') return;

    displayMessage(userMessage, true);
    userInput.value = '';

    const chatbotReply = await sendMessageToChatGPT(userMessage);
    displayMessage(chatbotReply, false);
});
