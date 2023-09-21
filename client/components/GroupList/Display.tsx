"use client"

import React, { useState } from 'react';
import GroupList from './grouplist';
import Modal from './modal';
import ParticipantForm from './participantform';

interface Group {
  name: string;
  participants: Array<{
    name: string;
    photo: string;
    email: string;
  }>;
}

interface User {
  name: string;
  photo: string;
  email: string;
}

const Home: React.FC = () => {
  const [participants, setParticipants] = useState<Array<{
    name: string;
    photo: string;
    email: string;
  }>>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [users, setUsers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddParticipant = (participant: {
    name: string;
    photo: string;
    email: string;
  }) => {
    setParticipants([...participants, participant]);
  };

  const handleCreateGroup = () => {
    if (participants.length > 0) {
      const groupName = `Group ${groups.length + 1}`;
      const newGroup: Group = {
        name: groupName,
        participants: participants,
      };
      setGroups([...groups, newGroup]);
      setParticipants([]);
      setIsModalOpen(false);
    }
  };
  
  const handleCloseForm = () => {
    // Close the form by setting isFormOpen to false
    setIsFormOpen(false);
  };

  const handleOpenForm = () => {
    // Open the form by setting isFormOpen to true
    setIsFormOpen(true);
  };

  return (
    <div>
      <div className='p-8'>
        <input
            type="submit"
            className="bg-blue-500 text-white hover:bg-blue-900 transition duration-300 ease-in-out h-10 p-3 rounded cursor-pointer text-center"
            value="Add Member"
            onClick={handleOpenForm}
        />
    </div>
    {
      isFormOpen && 
      <>
        <ParticipantForm onAddParticipant={handleAddParticipant} />
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white hover:bg-blue-900 transition duration-300 ease-in-out h-10 p-3 rounded cursor-pointer px-6 text-center">Create</button>
      </>
    }
    <GroupList groups={groups} />
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <h2>Create Group</h2>
        <button onClick={handleCreateGroup} className="bg-blue-500 text-white hover:bg-blue-900 transition duration-300 ease-in-out h-10 p-3 rounded cursor-pointer text-center">Confirm</button>
      </Modal>
    </div>
  );
};

export default Home;
