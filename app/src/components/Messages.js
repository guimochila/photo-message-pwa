import io from 'socket.io-client';

class Messages {
  constructor() {
    this.messages = [];
    this.socket = io();
    // Handle connection error
    this.socket.once('connect_error', () => {
      window.dispatchEvent(new Event('messages_error'));
    });

    this.socket.once('reconnect', () => {
      window.dispatchEvent(new Event('messages_reconnected'));
    });

    this.socket.on('all_messages', messages => {
      this.messages = messages;

      window.dispatchEvent(new Event('messages_ready'));
    });

    // Listen new message from server
    this.socket.on('new_message', message => {
      this.messages.unshift(message);

      window.dispatchEvent(new CustomEvent('new_message', { detail: message }));
    });
  }

  get all() {
    return this.messages;
  }

  add(photo, caption) {
    const message = {
      photo,
      caption,
    };

    this.messages.unshift(message);

    // Emit to server
    this.socket.emit('new_message', message);

    return message;
  }
}

export default Messages;
