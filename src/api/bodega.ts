import { handleError } from "../helper/handleAxiosError";
import api from "./adminApi";

export interface BodegaData {
  id?: string;
  nombre: string;
  ubicacion: string;
  capacidad: string;
  fechaCreacion?: string;
  fechaModificacion?: string;
}

export const createBodega = async (data: BodegaData) => {
  try {
    const response = await api.post("/bodegas", data);
    return response.data;
  } catch (error) {
    handleError(error, "Error al crear la bodega");
  }
};

export const getAllBodegas = async (): Promise<BodegaData[]> => {
  try {
    const response = await api.get("/bodegas");
    return response.data;
  } catch (error) {
    handleError(error, "Error al obtener las bodegas");
  }
  return [];
};

export const filterBodegas = async (filter: string): Promise<BodegaData[]> => {
  try {
    const response = await api.get("/bodegas/search", { params: { filter } });
    return response.data;
  } catch (error) {
    handleError(error, "Error al filtrar las bodegas");
  }
  return [];
};

export const updateBodega = async (id: string, data: BodegaData): Promise<void> => {
  try {
    const response = await api.put(`/bodegas/${id}`, data);
    return response.data;
  } catch (error) {
    handleError(error, "Error al actualizar la bodega");
  }
};

export const deleteBodega = async (id: string): Promise<void> => {
  try {
    await api.delete(`/bodegas/${id}`);
  } catch (error) {
    handleError(error, "Error al eliminar la bodega");
  }
};
