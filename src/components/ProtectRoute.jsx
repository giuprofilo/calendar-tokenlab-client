import { useNavigate } from "react-router-dom";

export default function ProtectRoute({ Component }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  if (token) {
    //se o token existir ira mostrar o componente
    return <Component />;
  } else {
    //s nao, redireciona para o login
    navigate("/login");
  }
}
