import React, { ChangeEvent } from 'react';

interface ComboBoxProps {
    label?: string;
    name: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const ComboBox: React.FC<ComboBoxProps> = ({ name, options, value, onChange }) => {
    return (
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="p-4 text-xs  border border-gray-500 rounded-lg text-gray-900 shadow-sm ring-inset 
            ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-dark-blue 
            sm:text-sm sm:leading-4 w-full"
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default ComboBox;
