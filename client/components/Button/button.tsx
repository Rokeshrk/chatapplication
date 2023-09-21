import React from 'react'
import styles from "./button.module.css"
import Link from 'next/link'

interface ButtonProps{
    text: string,
    url: string
}

const Button: React.FC<ButtonProps> = ({ text, url }) => {
    return (
        <Link href={url}>
            <button className="bg-blue-500 text-white hover:bg-blue-600 transition duration-300 ease-in-out h-10 px-40 rounded cursor-pointer">
                {text}
            </button>
        </Link>
    )
}

export default Button;
