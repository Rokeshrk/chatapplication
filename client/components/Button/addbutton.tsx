import React from 'react'
import styles from "./button.module.css"
import Link from 'next/link'

interface ButtonProps{
    text: string,
    url: string
}

const AddButton: React.FC<ButtonProps> = ({ text, url }) => {
    return (
        <Link href={url}>
            <button className="bg-blue-500 text-white hover:bg-blue-900 transition duration-300 ease-in-out h-10 p-3 rounded cursor-pointer text-center">
                {text}
            </button>
        </Link>
    )
}

export default AddButton;
