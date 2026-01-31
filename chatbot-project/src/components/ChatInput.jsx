import { useState } from 'react'
import {Chatbot} from 'supersimpledev'
import dayjs from 'dayjs'
import LoadingSpinnerimage from '../assets/loading-spinner.gif'
import './ChatInput.css'

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setisLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText === '') {
      return
    }
    setInputText('');
    setisLoading(true);

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
        time:dayjs().valueOf()
      }
    ];

    setChatMessages([
      ...newChatMessages,
      {
        message:
          <img
            className="loading-spinner"
            src={LoadingSpinnerimage}>
          </img>,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([ // We use updater function to modify the data
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
        time:dayjs().valueOf()
      }
    ]);

    setisLoading(false)

  }

  function handleKeyDown(event) {
    if ((event.key === 'Enter')) {
      sendMessage();
    }
    else if (event.key === 'Escape') {
      setInputText('');
    }
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={handleKeyDown}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        className="send-button"
      > Send
      </button>
      <button 
        className='clear-button'
        onClick={()=>{
          setChatMessages([])
        }}
      >
        Clear
      </button>
    </div>
  );
}