import { Pencil, Trash2 } from 'lucide-react';
import React from 'react';

interface CardProps {
    id: string;
    nombre: string;
    ubicacion: string;
    capacidad: number;
    fechaCreacion: string;
    fechaModificacion: string;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const BodegaCard: React.FC<CardProps> = ({ id, nombre, ubicacion, capacidad, fechaCreacion, fechaModificacion, onEdit, onDelete }) => {

    const formatDate = (dateStr: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateStr).toLocaleDateString(undefined, options);
    };

    return (
        <div className="w-[300px] h-[250px] bg-white rounded-lg p-4 border border-gray-200 shadow-custom overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto">
                <h2 className="text-xl font-semibold text-gray-800 truncate">{nombre}</h2>
                <p className="text-gray-600 truncate"><strong>Ubicación:</strong> {ubicacion}</p>
                <p className="text-gray-600"><strong>Capacidad:</strong> {capacidad} m³</p>
                <div className="text-sm text-gray-500 mt-2">
                    {fechaCreacion && (
                        <p className="truncate"><strong>Fecha de Creación:</strong> {formatDate(fechaCreacion)}</p>
                    )}
                    {fechaModificacion && (
                        <p className="truncate"><strong>Fecha de Modificación:</strong> {formatDate(fechaModificacion)}</p>
                    )}
                </div>
            </div>
            <div className="flex justify-center space-x-2 mt-4">
                <button
                    onClick={() => onEdit(id)}
                    className="flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    <Pencil size={16} className="mr-2" />
                    Editar
                </button>
                <button
                    onClick={() => onDelete(id)}
                    className="flex items-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                    <Trash2 size={16} className="mr-2" />
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default BodegaCard;
