const GROQ_ENDPOINT = '/api/chat';

const SYSTEM_PROMPT = `You are ElectIQ AI, an expert election education assistant. Your mission is to help users understand:
- How elections work (voting process, timelines, phases)
- Election terminology and definitions
- Voter rights and registration
- How votes are counted and verified
- Electoral systems around the world
- Indian elections (Lok Sabha, Rajya Sabha, ECI, EVMs, VVPATs, etc.)
- Historical election facts and trivia

Guidelines:
- Be clear, accurate, and educational
- Use simple language accessible to everyone
- When explaining processes, use numbered steps
- For Indian context: reference the Election Commission of India, Model Code of Conduct, EVMs, VVPATs
- Be neutral and non-partisan
- Keep responses concise but comprehensive (3-5 paragraphs max)
- If asked about specific candidates or parties, stick to factual, neutral information only
- Always encourage civic participation`;

let conversationHistory = [];

async function sendMessage() {
  const input   = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const message = input.value.trim();
  if (!message) return;

  appendMessage('user', message);
  input.value = '';
  autoResize(input);

  conversationHistory.push({ role: 'user', content: message });

  sendBtn.disabled = true;
  const typingId = showTyping();

  try {
    const response = await fetch(GROQ_ENDPOINT, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...conversationHistory,
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || 'Server error ' + response.status);
    }

    const data  = await response.json();
    const reply = data.choices?.[0]?.message?.content;
    if (!reply) throw new Error('Empty response from AI.');

    conversationHistory.push({ role: 'assistant', content: reply });
    removeTyping(typingId);
    appendMessage('ai', reply);

  } catch (error) {
    removeTyping(typingId);
    appendMessage('ai', 'Connection error: ' + error.message + '. Make sure server is running with npm start.');
    console.error('ElectIQ Chat Error:', error);
  } finally {
    sendBtn.disabled = false;
    const el = document.getElementById('chatInput');
    if (el) el.focus();
  }
}

function appendMessage(role, text) {
  const container = document.getElementById('chatMessages');
  if (!container) return;

  const bubble  = document.createElement('div');
  bubble.className = 'chat-bubble ' + role;

  const avatar  = document.createElement('div');
  avatar.className = 'bubble-avatar';
  avatar.textContent = role === 'ai' ? '🗳️' : 'YOU';

  const content = document.createElement('div');
  content.className = 'bubble-content';
  content.innerHTML = formatMessage(text);

  bubble.appendChild(avatar);
  bubble.appendChild(content);
  container.appendChild(bubble);
  bubble.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

function formatMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong></strong>')
    .replace(/\*(.*?)\*/g, '<em></em>')
    .replace(/(.*?)/g, '<code style="background:rgba(201,168,76,0.15);padding:0.1em 0.4em;border-radius:4px;font-family:monospace;"></code>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>');
}

function showTyping() {
  const container = document.getElementById('chatMessages');
  if (!container) return null;
  const id     = 'typing-' + Date.now();
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble ai';
  bubble.id = id;
  bubble.innerHTML = '<div class="bubble-avatar">🗳️</div><div class="bubble-content" style="padding:0.8rem 1rem;"><div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div></div>';
  container.appendChild(bubble);
  bubble.scrollIntoView({ behavior: 'smooth', block: 'end' });
  return id;
}

function removeTyping(id) {
  if (!id) return;
  const el = document.getElementById(id);
  if (el) el.remove();
}

function sendSuggestion(text) {
  const input = document.getElementById('chatInput');
  if (!input) return;
  input.value = text;
  autoResize(input);
  sendMessage();
}

function handleChatKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
}

function clearChat() {
  conversationHistory = [];
  const container = document.getElementById('chatMessages');
  if (!container) return;
  container.innerHTML = '<div class="chat-bubble ai"><div class="bubble-avatar">🗳️</div><div class="bubble-content"><p>Chat cleared! Ask me anything about elections.</p></div></div>';
}
