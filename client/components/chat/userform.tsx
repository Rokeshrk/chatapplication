import React, { useState } from 'react';

interface User {
  name: string;
  photo: string;
  email: string;
}

interface UserFormProps {
  addUser: (user: User) => void;
  onClose: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ addUser, onClose }) => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = { name, photo, email };
    addUser(user);

    // Clear the input fields after adding the user
    setName('');
    setPhoto('');
    setEmail('');

    // Call onClose to close the form
    onClose();
  };

  return (
    <div className="p-4">
      <h2 className='font-extrabold'>Add the User</h2>

      <form onSubmit={handleSubmit}>
        <div className='flex flex-col'>
          <label className="font-light">Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='bg-slate-400 rounded'/>
        </div>
        <div className='flex flex-col'>
          <label className="font-light">Photo URL:</label>
          <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} className='bg-slate-400 rounded'/>
        </div>
        <div className='flex flex-col'>
          <label className="font-light">Email ID:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='bg-slate-400 rounded'/>
        </div>

        <div className='gap-6 flex p-4'>
          <div>
            <button type="submit" className="bg-blue-500 text-white hover:bg-blue-900 transition duration-300 ease-in-out h-10 p-3 rounded cursor-pointer text-center">Add User</button>
          </div>
          <div>
            <button type="button" className="bg-blue-500 text-white hover:bg-blue-900 transition duration-300 ease-in-out h-10 p-3 rounded cursor-pointer text-center" onClick={onClose}>Close</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
