import React, { useEffect, useState, useCallback } from 'react';
import { DataTable, Input, Label, ShowDialog } from '../../components';
import { createCategorie, getAllCategories, filterCategories, deleteCategorie, updateCategorie, CategoriesData } from '../../api/index';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryPage: React.FC = () => {
    const [data, setData] = useState<CategoriesData[]>([]);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
    const [filter, setFilter] = useState('');

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
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editCategoryId !== null) {
                await updateCategorie(editCategoryId, { nombre: newCategoryName });
                setEditCategoryId(null);
                setIsOpenDialog(false);
                toast.success('Categoría actualizada exitosamente');
            } else {
                await createCategorie({ nombre: newCategoryName });
                toast.success('Categoría añadida exitosamente');
            }
            setNewCategoryName('');
            fetchCategories();
        } catch (err) {
            toast.error('Error al procesar la categoría');
        }
    };

    const handleEdit = (id: number) => {
        const category = data.find(item => item.id === id);
        if (category) {
            setNewCategoryName(category.nombre);
            setEditCategoryId(id);
            setIsOpenDialog(true);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteCategorie(id);
            toast.success('Categoría eliminada exitosamente');
            fetchCategories();
        } catch (err) {
            toast.error('Error al eliminar categoría');
        }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.value);

    return (
        <>
            <header className="flex justify-between px-4 items-center">
                <h1 className="text-dark-blue text-2xl">Categorías</h1>
                <button onClick={handleDialogToggle} className="bg-dark-blue px-4 py-2 text-white rounded-lg">
                    Añadir categoría
                </button>
            </header>

            <section className="w-full px-2">
                <article className="p-4">
                    <div className="w-1/2 my-4">
                        <Input
                            type="search"
                            placeholder="Buscar categoría..."
                            value={filter}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <DataTable
                        columns={['id', 'nombre', 'createdAt', 'updatedAt']}
                        data={data}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </article>
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
                        <Label htmlFor="categoria" className="md:col-span-3 p-2">
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
                    <div className="w-full flex justify-center p-2">
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
