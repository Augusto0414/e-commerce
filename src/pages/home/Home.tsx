import React from 'react'
import { ChartLine, Clock, DollarSign, UsersRound } from "lucide-react";
import Card from '../../components/card/Card';
import SalesChart from '../../components/charts/SalesChart';
import TableView from '../../components/table/TableView';
import ProductPieChart from '../../components/charts/ProductPieChart';
import { TableColumn } from 'react-data-table-component';

interface DataRow {
    id: number;
    name: string;
    email: string;
    phone: string;
}

const Home: React.FC = () => {
    const data: DataRow[] = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '1234567890' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '9876543210' },
    ]

    const columns: TableColumn<DataRow>[] = [
        {
            name: 'Id',
            selector: row => row.id,
        },
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Email',
            selector: row => row.email,
            cell: row => <a href={`mailto:${row.email}`}>{row.email}</a>,
            sortable: true,
            right: true,
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            sortable: true,
            right: true,
        },
    ]
    return (
        <>
            <section className="w-full p-6">
                <h1 className="text-2xl font-bold text-dark-blue mb-4">Bienvenido administrador 👋</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <Card
                        title="Ventas totales"
                        value="1234"
                        icon={<ChartLine />}
                        bgIconColor="bg-blue-100"
                        iconColor="text-blue-500"
                        bgColor='bg-dark-blue'
                        textColor='text-bone'
                    />
                    <Card
                        title="Ingresos"
                        value="$864.00"
                        icon={<DollarSign />}
                        bgIconColor="bg-green-100"
                        iconColor="text-green-500"
                        bgColor='bg-dark-blue'
                        textColor='text-bone'
                    />
                    <Card
                        title="Pedidos recientes"
                        value="0"
                        icon={<Clock />}
                        bgIconColor="bg-yellow-50"
                        iconColor="text-yellow-600"
                        bgColor='bg-dark-blue'
                        textColor='text-bone'
                    />
                    <Card
                        title="Número de clientes"
                        value="12"
                        icon={<UsersRound />}
                        bgIconColor="bg-gray-100"
                        iconColor="tetx-dark-blue"
                        bgColor='bg-dark-blue'
                        textColor='text-bone'
                    />
                </div>
            </section>
            <section className="w-full p-6">
                <section className="w-full p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Gráficas: SalesChart y ProductPieChart una al lado de la otra */}
                        <div className="flex justify-center items-center">
                            <SalesChart />
                        </div>
                        <div className="flex justify-center items-center">
                            <ProductPieChart />
                        </div>
                    </div>
                    <div className="w-full mt-6">
                        <h2 className="text-2xl font-bold text-dark-blue mb-4">Producto más vendido</h2>
                        <TableView data={data} columns={columns} />
                    </div>
                </section>

            </section>


        </>
    )
}

export default Home
