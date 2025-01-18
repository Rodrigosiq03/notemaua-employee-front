import axios from "axios";

export const httpAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const httpWithdraw = axios.create({
  baseURL: import.meta.env.	VITE_API_URL_WITHDRAW,
});
