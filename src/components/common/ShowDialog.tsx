import React from 'react';

interface AlertDialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const ShowDialog: React.FC<AlertDialogProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Fondo oscuro semitransparente */}
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

            {/* Contenedor del diálogo adaptable */}
            <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto mx-4 md:mx-auto z-10">
                {/* Botón de cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-gray-200 text-gray-600 p-2 rounded-full hover:bg-gray-300 focus:outline-none"
                >
                    &times;
                </button>

                {/* Título del diálogo */}
                <h2 className="text-xl font-bold mb-4">{title}</h2>

                {/* Contenido del diálogo */}
                {children}
            </div>
        </div>
    );
};

export default ShowDialog;
