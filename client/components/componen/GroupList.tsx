import React, { useEffect, useRef, useState } from 'react';
import { client } from '../../api/client';

interface GroupListProps {
  handleClick: (conversationId: string, groupName: string) => void;
}

type user = {
  id: number;
  email: string;
  username: string;
  profilePicture: string;
  conversations: {
    id: number;
    name: string;
  }[];
}[];

const GroupList: React.FC<GroupListProps> = ({ handleClick }) => {

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [groupName, setGroupName] = useState('');
  const [groupPhoto, setGroupPhoto] = useState<File | null>(null);

  const [userDetails, setUserDetails] = useState<user>();
  const [Persons, setPersons] = useState<user>();

  // const [selectedGroupData, setSelectedGroupData] = useState<{
  //   selectedContacts: string[];
  //   groupName: string;
  //   groupPhoto: File | null;
  // } | null>(null);

  const [submittedData, setSubmittedData] = useState<
    {
      participants: number[];
      name: string;
      groupPhoto: File | null;
    }[]
  >([]);

  // const [showConversation, setShowConversation] = useState<boolean>(false);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  

  // async function getUserDetails() {
  //   try {
  //     const userDetail = await client.login.getProfile({ headers: { "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfSwiaWF0IjoxNjk2NDExOTM2LCJleHAiOjE2OTY4NDM5MzZ9.RzAinkf0z2kr5N8TPPzkoVANAvpkHEpZLae_3KSume0" } });
  //     console.log(userDetail, "fdhghjvg");
  //     return userDetail;
  //   } catch (error) {
  //     console.error("Error fetching user details:", error);
  //     return null;
  //   }
  // }

  useEffect(() => {
    (async () => {
      const userDetails = await client.login.getProfile();
      if (userDetails?.status === 200) {
        setUserDetails([userDetails?.body]);
      }
    })()
  }, []);

  const handleGroupPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setGroupPhoto(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // form submission
    const newGroupData = {
      participants: selectedContacts,
      name: groupName,
      groupPhoto,
    };

    const createdgroup = createGroup();

    console.log(newGroupData, "newGroupData");
    // ------------------- Token from localstorage --------------------
    let authToken = "";

    if (typeof window !== 'undefined') {
      authToken = localStorage.getItem('authToken') || "";
    }

    async function createGroup() {
      await client.createConversation.createConversation({ headers: { "x-auth-token": authToken }, body: newGroupData });
    }

    

    // Add the submitted group data to the list
    setSubmittedData([...submittedData, newGroupData]);

    console.log("submitted", submittedData);

    // for Reset form fields and close the form
    setSelectedContacts([]);
    setGroupName('');
    setGroupPhoto(null);
    closeForm();
  };

  // const contacts = ['Contact 1', 'Contact 2', 'Contact 3'];

  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  // const handleGroupClick = (groupName: string, groupData: any) => {
  //   setSelectedGroup(groupName);
  //   setSelectedGroupData(groupData);
  //   setShowConversation(true);
  // };

  // const [getUserDetails, setGetUserDetails] = useState<UserDetails>([]);
  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);

  const handleContactToggle = (contact: number) => {
    if (selectedContacts.includes(contact)) {
      setSelectedContacts(selectedContacts.filter((c) => c !== contact));
    } else {
      setSelectedContacts([...selectedContacts, contact]);
    }
  };

  return (
    <div className="bg-gray-100 p-4 h-screen w-1/4 scroll-smooth">
      <div className='ml-4'>
        <button
          onClick={openForm}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create New Group
        </button>
      </div>
      <div className='scroll-smooth'>
        {userDetails !== null &&
          userDetails?.map((user) => {

            const uniqueConversationIds = new Set<number>(); // To prevent repetition
            return (
              <div key={user.id}>
                {user.conversations.map((conversation) => {
                  console.log(conversation.id);

                  if (!uniqueConversationIds.has(conversation.id)) 
                  {
                    uniqueConversationIds.add(conversation.id);
                    return (
                      <label key={conversation.id} className="flex items-center font-semibold text-xl space-x-2 hover:text-blue-700 hover:bg-teal-400 cursor-pointer rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 pl-3 p-2">
                        <button
                          className="mb-2 p-2 flex items-center "
                          onClick={() => handleClick(conversation.id.toString(), conversation.name)}
                        >
                          {conversation.name}
                        </button>
                      </label>
                    );
                  }
                  return null;
                })}
              </div>
            );
          })}

      </div>


      {isFormOpen && (
        <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center backdrop-blur-md">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg text-center"
            style={{ maxWidth: '400px' }}
          >
            <h2 className="text-2xl font-semibold mb-4">Create New Group</h2>

            {/* for selecting contacts checkbox*/}
            <div className="mb-6">
          <p className="mb-2 font-medium">Select Contacts</p>
            {userDetails !== undefined && userDetails?.map((user) => (
            <label key={user.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedContacts.includes(user.id)}
                onChange={() => handleContactToggle(user.id)}
                className="text-green-500"
              />
              {user.username}
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
    </div>
  );
};

export default GroupList;
