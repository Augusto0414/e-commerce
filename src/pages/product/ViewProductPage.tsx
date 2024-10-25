import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../components';
import { getAllProducto, filterProductos, ProductoData, deleteProducto, updateProducto } from "../../api/index";
import TableView from '../../components/table/TableView';
import { TableColumn } from 'react-data-table-component';
import { toast } from 'react-toastify';


const ViewProductPage: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<ProductoData[] | undefined>([]);
    const [filter, setFilter] = useState('');

    const fetchProducto = useCallback(async () => {
        try {
            const productos = filter ? await filterProductos(filter) : await getAllProducto();
            setData(productos);
        } catch (error) {
            toast.error("Error al obtener el producto");
        }
    },
        [filter]
    )

    useEffect(() => {
        fetchProducto();
    }, [fetchProducto]);

    const columns: TableColumn<Record<string, any>>[] = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true,
        },
        {
            name: 'Descripción',
            selector: row => row.descripcion || 'Sin descripción',
            sortable: true,
        },
        {
            name: 'precio',
            selector: row => row.precio,
            sortable: true,
        },
        {
            name: 'Estado',
            selector: row => row.esActivo ? 'Activo' : 'Inactivo',
            sortable: true,
        },
        {
            name: 'Categoria',
            selector: row => row.categoria,
            sortable: true,
        },
        {
            name: 'Subcategoria',
            selector: row => row.subcategoria,
            sortable: true,
        },
        {
            name: 'Creación',
            selector: row => new Date(row.fechaCreacion).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }),
            sortable: true,
        },
        {
            name: 'Modificación',
            selector: row => new Date(row.fechaModificacion).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }),
            sortable: true,
        },
        {
            name: 'Acciones',
            cell: (row) => (
                <>
                    <button onClick={() => handleEdit(row.id)} className='mr-2 text-blue-500'>Editar</button>
                    <button onClick={() => handleDelete(row.id)} className='text-red-500'>Eliminar</button>
                </>
            ),
        },
    ];

    const handleDelete = async (id: string) => {
        const producto = data?.find((item) => item.id === id)
        if (producto) {
            await deleteProducto(producto.id!)
            setData(data?.filter((item) => item.id !== id))
            toast.success('Producto eliminado correctamente')
        }
    }
    const handleEdit = async (id: string) => {
        const producto = data?.find((item) => item.id !== id)
        if (producto) {

        }
    }
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.value);
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
                        <Input type='search' placeholder='Buscar producto...' value={filter} onChange={handleFilterChange} />
                    </div>
                    <TableView data={data ?? []} columns={columns} />
                </article>
            </section>
        </>
    )
}

export default ViewProductPage