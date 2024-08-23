import api from "./adminApi";
import axios from "axios";

export interface CategoriesData {
  id?: number;
  nombre: string;
}

export const createCategorie = async (data: CategoriesData) => {
  try {
    const response = await api.post("/categories", data);
    return response.data;
  } catch (error) {
    handleError(error, "Error al crear la categoría");
  }
};

export const getAllCategories = async (): Promise<CategoriesData[]> => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    handleError(error, "Error al obtener las categorías");
  }
  return [];
};
export const filterCategories = async (filter: string): Promise<CategoriesData[]> => {
  try {
    const response = await api.get("/categorias/search", { params: { filter } });
    return response.data;
  } catch (error) {
    handleError(error, "Error al filtrar las categorías");
  }
  return [];
};

export const updateCategorie = async (id: number, data: CategoriesData) => {
  try {
    const response = await api.put(`/categories/${id}`, data);
    return response.data;
  } catch (error) {
    handleError(error, "Error al actualizar la categoría");
  }
};

export const deleteCategorie = async (id: number) => {
  try {
    await api.delete(`/categories/${id}`);
  } catch (error) {
    handleError(error, "Error al eliminar la categoría");
  }
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
