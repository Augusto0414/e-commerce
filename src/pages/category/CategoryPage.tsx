import React, { useEffect, useState, useCallback } from 'react';
import { Input, Label, ShowDialog, TextArea } from '../../components';
import { createCategorie, getAllCategories, filterCategories, deleteCategorie, updateCategorie, CategoriesData } from '../../api/index';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TableColumn } from 'react-data-table-component';
import TableView from '../../components/table/TableView';
import { Plus } from 'lucide-react';

const CategoryPage: React.FC = () => {
    const [data, setData] = useState<CategoriesData[]>([]);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editCategoryId, setEditCategoryId] = useState<string | null>(null);
    const [filter, setFilter] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const fetchCategories = useCallback(async () => {
        try {
            const categories = filter ? await filterCategories(filter) : await getAllCategories();
            setData(categories);
        } catch (err) {
            toast.error('Error al obtener categorías');
        }
    }, [filter]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleDialogToggle = () => {
        setIsOpenDialog(prev => !prev);
        if (editCategoryId === null) {
            setNewCategoryName('');
            setNewDescription("");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editCategoryId !== null) {
                await updateCategorie(editCategoryId, { nombre: newCategoryName, descripcion: newDescription });
                setEditCategoryId(null);
                setIsOpenDialog(false);
                toast.success('Categoría actualizada exitosamente');
            } else {
                await createCategorie({ nombre: newCategoryName, descripcion: newDescription });
                toast.success('Categoría añadida exitosamente');
            }
            setNewCategoryName('');
            fetchCategories();
        } catch (err) {
            toast.error('Error al procesar la categoría');
        }
    };

    const handleEdit = (id: string) => {
        const category = data.find(item => item.id === id);
        if (category) {
            setNewCategoryName(category.nombre);
            setNewDescription(category.descripcion ?? "");
            setEditCategoryId(id);
            setIsOpenDialog(true);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteCategorie(id);
            toast.success('Categoría eliminada exitosamente');
            fetchCategories();
        } catch (err) {
            toast.error('Error al eliminar categoría');
        }
    };

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
            name: 'Acciones',
            cell: (row) => (
                <>
                    <button onClick={() => handleEdit(row.id)} className='mr-2 text-blue-500'>Editar</button>
                    <button onClick={() => handleDelete(row.id)} className='text-red-500'>Eliminar</button>
                </>
            ),
        },
    ];

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.value);

    return (
        <>
            <header className='flex flex-col sm:flex-row justify-between items-center px-4 py-2 bg-white'>
                <h1 className='text-dark-blue text-2xl mb-2 sm:mb-0'>Subcategorías</h1>
                <div className='flex items-center space-x-2 w-full sm:w-auto'>
                    <Input type='search' placeholder='Buscar subcategoría...' value={filter} onChange={handleFilterChange} />
                    <button onClick={handleDialogToggle} className='flex items-center bg-dark-blue px-4 py-3 text-white rounded-lg'>
                        <Plus className="mr-2" size={16} />
                        Añadir
                    </button>
                </div>
            </header>

            <section className="w-full px-2">
                <TableView data={data} columns={columns} />
            </section>

            <ShowDialog
                isOpen={isOpenDialog}
                onClose={() => {
                    handleDialogToggle();
                    setEditCategoryId(null);
                }}
                title={editCategoryId !== null ? "Editar categoría" : "Añadir categoría"}
            >
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4">
                        <Label htmlFor="categoria" className="md:col-span-3 py-2">
                            Nombre de la categoría
                            <Input
                                type="text"
                                name="categoria"
                                id="categoria"
                                placeholder="Ej: Hogar"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                            />
                        </Label>
                    </div>
                    <div className='"grid grid-cols-1 gap-4"'>
                        <Label htmlFor="descripcion" className='md:col-span-3 py-2'>
                            Descripción de la Subcategoría <span className='font-medium'>(Opcional)</span>
                            <TextArea
                                name='descripcion'
                                id='descripcion'
                                placeholder="Ej: En esta categoria, agregar solo los productos del hogar"
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                            />
                        </Label>
                    </div>
                    <div className="w-full flex justify-center py-2">
                        <button type="submit" className="w-full bg-dark-blue px-4 py-4 text-white rounded-lg">
                            {editCategoryId !== null ? "Actualizar" : "Añadir"}
                        </button>
                    </div>
                </form>
            </ShowDialog>

            <ToastContainer />
        </>
    );
};

export default CategoryPage;
