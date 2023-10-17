"use client"

import React, { useState, useEffect, useRef } from 'react';
import { json } from 'stream/consumers';

const Home: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [groupName, setGroupName] = useState('');
  const [groupPhoto, setGroupPhoto] = useState<File | null>(null);


  const [selectedGroupData, setSelectedGroupData] = useState<{
    selectedContacts: string[];
    groupName: string;
    groupPhoto: File | null;
  } | null>(null);


  const [submittedData, setSubmittedData] = useState<
    {
      selectedContacts: string[];
      groupName: string;
      groupPhoto: File | null;
    }[]
  >([]);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleContactToggle = (contact: string) => {
    if (selectedContacts.includes(contact)) {
      setSelectedContacts(selectedContacts.filter((c) => c !== contact));
    } else {
      setSelectedContacts([...selectedContacts, contact]);
    }
  };

  const handleGroupPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setGroupPhoto(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // form submission
    const newGroupData = {
      selectedContacts,
      groupName,
      groupPhoto,
    };

    // Add the submitted group data to the list
    setSubmittedData([...submittedData, newGroupData]);

    // for Reset form fields and close the form
    setSelectedContacts([]);
    setGroupName('');
    setGroupPhoto(null);
    closeForm();
  };


  // Example contacts
  const contacts = ['Contact 1', 'Contact 2', 'Contact 3'];

  const [messages, setMessages] = useState([
    { sender: 'Me', text: 'Hello!' },
    { sender: 'User 2', text: 'Hi there!' },
    { sender: 'User 1', text: 'How are you?' },
    // Add more messages
  ]);

  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    const newMessageObj = { sender: 'Me', text: newMessage };
    setMessages([...messages, newMessageObj]);
    setNewMessage('');
  };

  // Scroll to the bottom of the chat when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Function to handle group selection
  const handleGroupClick = (groupName: string, groupData: any) => {
    setSelectedGroup(groupName);
    setSelectedGroupData(groupData);
  };

  const handleExit = () => {
    // Clear messages when Exit is clicked
    setMessages([]);
    console.log('Message is Cleared');
  };

  return (
    <div className="flex">
      <div className="bg-gray-100 p-4 h-screen w-1/4">
      <button
        onClick={openForm}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Create New Group
      </button>

      {isFormOpen && (
        <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center backdrop-blur-md">
          {/*form in center*/}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg text-center"
            style={{ maxWidth: '400px' }}
          >
            <h2 className="text-2xl font-semibold mb-4">Create New Group</h2>

          {/* for selecting contacts checkbox*/}
          <div className="mb-6">
            <p className="mb-2 font-medium">Select Contacts</p>
            {contacts.map((contact, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedContacts.includes(contact)}
                  onChange={() => handleContactToggle(contact)}
                  className="text-green-500"
                />
                {contact}
              </label>
            ))}
          </div>

          {/* group name */}
          <div className="mb-6">
            <label htmlFor="groupName" className="block text-left mb-2 font-medium">
              Group Name
            </label>
            <input
              type="text"
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>

          {/* Group Photo */}
          <div className="mb-6">
            <label htmlFor="groupPhoto" className="block text-left mb-2 font-medium">
              Group Photo
            </label>
            <input
              type="file"
              id="groupPhoto"
              onChange={handleGroupPhotoChange}
              className="border p-2 w-full"
            />
          </div>

            {/* Submit Button */}
            <div className="flex flex-col">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Create Group
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={closeForm}
                className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Display Submitted Details */}
      {submittedData.length > 0 && (
        <div className="mt-4">
          {submittedData.map((groupData, index) => (
  <div
    key={index}
    className="mb-2 p-2 flex items-center hover:text-blue-700 hover:bg-teal-400 cursor-pointer rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
    onClick={() => handleGroupClick(groupData.groupName, groupData)}
    style={{ zIndex: 2 }} // Add this style
  >
    <button>
      <div className='flex gap-3'>
        {groupData.groupPhoto && (
          <div>
            <img
              src={URL.createObjectURL(groupData.groupPhoto)}
              alt={`Group ${index + 1} Photo`}
              className="w-12 h-12 bg-blue-400 rounded-full flex-shrink-0 overflow-hidden"
            />
          </div>
        )}
        <p className='ml-5 text-lg font-semibold p-2'>
          {groupData.groupName}
        </p>
      </div>
    </button>
  </div>
))}


        </div>
      )}
      </div>

      <div className="bg-white p-4 h-screen w-full flex flex-col">
        <div>
          <div className="bg-white p-4 w-full flex flex-col overflow-y">
            {selectedGroup ? (
              // Display the conversation for the selected group
              <>
                <div className='flex justify-between'>
                  <h1 className='font-semibold text-lg'>
                    {selectedGroupData ? selectedGroupData.groupName : 'Group Name'}
                  </h1>
                  <div className='flex gap-3'>
                      <button onClick={openForm} className="bg-green-500 text-white p-2 rounded hover:bg-green-800">
                          Add Member
                      </button>

                    {isFormOpen && (
                    <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center backdrop-blur-md">
                      {/*form in center*/}
                      <form
                        onSubmit={handleSubmit}
                        className="bg-white p-6 rounded-lg shadow-lg text-center"
                        style={{ maxWidth: '400px' }}
                      >
                    <h2 className="text-2xl font-semibold mb-4">Add Member</h2>

                    {/* for selecting contacts checkbox*/}
                    <div className="mb-6">
                      <p className="mb-2 font-medium">Select Contacts</p>
                      {contacts.map((contact, index) => (
                        <label key={index} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedContacts.includes(contact)}
                            onChange={() => handleContactToggle(contact)}
                            className="text-green-500"
                          />
                          {contact}
                        </label>
                      ))}
                    </div>

                    {/* Submit Button */}
                    <div className='flex flex-col'>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Add Member
                    </button>

                    {/* Close Button */}
                    <button
                      type="button"
                      onClick={closeForm}
                      className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-700"
                    >
                      Close
                    </button>
                    </div>
                  </form>
                </div>
              )}

            <button onClick={handleExit} className="bg-red-500 text-white p-2 rounded hover:bg-red-700">
                Exit
            </button>
        </div>
    </div>
                <div
                  className="border border-gray-300 rounded-lg overflow-y-auto flex-grow mb-4 mt-4"
                  ref={chatContainerRef}
                >
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`p-2 ${
                        message.sender === 'Me' ? 'text-right' : 'text-left'
                      }`}
                    >
                      <div
                        className={`rounded-lg p-2 inline-block ${
                          message.sender === 'Me'
                            ? 'bg-blue-200 text-right'
                            : 'bg-gray-200 text-left'
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
              </>
            ) : (
              <div className="text-center">
                <p className="text-xl font-semibold">Start a Conversation</p>
                <p>Select a Group to begin Chat.</p>
              </div>
            )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
