import React, { useCallback, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBodega, getAllBodegas, filterBodegas, updateBodega, deleteBodega } from "../../api/index";
import { Input, Label, ShowDialog } from '../../components';
import { Plus } from 'lucide-react';
import BodegaCard from '../../components/card/BodegaCard';
import { BodegaData } from '../../api/bodega';

const BodegaPage: React.FC = () => {
    const [dataT, setData] = useState<BodegaData[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [nameBodega, setnameBodega] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [filter, setFilter] = useState<string>('');
    const [editBodegaId, setEditBodegaId] = useState<string | null>(null);

    const fetchBodegas = useCallback(
        async () => {
            const bodegas = filter ? await filterBodegas(filter) : await getAllBodegas();
            setData(bodegas);
        },
        [filter]
    )
    useEffect(() => {
        fetchBodegas();
    }, [fetchBodegas])

    const handleToggle = () => {
        setIsOpen(!isOpen);
        if (editBodegaId !== null) {
            setEditBodegaId(null);
            setnameBodega('');
            setLocation('');
            setAmount('');
        }
    };

    const handleEdit = (id: string) => {
        const bodega = dataT.find((item) => item.id === id);
        if (bodega) {
            setnameBodega(bodega.nombre);
            setLocation(bodega.ubicacion);
            setAmount(bodega.capacidad);
            setEditBodegaId(id);
            handleToggle();
        }
    };

    const handleDelete = async (id: any) => {
        const bodegaId = dataT.find((item) => item.id === id);
        if (bodegaId) {
            await deleteBodega(bodegaId.id!);
            setData((prevData) => prevData.filter((item) => item.id !== id));
            toast.success('Bodega eliminada correctamente');
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (editBodegaId) {
                await updateBodega(editBodegaId, {
                    nombre: nameBodega, ubicacion: location, capacidad: amount,
                });
                setEditBodegaId(null);
                setnameBodega('');
                setLocation('');
                setAmount('');
                setData(dataT.map((item) => item.id === editBodegaId ? { ...item, nombre: nameBodega, ubicacion: location, capacidad: amount } : item));
                toast.success('Bodega actualizada correctamente');
            } else {
                const newBodega = await createBodega({
                    nombre: nameBodega, ubicacion: location, capacidad: amount,
                });
                setData([...dataT, newBodega]);
                toast.success('Bodega creada correctamente');
                setnameBodega('');
                setLocation('');
                setAmount('');
            }
        } catch (error) {
            toast.error('Error al agregar la bodega');
        }
    }
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.value);

    return (
        <>
            <header className='flex flex-col sm:flex-row justify-between items-center px-4 py-2 bg-white'>
                <h1 className='text-dark-blue text-2xl mb-2 sm:mb-0'>Bodegas</h1>
                <div className='flex items-center space-x-2 w-full sm:w-auto'>
                    <Input value={filter} onChange={handleFilterChange} type='search' placeholder='Buscar subcategoría...' />
                    <button onClick={handleToggle} className='flex items-center bg-dark-blue px-4 py-3 text-white rounded-lg'>
                        <Plus className="mr-2" size={16} />
                        Añadir
                    </button>
                </div>
            </header>
            <section className='w-full px-2 grid grid-cols-1 sm:flex sm:flex-wrap md:grid md:grid-cols-3 lg:grid-cols-3 gap-4'>
                {dataT.map((bodega, index) => (
                    <BodegaCard
                        key={bodega.id || index}
                        id={bodega.id!}
                        nombre={bodega.nombre}
                        ubicacion={bodega.ubicacion}
                        capacidad={bodega.capacidad}
                        fechaCreacion={bodega.fechaCreacion!}
                        fechaModificacion={bodega.fechaModificacion!}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </section>
            <ShowDialog isOpen={isOpen} onClose={
                () => {
                    handleToggle();
                    setEditBodegaId(null);
                }
            } title={editBodegaId !== null ? 'Editar Bodega' : 'Añadir Bodega'}>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col'>
                        <div className='p-2 space-y-3'>
                            <Label htmlFor="nombre" className="block">
                                Nombre de la bodega
                                <Input
                                    type='text'
                                    id='nombre'
                                    name='nombre'
                                    placeholder='Nombre de la Bodega'
                                    value={nameBodega}
                                    onChange={(e) => setnameBodega(e.target.value)}
                                    required
                                />
                            </Label>
                            <Label htmlFor="ubicacion" className="block">
                                Ubicación
                                <Input
                                    type='text'
                                    id='ubicacion'
                                    name='ubicacion'
                                    placeholder='Ubicación'
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    required
                                />
                            </Label>
                            <Label htmlFor="capacidad" className="block">
                                Capacidad
                                <Input
                                    type='text'
                                    id='capacidad'
                                    name='capacidad'
                                    placeholder='Capacidad'
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                            </Label>
                        </div>
                        <div className='p-2'>
                            <button type='submit' className='w-full bg-dark-blue px-2 py-4 text-white rounded-lg'>
                                {editBodegaId !== null ? 'Editar' : 'Añadir'}
                            </button>
                        </div>
                    </div>
                </form>
            </ShowDialog>
            <ToastContainer />
        </>
    )
}

export default BodegaPage;
