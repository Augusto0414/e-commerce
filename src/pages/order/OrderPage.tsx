import { ArrowDown, ArrowUp } from 'lucide-react'
import React from 'react'
import { TableColumn } from 'react-data-table-component';
import TableView from '../../components/table/TableView';


interface DataRow {
    orden: number;
    cliente: string;
    estado: string;
    teléfono: string;
    producto: string;
    numeroBodega: number;
    fecha: string;
    total: number;
}

const OrderPage: React.FC = () => {
    const data: DataRow[] = [
        {
            orden: 1,
            cliente: 'John Doe',
            estado: 'Enviado',
            teléfono: '1234567890',
            producto: 'Producto A',
            numeroBodega: 101,
            fecha: '2024-08-15',
            total: 150.00
        },
        {
            orden: 2,
            cliente: 'Jane Smith',
            estado: 'Pendiente',
            teléfono: '0987654321',
            producto: 'Producto B',
            numeroBodega: 102,
            fecha: '2024-08-16',
            total: 200.00
        },
    ]
    const columns: TableColumn<DataRow>[] = [
        {
            name: 'Orden',
            selector: row => row.orden,
            sortable: true,
        },
        {
            name: 'Cliente',
            selector: row => row.cliente,
        },
        {
            name: 'Estado',
            selector: row => row.estado,
        },
        {
            name: 'Teléfono',
            selector: row => row.teléfono,
        },
        {
            name: 'Producto',
            selector: row => row.producto,
        },
        {
            name: 'Número Bodega',
            selector: row => row.numeroBodega,
        },
        {
            name: 'Fecha',
            selector: row => row.fecha,
        },
        {
            name: 'Total',
            selector: row => row.total,
            right: true,
        },
    ]
    return (
        <>
            <header className='flex justify-between px-4 items-center'>
                <h1 className='text-dark-blue text-2xl font-medium'>Pedidos</h1>
                <div className=' flex items-center mx-4'>
                    <button className='mx-4 p-4 text-dark-blue rounded-md flex items-center px-4 py-2'>
                        <ArrowUp className='mr-2' />
                        Exportar
                    </button>
                    <button className='mx-4 bg-dark-blue p-4 rounded-md text-bone flex items-center px-4 py-2'>
                        <ArrowDown className="mr-2" />
                        Importar
                    </button>
                </div>
            </header>
            <div className='my-4 p-4'>
                <input
                    type="search"
                    placeholder='Buscar pedido...'
                    className='p-2 w-full md:w-1/2 rounded-lg border border-gray-500 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 transition-colors duration-300'
                />
            </div>
            <article className='my-4'>
                <TableView data={data} columns={columns} />
            </article>
        </>
    )
}

export default OrderPage
