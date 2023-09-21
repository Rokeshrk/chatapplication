import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { footerLinks } from '../../constants'

const Footer = () => {
  return (
    <footer className='flex flex-col text-black-100 mt-5 border-t border-grey-100 bg-blue-200'>
        <div className='flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10'>
            
            <div className='flex flex-col justify-start items-start gap-6'>
                <Image src="/logo1.jpg" alt="logo" width={118} height={18} className='object-contain rounded-full'/>
                <p className='text-base text-gray-700'>
                    ChatApplication 2023
                </p>
            </div>


            <div className='flex-1 w-full flex md:justify-end flex-wrap max-md:mt-10 gap-20'>
                {footerLinks.map((link) =>(
                    <div key={link.title} className='flex flex-col gap-6 text-base min-w-[170px]'>
                        <h3 className='font-bold'>{link.title}</h3>
                        {link.links.map((item) =>(
                            <Link key={item.title} href={item.url} className='text-grey-500'>
                                {item.title}
                            </Link>
                        ))}
                    </div>
                ))}
            </div>

        </div>


        <div className='flex justify-between items-center flex-wrap mt-10 border-t border-gray-100 sm:px-16 px-6 py-10'>
            <p>&copy; 2023 ChatApplication. All Rights Reserved</p>
            <div className='flex-1 flex sm:justify-end justify-center max-sm:mt-4 gap-10'>
                <Link href="/" className='text-gray-500'>
                    Privacy Policy
                </Link>
                <Link href="/" className='text-gray-500'>
                    Terms of Use
                </Link>
            </div>
        </div>
    </footer>
  )
}

export default Footer