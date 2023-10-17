"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import {FiSettings} from 'react-icons/fi';
import {TbLogout2} from 'react-icons/tb'
import {IoMdNotifications} from 'react-icons/io';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from '@nextui-org/dropdown';
import {client} from '../../api/client'

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

const Navbar = () => {
    const [userDetails, setUserDetails] = useState<user>();

    useEffect(() => {
        (async () => {
          const userDetails = await client.getProfile.getProfile();
          if (userDetails?.status === 200) {
            setUserDetails([userDetails?.body]);
          }
        })()
      }, []);

  return (
    <div className="flex flex-col max-w-full bg-sky-950">
        <div className='flex justify-between'>
            <div className='p-8'>
            <div className="flex items-center space-x-2">
                <Image
                    src="/logo1.jpg"
                    alt="Profile Picture"
                    width={50}
                    height={50}
                    className="w-10 h-10 rounded-full"
                />
                <p className='text-white font-black'>Groups</p>
            </div>
            </div>

            <div className='flex'>

                <div className='p-10 text-2xl text-white'>
                    <Link href={'/'}>
                        <IoMdNotifications/>
                    </Link>
                </div>

                <div className='p-10 text-2xl text-white'>
                    <Link href={'/'}>
                        <FiSettings/>
                    </Link>
                </div>

                <div>

                    <div className="flex items-center gap-4">
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger className='p-5'>
                                <Image src="/logo1.jpg" width={20} height={20} alt="User Avatar" className="transition-transform w-20 h-20 rounded-full cursor-pointer"/>
                        </DropdownTrigger>

                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2 p-3 bg-white">
                                <p className="font-semibold">Signed in as</p>
                                {/* <p className="font-semibold">bharathvaj@gmail.com</p>*/}
                                {
                                    userDetails !== null && userDetails !== undefined && userDetails.map((user, id) => (
                                        <p className="font-semibold" key={id}>{user.email}</p>
                                    ))
                                }

                            </DropdownItem>
                                                
                            <DropdownItem key="logout" color="danger" className="bg-white font-semibold p-3 text-center">
                                <div className='flex gap-4 pt-1'>
                                    <div className='h-3 w-3'>
                                        <TbLogout2/>
                                    </div>
                                    <div>
                                        <Link href="/loginform">
                                            Logout
                                        </Link>
                                    </div>
                                </div>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Navbar;

