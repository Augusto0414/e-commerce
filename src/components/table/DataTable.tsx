import React from 'react';

interface DataTableProps {
    columns: string[];
    data: Array<Record<string, any>>;
    onEdit?: (id: any) => void;
    onDelete?: (id: any) => void;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, onEdit, onDelete }) => {
    return (
        <table className="table-auto w-full border-collapse border border-gray-200">
            <thead className='bg-dark-blue'>
                <tr>
                    {columns.map((column, index) => (
                        <th
                            key={index}
                            className="px-4 py-2 text-white font-medium border-b border-gray-300 text-center"
                        >
                            {column}
                        </th>
                    ))}
                    {(onEdit || onDelete) && (
                        <th
                            className="px-4 py-2 text-white font-medium border-b border-gray-300 text-center"
                        >
                            Acciones
                        </th>
                    )}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column, colIndex) => (
                            <td
                                key={colIndex}
                                className="px-4 py-2 border-b border-gray-300 text-center"
                            >
                                {row[column]}
                            </td>
                        ))}
                        {(onEdit || onDelete) && (
                            <td
                                className="px-4 py-2 border-b border-gray-300 text-center"
                            >
                                {onEdit && (
                                    <button
                                        onClick={() => onEdit(row.ID)}
                                        className="py-2 px-4 mr-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                                    >
                                        Editar
                                    </button>
                                )}
                                {onDelete && (
                                    <button
                                        onClick={() => onDelete(row.ID)}
                                        className="py-2 px-4 rounded-lg bg-red-500 text-white hover:bg-red-600"
                                    >
                                        Eliminar
                                    </button>
                                )}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataTable;
