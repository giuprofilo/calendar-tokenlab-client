import axios from "axios";

//criando instancia do axios
const api = axios.create({
  baseURL: "http://localhost:4000",
});

// adicionando o interceptor de requisição para enviar o token no cabeçalho
api.interceptors.request.use(
  (config) => {
    //pegando o token armazenado no localStorage
    const token = localStorage.getItem("userToken");

    if (token) {
      // se o token existir, configura a requisicao p ter um token Bearer
      // e adiciona ao cabeçalho Authorization

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // manipular a falha  em caso de erro no interceptor
    return Promise.reject(error);
  }
);

export default api;
