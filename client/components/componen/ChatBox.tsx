import React, { useState, useEffect } from 'react';
import { client } from '../../api/client';
import ChatBoxNavbar from './ChatBoxNavbar';
import jwt_decode from 'jwt-decode';

interface ChatBoxProps {
  clicked: boolean;
  conversationId: string;
  groupName: string;
}

interface JwtPayload {
  user: {
    id: number;
    username: string;
  };
  iat: number;
  exp: number;
}

const ChatMessages: React.FC<ChatBoxProps> = ({ clicked, conversationId, groupName }) => {
  const [messages, setMessages] = useState<any[]>([]);

  // console.log(conversationId,'conversationId');
  console.log('Groupname-->',groupName)
  
  const handleSendMessage = async () => {
    if (newMessage.trim() === '') 
    return;

    try {
      const response = await client.addMessage.addMessage({
        body: {
          text: newMessage,
          conversationId: +conversationId,
        }
      });

      if (response.status === 200) {
        const newMessageObj = response.body;
        setMessages([...messages, newMessageObj]);
        setNewMessage('');
      } else {
        console.error('Error sending message:', response.status);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

    const fetchMessages = async () => {
      try {
        // Fetch messages for the given conversationId from backend API
        const response = await client.getMessage.getMessage({
          query: { lastFetched: '' },
          params: { id: conversationId },
        });
        
        if (response.status === 200) {
          const { messages } = response.body;
          setMessages(messages);
        }

        if(response.status===404){
          console.log('error -- 404 -- errror');
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    // Call fetchMessages with time interval
    useEffect(() => {
      fetchMessages();
        const interval = setInterval(fetchMessages, 2000);
        return () => clearInterval(interval);
    },[conversationId,clicked, groupName]);

  // -------------------- This part is Message Sending --------------------
  const [newMessage, setNewMessage] = useState('');

  // ---------------------- to get current user --------------------
        // retrieve value from localStorage
        const storedValue = localStorage.getItem('authToken') || '';

        const userid = storedValue;
        const currentuserid: JwtPayload = jwt_decode(userid);
        // console.log(currentuserid);

        // Access the 'id' property from the 'user' object
        const userId = currentuserid.user.id;
        const userName=currentuserid.user.username;
        console.log(userName);

        // console.log('User ID:', userId);

  return (
    <div className="bg-white p-2   h-screen w-full flex flex-col">
        <div className="bg-white p-2 w-full flex flex-col overflow-y">
          {clicked ? (
            <>
              <ChatBoxNavbar conversationId={conversationId} selectedGroupData={groupName}/>
                <div className='flex flex-col pt- p-4'>
                  <div className="flex-grow">
                    {/* <ul>
                      {messages.map((message, id) => (
                        <li key={id}>
                          {message.senderId}
                          {message.text}
                        </li>
                      ))}
                    </ul> */}

                    {/* Chat ui starts here*/}
                    <div className="border border-gray-300 rounded-lg w-full h-80 overflow-hidden">
                      <div className="overflow-y-auto h-full">
                        {messages.map((message, id) => (
                          <div
                            key={id}
                            className={`p-2 ${
                              message.senderId === userId ? 'text-right' : 'text-left'
                            }`}
                          >
                            <div
                              className={`rounded-lg p-2 inline-block ${
                                message.senderId === userId ? 'bg-blue-200 text-right' : 'bg-gray-200 text-left'
                              }`}
                            >
                              <div>
                                {message.senderId}                              
                              </div>
                              <div>
                                {message.text}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t flex items-center p-4">
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
            </>
          ):(
            <h3>Choose Your Group To Chat</h3>
          )}
        </div>
      </div>

  );
};
export default ChatMessages;
