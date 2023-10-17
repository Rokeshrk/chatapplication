import React, { useEffect, useState } from 'react';
import {client} from '../../api/client'
import jwt_decode from 'jwt-decode';

interface ChatBoxNavbarProps {
  selectedGroupData: string; 
}

interface ChatBoxProps{
  conversationId: string;
  selectedGroupData: string; 
}

interface JwtPayload {
  user: {
    id: number;
    username:string;
  };
}

const ChatBoxNavbar: React.FC<ChatBoxProps> = ({ conversationId, selectedGroupData}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isParticipantFormOpen, setIsParticipantFormOpen] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  const [showparticipants, setshowparticipants] = useState<{ id: number; username: string; }[]>([]);
  
  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const OpenparticipantForm = () => {
    setIsParticipantFormOpen(true);
  };

  const CloseparticipantForm = () => {
    // Reload the entire page
    window.location.reload();
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

    // Form submission logic
    console.log('Selected Contacts:', selectedContacts);

    // Reset form fields and close the form
    setSelectedContacts([]);
    closeForm();
  };


  const fetchMessages = async () => {
    try {
      // Fetch messages for the given conversationId from backend API
      const response = await client.getConversationById.getConversationById({
        params: {
          id: conversationId
        },
      });
      console.log(conversationId,"vajjjjj")
      if (response.status === 200) {
        // Adjust the function and endpoint accordingly
        const { participants } = response.body;
        setshowparticipants(participants);
      }
      console.log(response,'response')
      console.log(showparticipants,'participants');

      if (response.status === 404) {
        console.log('error -- 404 -- error');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);


  const storedValue = localStorage.getItem('authToken') || '';

        const userid = storedValue;
        const currentuserid: JwtPayload = jwt_decode(userid);
        // console.log(currentuserid);

        // Access the 'id' property from the 'user' object
        const userId = currentuserid.user.id;
        const userName = currentuserid.user.username;
        console.log(userName);

  const deleteGroup = async () => {
    try {

      // Make an API request to delete the conversation by its ID
      const response = await client.deleteConversationById.deleteConversationById({
        params: {
          id: conversationId, 
        },
        body: {
          userId: userId, 
        },
      });
  
      if (response.status === 200) {
        // Handle successful deletion, e.g., show a success message or redirect
        console.log('Conversation deleted successfull');
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };
  

  

  return (
    <div className='flex justify-between'>
      <h1 className='font-semibold text-lg'>
        <button onClick={OpenparticipantForm}>
          {selectedGroupData}
        </button>
      </h1>
      <div className='flex gap-3'>
        <button onClick={openForm} className="bg-green-500 text-white p-2 rounded hover:bg-green-800">
          Add Member
        </button>

        {isFormOpen && (
          <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center backdrop-blur-md">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              style={{ maxWidth: '400px' }}
            >
              <h2 className="text-2xl font-semibold mb-4">Add Member</h2>

              {/* For selecting contacts checkboxes */}

              <div className='text-left'>
                  {showparticipants.length > 0 ? (
                    <div>
                      {showparticipants.map((participant) => (
                        <div key={participant.id} className='flex gap-3'>
                          <p>{participant.username}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>Loading participants...</p>
                  )}
                </div>

              {/* <div className="mb-6">
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
              </div> */}

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

        {/* ------------- Participantform open ------------------------------ */}

        {
          isParticipantFormOpen && (
            <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center backdrop-blur-md">
              <div className='bg-white p-6 rounded-lg shadow-lg '>
                <div className='text-left'>
                  <h2 className="text-2xl font-semibold mb-4">
                    {selectedGroupData}
                  </h2>
                </div>

                <div className='text-left'>
                  {showparticipants.length > 0 ? (
                    <div>
                      {showparticipants.map((participant) => (
                        <div key={participant.id} className='flex gap-3'>
                          <h2>ID: {participant.id}</h2>
                          <p>Name: {participant.username}</p>
                          {/* Add more participant details as needed */}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>Loading participants...</p>
                  )}
                </div>              
                <div className='flex gap-3'>
                {/* Close Button */}
                <div>
                  <button
                      type="button"
                      onClick={ CloseparticipantForm }
                      className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-700"
                    >
                      Close
                    </button>
                  </div>
                  <div >
                      <button
                        type="button"
                        onClick={ deleteGroup }
                        className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-700"
                      >
                        Delete group
                      </button>
                    </div>
                  </div>
              </div>
            </div>
          )
        }

        <button onClick={ closeForm } className="bg-red-500 text-white p-2 rounded hover:bg-red-700">
          Exit
        </button>
      </div>
    </div>
  );
};

export default ChatBoxNavbar;
