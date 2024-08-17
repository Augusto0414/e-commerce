import React from 'react'

interface InputProp extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input: React.FC<InputProp> = ({ ...props }) => {
    return (
        <input type="text"
            className='p-4 text-xs  border border-gray-500 rounded-lg text-gray-900 shadow-sm ring-inset 
            ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-dark-blue 
            sm:text-sm sm:leading-4 w-full placeholder:text-gray-500'
            {...props}
        />
    )
}

export default Input
