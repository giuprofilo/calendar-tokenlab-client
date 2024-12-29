import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    telefone: "",
    password: "",
  });

  // controll input
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  //funcao p enviar dados do form de cadastro de usuario
  async function handleSubmit(e) {
    e.preventDefault(); // Evita o reload da página
    console.log("Botão de cadastrar foi clicado");

    try {
      await axios.post("http://localhost:4000/user/signup", form);

      navigate("/login");
    } catch (error) {
      // Tratar erros
      alert("Erro ao cadastrar usuário");
      console.log(error);

      // console.error("Erro ao tentar cadastrar: ", error);
    }
  }
  console.log(form);

  return (
    <div>
      <h1>Signup Page</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome Completo</label>

          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

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
          <label>Telefone</label>

          <input
            name="telefone"
            type="tel"
            value={form.telefone}
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

        <button>CADASTRE-SE</button>
      </form>
    </div>
  );
}
