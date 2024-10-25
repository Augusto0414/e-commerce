import api from "./adminApi";
import { handleError } from "../helper/handleAxiosError";
import { CategoriesData } from "./categoriesApi";

export interface SubCategoriesData extends CategoriesData {
  id?: string;
  nombre: string;
  descripcion?: string;
  categoriaId?: string;
  categoria?: CategoriesData;
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

export const updateSubcategorie = async (id: string, data: Partial<SubCategoriesData>) => {
  try {
    const response = await api.put(`/subcategories/${id}`, data);
    return response.data;
  } catch (error) {
    handleError(error, "Error al actualizar la categoría");
  }
};

export const deleteSubcategorie = async (id: string) => {
  try {
    await api.delete(`/subcategories/${id}`);
  } catch (error) {
    handleError(error, "Error al eliminar la categoría");
  }
};
