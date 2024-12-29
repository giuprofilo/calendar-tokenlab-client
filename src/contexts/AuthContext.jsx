import { useState, useEffect, createContext } from "react";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation(); // Obter a URL atual

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (token) {
      setIsLoggedIn(true); // Se o token existe, considera o usuário logado
    } else {
      setIsLoggedIn(false); // Caso contrário, o usuário não está logado
    }
  }, [location]); // Atualiza o estado quando a URL muda

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
