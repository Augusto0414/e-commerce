import React, { useCallback, useEffect, useState } from 'react';
import { ComboBox, DataTable, Input, Label, ShowDialog } from '../../components';
import { getAllCategories, createSubCategorie, getAllSubCategories, filterSubCategories } from '../../api/index';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubCategoryPage: React.FC = () => {
    const [data, setData] = useState<Array<Record<string, any>>>([]);
    const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
    const [filter, setFilter] = useState<string>('');
    const [categories, setCategories] = useState<Array<{ value: string, label: string }>>([]);
    const [subcategoryName, setSubcategoryName] = useState<string>('');

    const fetchCategories = async () => {
        try {
            const categoriesData = await getAllCategories();
            const options = categoriesData
                .filter((category) => category.id !== undefined)
                .map((category) => ({
                    value: String(category.id),
                    label: category.nombre || 'Sin nombre',
                }));
            setCategories(options);
        } catch (err) {
            toast.error('Error al obtener categorías');
        }
    };



    const fetchSubcategories = useCallback(
        async () => {
            try {
                const subcategories = filter ? await filterSubCategories(filter) : await getAllSubCategories();
                setData(subcategories);
            } catch (err) {
                toast.error('Error al obtener subcategorías');
            }
        },
        [filter]
    )

    useEffect(() => {
        fetchCategories();
        fetchSubcategories();
    }, [fetchSubcategories]);

    const handleDialogToggle = () => setIsOpenDialog(prev => !prev);

    const handleComboBoxChange = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategoryId(event.target.value);

    const handleEdit = (id: any) => {
        console.log(`Edit item with ID: ${id}`);
    };

    const handleDelete = async (id: any) => {
        console.log(`Delete item with ID ${id}`);
        setData(prevData => prevData.filter(item => item.id !== id));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCategoryId) {
            toast.error('Debe seleccionar una categoría');
            return;
        }
        try {
            await createSubCategorie({ categoriaId: parseInt(selectedCategoryId), nombre: subcategoryName });
            setSubcategoryName('');
            setSelectedCategoryId('');
            toast.success('Subcategoría añadida exitosamente');
            handleDialogToggle();
            fetchSubcategories();
        } catch (error) {
            toast.error('Error al crear la subcategoría');
        }
    };

    const columns = ['id', 'nombre'];

    return (
        <>
            <header className='flex justify-between px-4 items-center'>
                <h1 className='text-dark-blue text-2xl'>Subcategorías</h1>
                <div className='flex items-center'>
                    <button onClick={handleDialogToggle} className='bg-dark-blue px-4 py-2 mr-4 text-white rounded-lg'>
                        Añadir Subcategoría
                    </button>
                </div>
            </header>

            <section className='w-full px-2'>
                <article className='p-4'>
                    <div className='w-1/2 my-4'>
                        <Input type='search' placeholder='Buscar subcategoría...' value={filter} onChange={(e) => setFilter(e.target.value)} />
                    </div>
                    <DataTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />
                </article>
            </section>

            <ShowDialog isOpen={isOpenDialog} onClose={handleDialogToggle} title='Añadir Subcategoría'>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-1 gap-4'>
                        <div className='w-full px-2'>
                            <Label htmlFor="categoria">
                                Seleccione una categoría
                                <ComboBox name="categoria" options={categories} value={selectedCategoryId} onChange={handleComboBoxChange} />
                            </Label>
                        </div>
                        <div className='w-full px-2'>
                            <Label htmlFor="subcategorias">
                                Nombre de la Subcategoría
                                <Input type="text" name='subcategorias' id='subcategorias' placeholder="Ej: Hogar" value={subcategoryName} onChange={(e) => setSubcategoryName(e.target.value)} />
                            </Label>
                        </div>
                    </div>
                    <div className='w-full flex justify-center p-2'>
                        <button type='submit' className='w-full bg-dark-blue px-4 py-4 text-white rounded-lg'>Añadir</button>
                    </div>
                </form>
            </ShowDialog>
            <ToastContainer />
        </>
    );
};

export default SubCategoryPage;
