import { Pencil, Trash2 } from 'lucide-react';
import React from 'react';

interface CardProps {
    title: string;
    description: string;
    onEdit: () => void;
    onDelete: () => void;
}

const CardWareHouse: React.FC<CardProps> = ({ title, description, onEdit, onDelete }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 grid grid-rows-[auto_1fr_auto]">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <p className="text-gray-600 mt-2">{description}</p>
            <div className="flex justify-end space-x-2 mt-4">
                <button
                    onClick={onEdit}
                    className="flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    <Pencil size={16} className='mr-2' />
                    Editar
                </button>
                <button
                    onClick={onDelete}
                    className="flex items-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                    <Trash2 size={16} className='mr-2' />
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default CardWareHouse;
