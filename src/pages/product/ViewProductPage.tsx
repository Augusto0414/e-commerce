import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ComboBox, ImageUploader, Input, Label, ShowDialog, TextArea } from '../../components';
import { getAllProducto, filterProductos, ProductoData, deleteProducto, updateProducto } from "../../api/index";
import TableView from '../../components/table/TableView';
import { TableColumn } from 'react-data-table-component';
import { toast } from 'react-toastify';


const ViewProductPage: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<ProductoData[] | undefined>([]);
    const [filter, setFilter] = useState('');
    const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
    const [productStatus, setProductStatus] = useState<boolean>(false);
    const [newDescription, setNewDescription] = useState('');
    const [newProductName, setNewProductName] = useState('')

    const fetchProducto = useCallback(async () => {
        try {
            const productos = filter ? await filterProductos(filter) : await getAllProducto();
            setData(productos || []);
        } catch (error) {
            toast.error("Error al obtener el producto");
            setData([]);
        }
    }, [filter]);


    useEffect(() => {
        fetchProducto();
    }, [fetchProducto]);

    const handleDialogToggle = (): void => {
        setIsOpenDialog(prev => !prev);
    }

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
            handleDialogToggle();
            setNewProductName(producto.nombre);
            const updatedProducto = {
                id: producto.id,
                nombre: producto.nombre,
                descripcion: newDescription,
                precio: producto.precio,
                esActivo: productStatus,
                // categoriaId: producto.categoriaId,
                // subcategoriaId: producto.subcategoriaId,
                fechaCreacion: producto.fechaCreacion,
                fechaModificacion: new Date(),
                // };
                // await updateProducto(updatedProducto)
                // setData(data?.map((item) => item.id === id? updatedProducto : item))
                // toast.success('Producto actualizado correctamente')
                // handleDialogToggle();
            }

        }
    }

    const optionProductStatus = [
        { value: "true", label: "Activo" },
        { value: "false", label: "Inactivo" },
    ];

    const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setProductStatus(event.target.value === "true");
    };

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
            <ShowDialog
                isOpen={isOpenDialog}
                onClose={handleDialogToggle}
                title="Editar producto"
            >
                <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <Label htmlFor="nombre" className="py-2">
                                Nombre
                                <Input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    placeholder="Nombre del producto"
                                    value={newProductName}
                                    onChange={(e) => setNewProductName(e.target.value)}
                                />
                            </Label>
                        </div>

                        <div>
                            <Label htmlFor="precio" className="py-2">
                                Precio
                                <Input
                                    type="text"
                                    id="precio"
                                    name="precio"
                                    placeholder="Precio del producto"
                                />
                            </Label>
                        </div>

                        {/* ComboBox para el estado al lado del campo Precio */}
                        <div>
                            <Label htmlFor="estado" className="py-2">
                                Estado
                                <ComboBox
                                    name="estado"
                                    options={optionProductStatus}
                                    value={productStatus ? "true" : "false"}
                                    onChange={handleProductChange}
                                />
                            </Label>
                        </div>

                        {/* Estado del producto: múltiples ComboBoxes */}
                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Label htmlFor="categoria" className="py-2">
                                Estado 1
                                <ComboBox
                                    name="categoria"
                                    options={optionProductStatus}
                                    value={productStatus ? "true" : "false"}
                                    onChange={handleProductChange}
                                />
                            </Label>
                            <Label htmlFor="categoria2" className="py-2">
                                Estado 2
                                <ComboBox
                                    name="categoria2"
                                    options={optionProductStatus}
                                    value={productStatus ? "true" : "false"}
                                    onChange={handleProductChange}
                                />
                            </Label>
                        </div>

                        {/* Descripción y Subir Imagen */}
                        <div className="md:col-span-2">
                            <Label htmlFor="descripcion" className="py-2">
                                Descripción del producto <span className="font-medium">(Opcional)</span>
                                <TextArea
                                    name="descripcion"
                                    id="descripcion"
                                    placeholder="Ej: Producto aclarador para el cabello"
                                    value={newDescription}
                                    onChange={(e) => setNewDescription(e.target.value)}
                                />
                            </Label>
                            <Label htmlFor="imageUpload" className="py-2">
                                Subir Imagen
                                <ImageUploader />
                            </Label>
                        </div>
                    </div>

                    {/* Botón Guardar */}
                    <div className="w-full flex justify-center py-4">
                        <button
                            className="w-full bg-dark-blue px-4 py-4 text-white rounded-lg"
                            type="submit"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </ShowDialog>

        </>
    )
}

export default ViewProductPage