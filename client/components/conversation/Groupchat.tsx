// pages/group-conversation.tsx
import React from 'react';

const GroupConversationPage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-4 shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">Group Conversation</h1>
        {/* Add your conversation content here */}
        <div className="overflow-y-auto max-h-64">
        {/* Example messages */}
        <div className="flex items-start mb-4">
            <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="w-8 h-8 rounded-full mr-2"
            />
            <div className="bg-blue-200 p-2 rounded-lg">
            <p className="text-sm">User 1: Hello, how's it going?</p>
            </div>
        </div>
        <div className="flex items-start mb-4">
            <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="w-8 h-8 rounded-full mr-2"
            />
            <div className="bg-blue-200 p-2 rounded-lg">
            <p className="text-sm">User 2: Hey there! It's going well.</p>
            </div>
        </div>
        {/* Add more messages as needed */}
        </div>

      </div>
    </div>
  );
};

export default GroupConversationPage;
