import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from "lucide-react";

const data = [
    { name: 'Jan', Ventas: 5000, Devoluciones: 1500 },
    { name: 'Feb', Ventas: 6000, Devoluciones: 1200 },
    { name: 'Mar', Ventas: 7000, Devoluciones: 1700 },
    { name: 'Apr', Ventas: 8000, Devoluciones: 1300 },
    { name: 'May', Ventas: 7500, Devoluciones: 1400 },
    { name: 'Jun', Ventas: 6200, Devoluciones: 1600 },
    { name: 'Jul', Ventas: 6900, Devoluciones: 1800 },
    { name: 'Aug', Ventas: 7200, Devoluciones: 1900 },
    { name: 'Sep', Ventas: 7400, Devoluciones: 2000 },
    { name: 'Oct', Ventas: 6800, Devoluciones: 1500 },
    { name: 'Nov', Ventas: 7100, Devoluciones: 1700 },
    { name: 'Dec', Ventas: 7500, Devoluciones: 1600 }
];

import React from 'react'

const SalesChart: React.FC = () => {
    return (
        <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
            <div className='flex items-center'>
                <div className='bg-blue-500 rounded-full text-bone p-2'>
                    <TrendingUp />
                </div>
                <strong className="text-gray-700 font-medium flex ml-3"> Estadistica de ventas</strong>
            </div>
            <div className="mt-3 w-full flex-1 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 10, left: -10, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Ventas" fill="#0ea5e9" />
                        <Bar dataKey="Devoluciones" fill="#ea580c" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default SalesChart
