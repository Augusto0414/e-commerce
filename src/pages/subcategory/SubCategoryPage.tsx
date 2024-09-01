import React, { useEffect, useState, useCallback } from 'react';
import { ComboBox, Input, Label, ShowDialog, TextArea } from '../../components';
import { getAllCategories, createSubCategorie, getAllSubCategories, filterSubCategories, deleteSubcategorie, updateSubcategorie, SubCategoriesData } from '../../api/index';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableView from '../../components/table/TableView';
import { TableColumn } from 'react-data-table-component';
import { Plus } from 'lucide-react';

const SubCategoryPage: React.FC = () => {
    const [data, setData] = useState<SubCategoriesData[]>([]);
    const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
    const [filter, setFilter] = useState<string>('');
    const [categories, setCategories] = useState<Array<{ value: string, label: string }>>([]);
    const [subcategoryName, setSubcategoryName] = useState<string>('');
    const [editSubcategoryId, setEditSubcategoryId] = useState<string | null>(null);
    const [newDescription, setNewDescription] = useState<string>('');

    const fetchCategories = async () => {
        try {
            const categoriesData = await getAllCategories();
            const options = categoriesData.map((category) => ({
                value: String(category.id),
                label: category.nombre || 'Sin nombre',
            }));
            setCategories(options);
        } catch (err) {
            toast.error('Error al obtener categorías');
        }
    };

    const fetchSubcategories = useCallback(async () => {
        try {
            const subcategories = filter ? await filterSubCategories(filter) : await getAllSubCategories();
            setData(subcategories);
        } catch (err) {
            toast.error('Error al obtener subcategorías');
        }
    }, [filter]);

    useEffect(() => {
        fetchCategories();
        fetchSubcategories();
    }, [fetchSubcategories]);

    const handleDialogToggle = () => {
        setIsOpenDialog(!isOpenDialog);
        if (!isOpenDialog) {
            setSubcategoryName('');
            setSelectedCategoryId('');
            setNewDescription('');
            setEditSubcategoryId(null);
            setSelectedCategoryId(categories.length > 0 ? categories[0].value : '');
        }
    };

    const handleComboBoxChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategoryId(event.target.value);
    };

    const handleEdit = (id: string) => {
        const subcategory = data.find((item) => item.id === id);
        if (subcategory) {
            setEditSubcategoryId(id);
            setSubcategoryName(subcategory.nombre);
            setNewDescription(subcategory.descripcion!);
            setSelectedCategoryId(String(subcategory.categoriaId));
            setIsOpenDialog(true);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteSubcategorie(id);
            toast.success('Subcategoría eliminada exitosamente');
            fetchSubcategories();
        } catch (error) {
            toast.error('Error al intentar eliminar este elemento');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCategoryId) {
            toast.error('Debe seleccionar una categoría');
            return;
        }
        try {
            if (editSubcategoryId) {
                await updateSubcategorie(editSubcategoryId, { categoriaId: selectedCategoryId, nombre: subcategoryName, descripcion: newDescription }); // Usa "descripcion" aquí
                toast.success('Subcategoría actualizada exitosamente');
            } else {
                await createSubCategorie({ categoriaId: selectedCategoryId, nombre: subcategoryName, descripcion: newDescription }); // Usa "descripcion" aquí
                toast.success('Subcategoría añadida exitosamente');
            }
            setIsOpenDialog(false);
            setEditSubcategoryId(null);
            setSubcategoryName('');
            setSelectedCategoryId('');
            setNewDescription('');
            fetchSubcategories();
        } catch (error) {
            toast.error('Error al guardar la subcategoría');
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
            name: 'Categoría',
            selector: row => row.categoriaNombre,
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

    return (
        <>
            <header className='flex flex-col sm:flex-row justify-between items-center px-4 py-2 bg-white'>
                <h1 className='text-dark-blue text-2xl mb-2 sm:mb-0'>Subcategorías</h1>
                <div className='flex items-center space-x-2 w-full sm:w-auto'>
                    <Input type='search' placeholder='Buscar subcategoría...' value={filter} onChange={(e) => setFilter(e.target.value)} />
                    <button onClick={handleDialogToggle} className='flex items-center bg-dark-blue px-4 py-3 text-white rounded-lg'>
                        <Plus className="mr-2" size={16} />
                        Añadir
                    </button>
                </div>
            </header>

            <section className='w-full px-2'>
                <article className='p-4'>
                    <TableView data={data} columns={columns} />
                </article>
            </section>

            <ShowDialog isOpen={isOpenDialog} onClose={handleDialogToggle} title={editSubcategoryId ? 'Editar Subcategoría' : 'Añadir Subcategoría'}>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-1 gap-4'>
                        {
                            !editSubcategoryId && (
                                <div className='w-full px-2'>
                                    <Label htmlFor="categoria">
                                        Seleccione una categoría
                                        <ComboBox
                                            name="categoria"
                                            options={categories}
                                            value={selectedCategoryId}
                                            onChange={handleComboBoxChange}
                                        />
                                    </Label>
                                </div>
                            )
                        }
                        <div className='w-full px-2'>
                            <Label htmlFor="subcategorias">
                                Nombre de la Subcategoría
                                <Input
                                    type="text"
                                    name='subcategorias'
                                    id='subcategorias'
                                    placeholder="Ej: Hogar"
                                    value={subcategoryName}
                                    onChange={(e) => setSubcategoryName(e.target.value)}
                                />
                            </Label>
                        </div>
                        <div className='w-full px-2'>
                            <Label htmlFor="descripcion">
                                Descripción de la Subcategoría <span className='font-medium'>(Opcional)</span>
                                <TextArea
                                    name='descripcion'
                                    id='descripcion'
                                    placeholder="Ej: Agregar en esta subcategoria, solo los producto de larga duración"
                                    value={newDescription}
                                    onChange={(e) => setNewDescription(e.target.value)}
                                />
                            </Label>
                        </div>
                    </div>
                    <div className='w-full flex justify-center p-2'>
                        <button type='submit' className='w-full bg-dark-blue px-4 py-4 text-white rounded-lg'>
                            {editSubcategoryId ? 'Editar' : 'Añadir'}
                        </button>
                    </div>
                </form>
            </ShowDialog>
            <ToastContainer />
        </>
    );
};

export default SubCategoryPage;
