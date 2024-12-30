import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectRoute({ Component }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    if (!token) {
      //se o token nao existir, redireciona para o login
      navigate("/login");
    }
  }, [navigate, token]);

  return <Component />;
}
