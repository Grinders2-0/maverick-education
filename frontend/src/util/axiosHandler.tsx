import axios from "axios";
import { BASE_URL } from "./environment";

export const instanceWithoutAuth = axios.create({
  baseURL: BASE_URL,
});
export const instanceWithAuth = axios.create({
  baseURL: BASE_URL,
});
