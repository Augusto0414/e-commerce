import axios from "axios";
import { getEnvVariables } from "../helper";
const { VITE_API_URL } = getEnvVariables();
const categoriesApi = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default categoriesApi;
