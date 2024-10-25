import { Pencil, Trash2 } from 'lucide-react';
import React from 'react';

interface CardProps {
    id: string;
    nombre: string;
    ubicacion: string;
    capacidad: string;
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
        <div className="max-w-sm w-full h-auto bg-white rounded-xl p-6 border border-gray-300 shadow-lg transition-transform hover:scale-105 hover:shadow-xl">
            <div className="flex-1">
                <h2 className="text-2xl font-semibold text-dark-blue truncate">{nombre}</h2>
                <p className="text-gray-700 truncate"><strong>Ubicación:</strong> {ubicacion}</p>
                <p className="text-gray-700"><strong>Capacidad:</strong> {capacidad} m³</p>
                <div className="text-sm text-gray-500 mt-3">
                    {fechaCreacion && (
                        <p className="truncate"><strong>Fecha de Creación:</strong> {formatDate(fechaCreacion)}</p>
                    )}
                    {fechaModificacion && (
                        <p className="truncate"><strong>Fecha de Modificación:</strong> {formatDate(fechaModificacion)}</p>
                    )}
                </div>
            </div>
            <div className="flex justify-around mt-5">
                <button
                    onClick={() => onEdit(id)}
                    aria-label={`Editar ${nombre}`}
                    className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
                >
                    <Pencil size={18} className="mr-2" />
                    Editar
                </button>
                <button
                    onClick={() => onDelete(id)}
                    aria-label={`Eliminar ${nombre}`}
                    className="flex items-center bg-red-600 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-red-700 transition-colors"
                >
                    <Trash2 size={18} className="mr-2" />
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default BodegaCard;
