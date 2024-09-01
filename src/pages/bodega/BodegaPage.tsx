import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input, Label } from '../../components';
import { Plus } from 'lucide-react';
import BodegaCard from '../../components/card/BodegaCard';

const BodegaPage: React.FC = () => {
    const [dataT, setData] = useState<Array<Record<string, any>>>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    const handleEdit = (id: any) => {
        console.log(`Edit item with ID: ${id}`);
    };

    const handleDelete = (id: any) => {
        console.log(`Delete item with ID: ${id}`);
        setData((prevData) => prevData.filter((item) => item.ID !== id));
    };
    return (
        <>
            <header className='flex flex-col sm:flex-row justify-between items-center px-4 py-2 bg-white'>
                <h1 className='text-dark-blue text-2xl mb-2 sm:mb-0'>Bodegas</h1>
                <div className='flex items-center space-x-2 w-full sm:w-auto'>
                    <Input type='search' placeholder='Buscar subcategoría...' />
                    <button onClick={handleToggle} className='flex items-center bg-dark-blue px-4 py-3 text-white rounded-lg'>
                        <Plus className="mr-2" size={16} />
                        Añadir
                    </button>
                </div>
            </header>
            <section className='w-full px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                <BodegaCard
                    id='qws1'
                    nombre="Bodega Central"
                    ubicacion="Ciudad de México"
                    capacidad={1500}
                    fechaCreacion="2024-01-15"
                    fechaModificacion="2024-09-01"
                    onEdit={(id) => handleEdit(id)}
                    onDelete={(id) => handleDelete(id)}
                />
                <BodegaCard
                    id='qws1'
                    nombre="Bodega Central"
                    ubicacion="Ciudad de México"
                    capacidad={1500}
                    fechaCreacion="2024-01-15"
                    fechaModificacion="2024-09-01"
                    onEdit={(id) => handleEdit(id)}
                    onDelete={(id) => handleDelete(id)}
                />
                <BodegaCard
                    id='qws1'
                    nombre="Bodega Central"
                    ubicacion="Ciudad de México"
                    capacidad={1500}
                    fechaCreacion="2024-01-15"
                    fechaModificacion="2024-09-01"
                    onEdit={(id) => handleEdit(id)}
                    onDelete={(id) => handleDelete(id)}
                />
                <BodegaCard
                    id='qws1'
                    nombre="Bodega Central"
                    ubicacion="Ciudad de México"
                    capacidad={1500}
                    fechaCreacion="2024-01-15"
                    fechaModificacion="2024-09-01"
                    onEdit={(id) => handleEdit(id)}
                    onDelete={(id) => handleDelete(id)}
                />
                <BodegaCard
                    id='qws1'
                    nombre="Bodega Central"
                    ubicacion="Ciudad de México"
                    capacidad={1500}
                    fechaCreacion="2024-01-15"
                    fechaModificacion="2024-09-01"
                    onEdit={(id) => handleEdit(id)}
                    onDelete={(id) => handleDelete(id)}
                />
                <BodegaCard
                    id='qws1'
                    nombre="Bodega Central"
                    ubicacion="Ciudad de México"
                    capacidad={1500}
                    fechaCreacion="2024-01-15"
                    fechaModificacion="2024-09-01"
                    onEdit={(id) => handleEdit(id)}
                    onDelete={(id) => handleDelete(id)}
                />
                <BodegaCard
                    id='qws1'
                    nombre="Bodega Central"
                    ubicacion="Ciudad de México"
                    capacidad={1500}
                    fechaCreacion="2024-01-15"
                    fechaModificacion="2024-09-01"
                    onEdit={(id) => handleEdit(id)}
                    onDelete={(id) => handleDelete(id)}
                />

            </section>
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-white shadow-custom transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}
                style={{ transition: 'transform 0.3s ease-in-out' }}
            >
                <div className='flex items-center justify-end px-4 py-2'>
                    <button
                        onClick={handleToggle}
                        className='text-gray-600 hover:text-blue-500 text-lg'
                    >
                        Cerrar
                    </button>
                </div>
                <form action="">
                    <div className='flex flex-col'>
                        <div className='p-4 space-y-3'>
                            <Label htmlFor="nombre" className="block">
                                Nombre de la bodega
                                <Input
                                    type='text'
                                    id='nombre'
                                    name='nombre'
                                    placeholder='Nombre de la Bodega'
                                    required
                                />
                            </Label>
                            <Label htmlFor="ubicacion" className="block">
                                Ubicación
                                <Input
                                    type='text'
                                    id='ubicacion'
                                    name='ubicacion'
                                    placeholder='Ubicación'
                                    required
                                />
                            </Label>
                            <Label htmlFor="capacidad" className="block">
                                Capacidad
                                <Input
                                    type='number'
                                    id='capacidad'
                                    name='capacidad'
                                    placeholder='Capacidad'
                                    required
                                />
                            </Label>
                        </div>
                        <div className='p-4'>
                            <button type='submit' className='w-full bg-dark-blue px-4 py-2 text-white rounded-lg'>
                                {isOpen ? 'Actualizar' : 'Añadir'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default BodegaPage

