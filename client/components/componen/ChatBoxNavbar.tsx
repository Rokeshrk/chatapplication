"use client"
import React, { useState } from 'react'

type Props = {}

const ChatBoxNavbar = (props: Props) => {

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
    const [messages, setMessages] = useState<string[]>([]);
  
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
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // form submission
      console.log('Selected Contacts:', selectedContacts);
      // for Reset form fields and close the form
      setSelectedContacts([]);
      closeForm();
    };
  
    const handleExit = () => {
        // Clear chat messages when Exit is clicked
        setMessages([]);
      };

    //Example contacts
    const contacts = ['Contact 1', 'Contact 2', 'Contact 3'];

  return (
    <div className='flex justify-between'>
        <h1 className='font-semibold text-lg'>Group Name</h1>
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
  )
}

export default ChatBoxNavbar