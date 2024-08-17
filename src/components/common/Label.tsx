import React from 'react'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> { }

const Label: React.FC<LabelProps> = ({ children, ...props }) => {
    return (
        <label className=' py-1.5 block text-sm font-medium leading-6 text-gray-900'
            {...props}
        >
            {children}
        </label>
    )
}

export default Label
