import axios from "axios";

const API_URL = "https://run.mocky.io/v3/8670edab-0cfd-410d-85fd-bad669f464c9"; 

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Retorna os dados da API
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error; // Repassa o erro para ser tratado na aplicação
  }
};
