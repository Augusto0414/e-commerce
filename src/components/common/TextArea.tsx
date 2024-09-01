import React, { TextareaHTMLAttributes } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { }

const TextArea: React.FC<TextAreaProps> = ({ ...props }) => {
    return (
        <textarea
            className="border px-3 py-6 border-gray-500 text-xs rounded-lg text-gray-900 shadow-sm ring-inset 
                        ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-dark-blue 
                            sm:text-sm sm:leading-4 w-full placeholder:text-gray-500"
            {...props}
        />
    )
}

export default TextArea
