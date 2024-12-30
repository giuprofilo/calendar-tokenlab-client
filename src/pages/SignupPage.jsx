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
      <div className="flex min-h-full justify-center items-center bg-gray-100">
        <div className="sm:w-full sm:max-w-sm bg-white p-8 rounded-lg shadow">
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 text-gray-900">
            Cadastre-se na sua conta
          </h2>

          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nome Completo
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="telefone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Telefone
              </label>
              <div className="mt-2">
                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  required
                  value={form.telefone}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Senha
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                CADASTRE-SE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  //   <div>
  //     <h1>Signup Page</h1>

  //     <form onSubmit={handleSubmit}>
  //       <div>
  //         <label>Nome Completo</label>

  //         <input
  //           name="name"
  //           type="text"
  //           value={form.name}
  //           onChange={handleChange}
  //           required
  //         />
  //       </div>

  //       <div>
  //         <label>Email</label>

  //         <input
  //           name="email"
  //           type="email"
  //           autoComplete="email"
  //           value={form.email}
  //           onChange={handleChange}
  //           required
  //         />
  //       </div>

  //       <div>
  //         <label>Telefone</label>

  //         <input
  //           name="telefone"
  //           type="tel"
  //           value={form.telefone}
  //           onChange={handleChange}
  //           required
  //         />
  //       </div>

  //       <div>
  //         <label>Senha</label>

  //         <input
  //           name="password"
  //           type="password"
  //           value={form.password}
  //           onChange={handleChange}
  //           required
  //         />
  //       </div>

  //       <button>CADASTRE-SE</button>
  //     </form>
  //   </div>
  // );
}
