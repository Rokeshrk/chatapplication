import React, { useState } from 'react';

const GroupList: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [groupName, setGroupName] = useState('');
  const [groupPhoto, setGroupPhoto] = useState<File | null>(null);

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
    console.log('Selected Contacts:', selectedContacts);
    console.log('Group Name:', groupName);
    console.log('Group Photo:', groupPhoto);
    // for Reset form fields and close the form
    setSelectedContacts([]);
    setGroupName('');
    setGroupPhoto(null);
    closeForm();
  };

  //Example contacts
  const contacts = ['Contact 1', 'Contact 2', 'Contact 3'];

  return (
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
            <div className='flex flex-col'>
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
