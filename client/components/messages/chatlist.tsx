
"use client"
import { ImageOptimizerCache } from 'next/dist/server/image-optimizer';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {FaSearch} from 'react-icons/fa'
import AddButton from '../Button/addbutton';
const ChatList: React.FC = () => {
    return (
        <div className="flex flex-col max-w-full">
            <div className='flex justify-between bg-gray-600'>
                <div className='p-8'>
                    <h2 className='text-2xl font-bold'>
                        Members..!
                    </h2>
                </div>

                <div>
                    <div className='p-8'>
                        <Link href="/chatlist">
                        <input
                            type="submit"
                            className="bg-blue-500 text-white hover:bg-blue-900 transition duration-300 ease-in-out h-10 p-3 rounded cursor-pointer text-center"
                            value="Add Member"
                        />
                        </Link>
                        {/* <AddButton text={'Add'} url={'/'}/> */}
                    </div>
                </div>
            </div>

            <div className="p-4">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-60 p-2 border border-gray-300 rounded-md focus:outline-none"
                />
            </div>

            <div className="p-4 bg-gray-200">
                <div className="flex items-center space-x-2">
                    <Image
                        src="/logo1.jpg"
                        alt="Profile Picture"
                        width={50}
                        height={50}
                        className="w-10 h-10 rounded-full"
                    />
                    <p>Bharathvaj</p>
                </div>
            </div>
            <div className="p-4">
            <div className="flex items-center space-x-2">
                    <Image
                        src="/logo1.jpg"
                        alt="Profile Picture"
                        width={50}
                        height={50}
                        className="w-10 h-10 rounded-full"
                    />
                    <p>Thirumalaisamy</p>
                </div>
            </div>

            <div className='p-4 bg-gray-200'>
            <div className="flex items-center space-x-2">
                    <Image
                        src="/logo1.jpg"
                        alt="Profile Picture"
                        width={50}
                        height={50}
                        className="w-10 h-10 rounded-full"
                    />
                    <p>Rajamani</p>
                </div>
            </div>

            <div className='p-4'>
            <div className="flex items-center space-x-2">
                    <Image
                        src="/logo1.jpg"
                        alt="Profile Picture"
                        width={50}
                        height={50}
                        className="w-10 h-10 rounded-full"
                    />
                    <p>Surya</p>
                </div>
            </div>

        </div>
    );
};

export default ChatList;
