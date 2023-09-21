import React from 'react';
import Link from 'next/link';

interface User {
  name: string;
  photo: string;
  email: string;
}

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className='p-4'>
      <h1 className="text-2xl font-semibold mb-4">User List</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index} className="mb-4">
            <div className='flex gap-3'>
              <div>
                <img src={user.photo} alt={user.name} className="h-8 w-8 rounded-full" />
              </div>
              <div>
                {user.name}
              </div>
            </div>
            <strong>Email :</strong> {user.email}
            <br />
          </li>
        ))}
      </ul>
      <Link href="/" className='bg-red-600 pl-4 pr-4 pt-2 pb-2 rounded align-middle'>
        Exit
      </Link>
    </div>
  );
};

export default UserList;
