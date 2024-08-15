import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, LabelList } from 'recharts';

const data = [
    { name: 'Bodega 1', value: 400 },
    { name: 'Bodega 2', value: 300 },
    { name: 'Bodega 3', value: 300 },
    { name: 'Bodega 4', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ProductPieChart: React.FC = () => {
    return (
        <PieChart width={400} height={400}>
            <Pie
                data={data}
                cx={200}
                cy={200}
                innerRadius={60}
                outerRadius={120}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                <LabelList dataKey="value" position="inside" fill="#fff" />
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    );
};

export default ProductPieChart;
