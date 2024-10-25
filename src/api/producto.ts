import api from "./adminApi";
import { CategoriesData } from "./categoriesApi";
import { SubCategoriesData } from "./subcategorieApi";
import { handleError } from "../helper/handleAxiosError";

export interface ProductoData {
  id?: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  categoria: CategoriesData;
  subcategoria?: SubCategoriesData;
  esActivo?: boolean;
  fechaCreacion?: Date;
  fechaModificacion?: Date;
}

export const createProducto = async (productData: ProductoData): Promise<void> => {
  try {
    const response = await api.post("/producto", productData);
    response.data;
  } catch (error) {
    handleError(error, "Error al crear un producto");
  }
};

export const getAllProducto = async (): Promise<ProductoData[] | undefined> => {
  try {
    const response = await api.get("/producto");
    return response.data;
  } catch (error) {
    handleError(error, "Error al intentar optener los productos || no hay productos para mostrar");
    return undefined;
  }
};

export const deleteProducto = async (id: string): Promise<void> => {
  try {
    const response = await api.delete(`/producto/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, "Eror al intentar eliminar este prodcuto");
  }
};

export const updateProducto = async (id: String, data: ProductoData) => {
  try {
    const response = await api.put(`/producto/${id}`, data);
    return response.data;
  } catch (error) {
    handleError(error, "Error al intentar actualizar el producto");
  }
};

export const filterProductos = async (filter: string): Promise<ProductoData[]> => {
  try {
    const response = await api.get("/prdocuto/search", { params: { filter } });
    return response.data;
  } catch (error) {
    handleError(error, "Error al filtrar las categorías");
  }
  return [];
};
