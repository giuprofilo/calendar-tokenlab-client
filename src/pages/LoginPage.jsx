import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // controll input
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault(); // Evita o reload da página
    console.log("Botão de cadastrar foi clicado");

    try {
      const response = await axios.post(
        "http://localhost:4000/user/login",
        form
      );

      //GUARDAR O TOKEN
      const token = response.data.token;

      localStorage.setItem("userToken", token);

      navigate("/calendar");
    } catch (error) {
      // Tratar erros
      alert("Erro ao fazer login");
      console.log(error);

      // console.error("Erro ao tentar cadastrar: ", error);
    }
  }

  return (
    <div>
      <h1>Login Page</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>

          <input
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Senha</label>

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button>Entrar</button>
      </form>
    </div>
  );
}

export default LoginPage;
