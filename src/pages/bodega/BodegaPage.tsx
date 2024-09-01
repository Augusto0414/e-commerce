import React, { useState } from 'react'
import { Input, Label, ShowDialog } from '../../components'
import { Plus } from 'lucide-react';
import CardWareHouse from '../../components/card/CardWareHouse';

const BodegaPage: React.FC = () => {
    const [data, setData] = useState<Array<Record<string, any>>>([]);
    const [isopenDialog, setIsopenDialog] = useState<boolean>(false);

    const handleOpenDialog = () => {
        setIsopenDialog(true);
    };
    const handleCloseDialog = () => {
        setIsopenDialog(false);
    };

    const handleEdit = (id: any) => {
        console.log(`Edit item with ID: ${id}`);
    };

    const handleDelete = (id: any) => {
        console.log(`Delete item with ID: ${id}`);
        setData((prevData) => prevData.filter((item) => item.ID !== id));
    };
    return (
        <>
            <header className="flex flex-col sm:flex-row justify-between items-center px-4 py-2 bg-white">
                <h1 className="text-dark-blue text-2xl mb-2 sm:mb-0">Bodegas</h1>
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <input
                        type="search"
                        placeholder="Buscar bodega..."
                        className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-auto"
                    />
                    <button
                        onClick={() => handleOpenDialog()}
                        className="bg-dark-blue px-4 py-2 text-white rounded-lg flex items-center"
                    >
                        <Plus className="mr-2" size={16} />
                        <span>Añadir</span>
                    </button>
                </div>
            </header>

            <section className=' flex flex-col sm:flex-row w-1/4 shadow-sm bg-white'>
                <div className="py-6 px-4">
                    <CardWareHouse
                        title="Título de la Card"
                        description="Descripción de la card aquí."
                        onEdit={() => handleEdit}
                        onDelete={() => handleDelete}
                    />
                </div>
            </section>

            <ShowDialog
                isOpen={isopenDialog}
                onClose={handleCloseDialog}
                title='Añadir bodega'
                children={
                    <form action=''>
                        <div className='grid grid-cols-1 gap-4'>
                            <div className='md:col-span-3 px-2'>
                                <Label htmlFor="bodega">
                                    Nombre de la bodega
                                    <Input type="text" name='bodega' id='bodega' placeholder="Ej: Santana" />
                                </Label>
                            </div>
                            <div className='md:col-span-3 px-2'>
                                <Label htmlFor="direcion">
                                    Direcion de la bodega
                                    <Input type="text" name='direcion' id='direcion' placeholder="Ej: Calle 32 - 23" />
                                </Label>
                            </div>
                            <div className='md:col-span-3 px-2'>
                                <Label htmlFor="telefono">
                                    Numero de telefono
                                    <Input type="text" name='telefono' id='telefono' placeholder="Ej: 3236679323" />
                                </Label>
                            </div>
                        </div>
                        <div className='w-full flex justify-center p-2'>
                            <button type='submit' className='w-full bg-dark-blue px-4 py-4 text-white rounded-lg'>Añadir</button>
                        </div>
                    </form>
                }
            />
        </>
    )
}

export default BodegaPage
