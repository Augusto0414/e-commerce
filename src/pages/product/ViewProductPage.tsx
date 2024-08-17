import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataTable, Input } from '../../components';

const ViewProductPage: React.FC = () => {
    const navigate = useNavigate();
    const [dataT, setData] = useState<Array<Record<string, any>>>([]);

    const columns = ['ID', 'Nombre', 'Precio', 'Stock', 'Acciones'];

    const data = [
        { ID: 1, Nombre: 'Producto 1', Precio: '$10', Stock: 20, Acciones: 'Editar' },
        { ID: 2, Nombre: 'Producto 2', Precio: '$15', Stock: 15, Acciones: 'Editar' },
        { ID: 3, Nombre: 'Producto 3', Precio: '$8', Stock: 30, Acciones: 'Editar' },
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
            <header className='flex justify-between px-2 items-center'>
                <h1 className='text-dark-blue text-2xl font-medium sm:px-4'>
                    Productos
                </h1>
                <div className='flex mx-4 items-center'>
                    <button onClick={() => navigate('create')} className='bg-dark-blue text-white px-6 py-2 rounded-md'>
                        Añadir
                    </button>
                </div>
            </header>
            <section className='w-full px-2'>
                <article className='p-4 '>
                    <div className='w-1/2 my-4'>
                        <Input type='search' placeholder='Buscar producto...' />
                    </div>
                    <DataTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />
                </article>
            </section>
        </>
    )
}

export default ViewProductPage