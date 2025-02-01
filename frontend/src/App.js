import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/chat`, { message });
      setReply(response.data.reply);
    } catch (error) {
      console.error(error);
      setReply('Something went wrong. Please try again.');
    }
  };

  return (
      <div className="App">
        <h1>Financial Wellness Chatbot</h1>
        <form onSubmit={handleSubmit}>
          <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask me anything about finances..."
          />
          <button type="submit">Send</button>
        </form>
        {reply && (
            <div className="reply">
              <strong>Response:</strong> {reply}
            </div>
        )}
      </div>
  );
}

export default App;