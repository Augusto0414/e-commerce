import React, { useState } from 'react'
import { ComboBox, ImageUploader, Input, Label, TextArea } from '../../components/index'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react';


const CreateProductPage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('');

    const handleComboBoxChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];
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
                    <button className='bg-dark-blue text-white px-6 py-2 rounded-md'>
                        Añadir
                    </button>
                </div>
            </header>
            <section className="px-4 mx-4 py-6">
                <form action="">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="md:col-span-3">
                            <div className="grid grid-cols-1 gap-4">
                                <Label htmlFor="name">
                                    Nombre del producto
                                    <div className="mt-2">
                                        <Input type="text" placeholder="Ej: COLGATE TRIPLE" />
                                    </div>
                                </Label>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <Label htmlFor="value">
                                    Valor Unitario
                                    <div className="mt-2">
                                        <Input placeholder="Ej: 3000" />
                                    </div>
                                </Label>
                                <Label htmlFor="product">
                                    Especificación del producto
                                    <div className="mt-2">
                                        <Input placeholder="Ej: 1800 ml, 1 litro, 1 unidad" />
                                    </div>
                                </Label>
                            </div>
                            <div className="grid grid-cols-1 gap-4 mt-4">
                                <Label htmlFor="cantidad">
                                    Cantidad
                                    <div className="mt-2">
                                        <Input placeholder="Ej: 1" />
                                    </div>
                                </Label>
                                <Label htmlFor="description">
                                    Descripción del producto
                                    <div className="mt-2">
                                        <TextArea placeholder="Ej: ¡Sonríe con confianza! Colgate Total®" />
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
                                        options={options}
                                        value={selectedOption}
                                        onChange={handleComboBoxChange}
                                    />
                                </div>
                            </Label>
                            <Label htmlFor="categoria2">
                                Seleccione una sub categoría
                                <div className="mt-2">
                                    <ComboBox
                                        name="categoria2"
                                        options={options}
                                        value={selectedOption}
                                        onChange={handleComboBoxChange}
                                    />
                                </div>
                            </Label>
                            <Label htmlFor="categoria3">
                                Seleccione una bodega
                                <div className="mt-2">
                                    <ComboBox
                                        name="categoria3"
                                        options={options}
                                        value={selectedOption}
                                        onChange={handleComboBoxChange}
                                    />
                                </div>
                            </Label>
                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}

export default CreateProductPage
