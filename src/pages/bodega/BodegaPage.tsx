import React, { useState } from 'react'
import { DataTable, Input, Label, ShowDialog } from '../../components'

const BodegaPage: React.FC = () => {
    const [dataT, setData] = useState<Array<Record<string, any>>>([]);
    const [isopenDialog, setIsopenDialog] = useState<boolean>(false);

    const handleOpenDialog = () => {
        setIsopenDialog(true);
    };
    const handleCloseDialog = () => {
        setIsopenDialog(false);
    };

    const columns = ['ID', 'Nombre', 'Fecha', 'Modificacón'];

    const data = [
        { ID: 1, Nombre: 'Producto 1', Fecha: '$10', Modificacón: 20 },
        { ID: 2, Nombre: 'Producto 2', Fecha: '$15', Modificacón: 15 },
        { ID: 3, Nombre: 'Producto 3', Fecha: '$8', Modificacón: 30 },
    ];

    const handleEdit = (id: any) => {
        console.log(`Edit item with ID: ${id}`);
    };

    const handleDelete = (id: any) => {
        console.log(`Delete item with ID: ${id}`);
        setData((prevData) => prevData.filter((item) => item.ID !== id));
    };
    return (
        <>
            <header className='flex justify-between px-4 items-center'>
                <h1 className='text-dark-blue text-2xl'>Bodegas</h1>
                <div className='flex items-center justify-center'>
                    <button onClick={() => handleOpenDialog()} className='bg-dark-blue px-4 py-2 mr-4 text-white rounded-lg' >Añadir bodega</button>
                </div>
            </header>
            <section className='w-full px-2'>
                <article className='p-4 '>
                    <div className='w-1/2 my-4'>
                        <Input type='search' placeholder='Buscar bodega...' />
                    </div>
                    <DataTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />
                </article>
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
