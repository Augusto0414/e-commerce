import axios from "axios";
import api from "./adminApi";

export interface SubCategoriesData {
  id?: string;
  categoriaId?: string;
  nombre: string;
  categoriaNombre?: string;
  descripcion?: string;
}

export const createSubCategorie = async (data: SubCategoriesData) => {
  try {
    const response = await api.post("/subcategories", data);
    return response.data;
  } catch (error) {
    handleError(error, "Error al crear la categoría");
  }
};

export const getAllSubCategories = async (): Promise<SubCategoriesData[]> => {
  try {
    const response = await api.get("/subcategories");
    return response.data;
  } catch (error) {
    handleError(error, "Error al obtener las categorías");
  }
  return [];
};

export const filterSubCategories = async (filter: string): Promise<SubCategoriesData[]> => {
  try {
    const response = await api.get("/subcategories/search", { params: { filter } });
    return response.data;
  } catch (error) {
    handleError(error, "Error al filtrar las categorías");
  }
  return [];
};

export const deleteSubcategorie = async (id: string): Promise<any> => {
  try {
    const response = await api.delete(`/subcategories/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, "Error al eliminar la subcategoria");
  }
};

export const updateSubcategorie = async (id: string, data: SubCategoriesData): Promise<any> => {
  try {
    const response = await api.put(`/subcategories/${id}`, data);
    return response.data;
  } catch (error) {
    handleError(error, "Error al actualizar la subcategoría");
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
