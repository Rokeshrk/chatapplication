"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { FiSettings } from 'react-icons/fi';
import { TbLogout2 } from 'react-icons/tb'
import { IoMdNotifications } from 'react-icons/io';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { client } from "../../api/client"

const Navbar = () => {

    const [name, setNamme] = useState({ name: '' });
    const [email, setEmail] = useState({ email: '' });
    useEffect(() => {
        (async () => {
            const result = await client.getProfile.getProfile({ headers: { "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4fSwiaWF0IjoxNjk1Mjc4MDk3LCJleHAiOjE2OTU3MTAwOTd9.Mt7Lh3p8tNQ83tfdxD4drUf_6Le0gzfDlRgoX2lh_nc" } })
            if (result.status === 200) {
                setNamme({ ...name, name: result.body.username })
                setEmail({ ...email, email: result.body.email })
            }
        })();
    }, [])


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
                            <IoMdNotifications />
                        </Link>
                    </div>

                    <div className='p-10 text-2xl text-white'>
                        <Link href={'/'}>
                            <FiSettings />
                        </Link>
                    </div>

                    {/* <div className='p-8'>
                    <input
                        type="submit"
                        className="bg-blue-500 text-white hover:bg-blue-900 transition duration-300 ease-in-out h-10 p-3 rounded cursor-pointer text-center"
                        value="Add Group"
                    />
                </div> */}

                    <div>

                        <div className="flex items-center gap-4">
                            <Dropdown placement="bottom-end">
                                <DropdownTrigger className='p-5'>
                                    <Image src="/logo1.jpg" width={20} height={20} alt="User Avatar" className="transition-transform w-20 h-20 rounded-full cursor-pointer" />
                                </DropdownTrigger>

                                <DropdownMenu aria-label="Profile Actions" variant="flat">
                                    <DropdownItem key="profile" className="h-14 gap-2 p-3 bg-white">
                                        <p className="font-semibold">{name.name}</p>
                                        <p className="font-semibold">{email.email}</p>
                                    </DropdownItem>

                                    <DropdownItem key="logout" color="danger" className="bg-white font-semibold p-3 text-center">
                                        <div className='flex gap-4 pt-1'>
                                            <div className='h-3 w-3'>
                                                <TbLogout2 />
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

