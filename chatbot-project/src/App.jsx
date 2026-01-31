import { useState,useEffect} from 'react'
import { ChatInput } from './components/ChatInput'
import ChatMessages from './components/ChatMessages';
import './App.css'
import { Chatbot } from 'supersimpledev';

function App() {
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages'))||[]);// Array Destructuring
  //const[chatMessages,setChatMessages]=array;//Array Destructuring
  //const chatMessages=array[0];// current data
  //const setChatMessages=array[1];// updater function

  useEffect(()=>{
    localStorage.setItem('messages',JSON.stringify(chatMessages))

  },[chatMessages])

   useEffect(() => {
    Chatbot.addResponses({
      'goodbye': 'Goodbye. Have a great day!',
      'give me a unique id': function() {
        return `Sure! Here's a unique ID: ${crypto.randomUUID()}`;
      }
    });

  // [] tells useEffect to only run once. We only want to run
  // this setup code once because we only want to add these
  // extra responses once.
  }, []);



  return (
    <div className="app-container">
      <p className="welcome-message">
        {chatMessages.length === 0 ?
          "Welcome to the chatbot project! Send a message using the textbox below" :
          ""
        }
      </p>

      <ChatMessages
        chatMessages={chatMessages}
      />

      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App
