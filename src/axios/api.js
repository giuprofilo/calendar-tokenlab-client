import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

// Adicionando o interceptor de requisição para enviar o token no cabeçalho
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");

    if (token) {
      // Adiciona o token ao cabeçalho Authorization

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Em caso de erro no interceptor, você pode manipular a falha aqui
    return Promise.reject(error);
  }
);

export default api;
