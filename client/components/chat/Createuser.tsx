"use client"
import React, { useState } from 'react';
import UserForm from './userform';
import UserList from './userlist';


interface User {
  name: string;
  photo: string;
  email: string;
}

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  // const [users, setUsers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const addUser = (user: User) => {
    setUsers((prevUsers) => [...prevUsers, user]);
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
    {/* <button onClick={handleOpenForm}>Add user</button> */}

    <div className='p-8'>
        <input
            type="submit"
            className="bg-blue-500 text-white hover:bg-blue-900 transition duration-300 ease-in-out h-10 p-3 rounded cursor-pointer text-center"
            value="Add Member"
            onClick={handleOpenForm}
        />
    </div>
    {isFormOpen && <UserForm addUser={addUser} onClose={handleCloseForm} />}
    <UserList users={users} />
  </div>
  );
};

export default Home;
