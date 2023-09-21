import React, { useState, useEffect, useRef } from 'react';
import ChatBoxNavbar from './ChatBoxNavbar';

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState([
    { sender: 'Me', text: 'Hello!' },
    { sender: 'User 2', text: 'Hi there!' },
    { sender: 'User 1', text: 'How are you?' },
    // Add more messages
  ]);

  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    const newMessageObj = { sender: 'Me', text: newMessage };
    setMessages([...messages, newMessageObj]);
    console.log(messages);
    setNewMessage('');
  };

  // Scroll to the bottom of the chat when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
    <div className="bg-white p-4 h-screen w-full flex flex-col">
      <div className="bg-white h-screen w-full flex flex-col">
        <ChatBoxNavbar/>
      </div>
    <div>
    <div className="bg-white p-4 w-full flex flex-col overflow-y">
      {/* <div className="border-b pb-2 mb-4">
        <h2 className="text-xl font-semibold">Chat</h2>
      </div> */}
      <div
        className="border border-gray-300 rounded-lg overflow-y-auto flex-grow mb-4"
        ref={chatContainerRef}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 ${message.sender === 'Me' ? 'text-right' : 'text-left'}`}
          >
            <div
              className={`rounded-lg p-2 inline-block ${
                message.sender === 'Me' ? 'bg-blue-200 text-right' : 'bg-gray-200 text-left'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t pt-4 flex items-center">
        <input
          type="text"
          className="flex-grow border rounded-l-lg p-2"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
    </div>
    </div>
    </>
  );
};

export default ChatBox;
