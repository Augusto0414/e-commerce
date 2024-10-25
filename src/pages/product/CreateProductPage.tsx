import React, { useCallback, useEffect, useState } from 'react'
import { ComboBox, ImageUploader, Input, Label, TextArea } from '../../components/index'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import { createProducto, getAllCategories, getAllSubCategories, getAllBodegas, CategoriesData, SubCategoriesData, BodegaData } from "../../api/index"


const CreateProductPage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
    const [selectedBodega, setSelectedBodega] = useState<string>('');
    const [categorias, setCategorias] = useState<CategoriesData[]>([]);
    const [subCategorias, setSubCategorias] = useState<SubCategoriesData[]>([]);
    const [filteredSubCategories, setFilteredSubCategories] = useState<SubCategoriesData[]>([]);
    const [bodega, setBodega] = useState<BodegaData[]>([]);
    const [nombreProducto, setNombreProducto] = useState<string>('');
    const [precioUnitario, setPrecioUnitario] = useState<string>('');
    const [detailProduct, setDtailProduct] = useState<string>('')
    const [cantidadProduct, setCantidadProduct] = useState<string>('')
    const [descriptionProduct, setDescriptionProduct] = useState<string>('')


    const getCategorias = useCallback(async () => {
        try {
            const [categoriasData, subCategoriasData, bodegaData] = await Promise.all([
                getAllCategories(),
                getAllSubCategories(),
                getAllBodegas(),
            ]);
            setCategorias(categoriasData);
            setSubCategorias(subCategoriasData);
            setBodega(bodegaData);

        } catch (error) {
            console.error("Error al obtener categorías:", error);
        }
    }, []);

    useEffect(() => {
        getCategorias()
    }, [getCategorias])

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryID = event.target.value;
        setSelectedCategory(categoryID)
        const filterSubcategories = subCategorias.filter((subCategoriaData) => subCategoriaData.categoria!.id === categoryID);

        setFilteredSubCategories(filterSubcategories);
    };
    const handleSubCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedSubCategory(event.target.value);
    const handleBodegaChange = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedBodega(event.target.value);


    const optionCategory = [
        { value: '', label: 'Seleccione una categoría' },
        ...categorias.map((categoria) => ({
            value: categoria.id!.toString(),
            label: categoria.nombre,
        })),
    ];

    const optionSubcategorie = [
        { value: '', label: 'Seleccione una subcategoría' },
        ...filteredSubCategories.map((subcategoria) => ({
            value: subcategoria.id!.toString(),
            label: subcategoria.nombre,
        })),
    ];

    const optionBodega = [
        { value: '', label: 'Seleccione una bodega' },
        ...bodega.map((bodegaData) => ({
            value: bodegaData.id!.toString(),
            label: bodegaData.nombre,
        })),
    ];


    const handleSubmmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Formulario enviado");
        try {
            const categoria = categorias.find(categoria => categoria.id === selectedCategory);
            const subcategorie = filteredSubCategories.find(subcategoria => subcategoria.id === selectedSubCategory);

            if (!categoria || !subcategorie) {
                toast.error("La categoría o subcategoria seleccionada no es válida");
                return;
            }

            console.log(subcategorie.id);


            if (!validaciones()) return;

            await createProducto({
                nombre: nombreProducto, precio: Number(precioUnitario), descripcion: descriptionProduct,
                categoria: categoria,
                subcategoria: subcategorie,
                esActivo: true
            });

            limpiarCampos();

            toast.success("Producto guardado exitosamente");


        } catch (error) {
            toast.error("Lo sentimos, ocurrio un problema al guardar este producto");
        }

    }

    const limpiarCampos = (): void => {
        setNombreProducto(''),
            setPrecioUnitario(''),
            setDescriptionProduct('')
        setDtailProduct(''),
            setCantidadProduct('')
    }

    const validaciones = (): boolean => {

        if (!nombreProducto || nombreProducto.trim().length === 0 || nombreProducto === undefined) {
            toast.error('Nombre del producto invalido')
            return false;
        };

        if (!precioUnitario || precioUnitario.trim().length === 0 || precioUnitario === undefined) {
            toast.error('precio unitario invalido')
            return false;
        }


        if (!detailProduct || detailProduct.trim().length === 0 || detailProduct === undefined) {
            toast.error('especificion del producto invalida')
            return false;
        }

        if (!cantidadProduct || cantidadProduct === undefined || cantidadProduct.trim().length === 0) {
            toast.error("cantidad del prodicto invalida")
            return false;
        }
        return true;
    }
    return (
        <>
            <header className='flex justify-between px-4 items-center'>
                <div className='flex justify-center items-center'>
                    <button onClick={() => navigate(-1)}>
                        <ArrowLeft />
                    </button>
                    <h1 className='text-dark-blue text-2xl font-medium sm:px-4'>
                        Crear nuevo producto
                    </h1>
                </div>
                <div className='flex mx-4 items-center'>
                    <button className='bg-dark-blue text-white px-6 py-2 rounded-md' onClick={handleSubmmit}>
                        Añadir
                    </button>
                </div>
            </header>
            <section className="px-4 mx-4 py-6">
                <form onSubmit={handleSubmmit}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="md:col-span-3">
                            <div className="grid grid-cols-1 gap-4">
                                <Label htmlFor="name">
                                    Nombre del producto
                                    <div className="mt-2">
                                        <Input
                                            type="text"
                                            placeholder="Ej: COLGATE TRIPLE"
                                            value={nombreProducto}
                                            onChange={(e) => setNombreProducto(e.target.value)}
                                        />
                                    </div>
                                </Label>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <Label htmlFor="value">
                                    Valor Unitario
                                    <div className="mt-2">
                                        <Input
                                            placeholder="Ej: 3000"
                                            value={precioUnitario}
                                            onChange={(e) => setPrecioUnitario(e.target.value)}
                                        />
                                    </div>
                                </Label>
                                <Label htmlFor="product">
                                    Especificación del producto
                                    <div className="mt-2">
                                        <Input
                                            placeholder="Ej: 1800 ml, 1 litro, 1 unidad"
                                            value={detailProduct}
                                            onChange={(e) => setDtailProduct(e.target.value)}
                                        />
                                    </div>
                                </Label>
                            </div>
                            <div className="grid grid-cols-1 gap-4 mt-4">
                                <Label htmlFor="cantidad">
                                    Cantidad
                                    <div className="mt-2">
                                        <Input
                                            placeholder="Ej: 1"
                                            value={cantidadProduct}
                                            onChange={(e) => setCantidadProduct(e.target.value)}
                                        />
                                    </div>
                                </Label>
                                <Label htmlFor="description">
                                    Descripción del producto
                                    <div className="mt-2">
                                        <TextArea
                                            placeholder="Ej: ¡Sonríe con confianza! Colgate Total®"
                                            value={descriptionProduct}
                                            onChange={(e) => setDescriptionProduct(e.target?.value)}
                                        />
                                    </div>
                                </Label>
                                <Label htmlFor="imageUpload">
                                    Subir Imagen
                                    <ImageUploader />
                                </Label>
                            </div>
                        </div>
                        <div className="md:col-span-1 flex flex-col space-y-2">
                            <Label htmlFor="categoria1">
                                Seleccione una categoría
                                <div className="mt-2">
                                    <ComboBox
                                        name="categoria1"
                                        options={optionCategory}
                                        value={selectedCategory}
                                        onChange={handleCategoryChange}
                                    />
                                </div>
                            </Label>
                            <Label htmlFor="categoria2">
                                Seleccione una sub categoría
                                <div className="mt-2">
                                    <ComboBox
                                        name="categoria2"
                                        options={optionSubcategorie}
                                        value={selectedSubCategory}
                                        onChange={handleSubCategoryChange}
                                        disabled={!filteredSubCategories.length}
                                    />
                                </div>
                            </Label>
                            <Label htmlFor="categoria3">
                                Seleccione una bodega
                                <div className="mt-2">
                                    <ComboBox
                                        name="categoria3"
                                        options={optionBodega}
                                        value={selectedBodega}
                                        onChange={handleBodegaChange}
                                    />
                                </div>
                            </Label>
                        </div>
                    </div>
                </form>
            </section>
            <ToastContainer />
        </>
    )
}

export default CreateProductPage
