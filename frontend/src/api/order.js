import axios from "axios";
import { API_BASE_URL, getHeaders } from "./constant";

export const createOrder = async (data) => {

  console.log("API_BASE_URL:", API_BASE_URL);
  console.log("Payload:", data);
  console.log("Headers:", getHeaders());

  const response = await axios.post(
    `${API_BASE_URL}/api/order`,
    data,
    {
      headers: getHeaders()
    }
  );

  return response.data;
};