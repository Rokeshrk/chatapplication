"use client"
import React from 'react';

interface Participant {
  name: string;
  photo: string;
  email: string;
}

interface Group {
  name: string;
  participants: Participant[]; // Change to an array of Participant objects
}

interface GroupListProps {
  groups: Group[]; // Use the updated Group type with participants as an array of Participant objects
}

const GroupList: React.FC<GroupListProps> = ({ groups }) => {
  return (
    <div>
      <h2 className='font-semibold'>Groups</h2>
      {groups.map((group, index) => (
        <div key={index}>
          <strong>Group Name:</strong> {group.name}
          <ul>
            {group.participants.map((participant, index) => (
              <li key={index}>
                <div className='flex gap-3'>
                  <div>
                    <img src={participant.photo} alt={participant.name} className="h-8 w-8 rounded-full"/>
                  </div>
                  <div>
                    {participant.name}
                  </div>
                </div>
                <strong>Email:</strong> {participant.email}
                <br />s
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default GroupList;
