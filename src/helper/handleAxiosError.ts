import axios from "axios";

export const handleError = (error: any, defaultMessage: string) => {
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data?.message || defaultMessage;
    console.error(`Error: ${errorMessage}`);
    throw new Error(errorMessage);
  } else {
    console.error("Error desconocido", error);
    throw new Error("Ocurrió un error inesperado.");
  }
};
