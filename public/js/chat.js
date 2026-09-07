// Chat interface functionality
const chatInterface = {
  messages: [],
  currentBot: null,

  init() {
    console.log('Chat interface initialized');
  },

  addMessage(sender, text, type = 'text') {
    const message = {
      id: Date.now(),
      sender,
      text,
      type,
      timestamp: new Date()
    };
    this.messages.push(message);
    return message;
  },

  getMessages() {
    return this.messages;
  },

  clearMessages() {
    this.messages = [];
  }
};

// Initialize chat interface
chatInterface.init();
