import api from "./adminApi";
import axios from "axios";

export interface BodegaData {
  id: string;
  nombre: string;
  ubicaion: string;
  capacidad: string;
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

const handleError = (error: any, defaultMessage: string) => {
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data?.message || defaultMessage;
    console.error(`Error: ${errorMessage}`);
    throw new Error(errorMessage);
  } else {
    console.error("Error desconocido", error);
    throw new Error("Ocurrió un error inesperado.");
  }
};
