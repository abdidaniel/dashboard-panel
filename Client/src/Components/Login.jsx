import { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState(""); // Estado para el mensaje de bienvenida
  const [error, setError] = useState("");

  const API_BASE = "http://localhost:5000/api";

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post(`${API_BASE}/auth/login`, { email, password })
      .then((res) => {
        const user = res.data.user;
        const token = res.data.token;

        // Guardar el token en el almacenamiento local
        localStorage.setItem("token", token);

        // Actualizar el estado del usuario en la aplicación
        onLogin(user);

        // Verificar el rol del usuario
        if (user.role === "admin") {
          // Redirigir al panel si es administrador
          window.location.href = "/panel";
        } else {
          // Mostrar mensaje de bienvenida si no es administrador
          setMensaje(`Hola ${user.name.firstname}, bienvenido de vuelta`);
        }
      })
      .catch((err) => {
        setError("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
        console.error(err);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>

        {/* Mostrar mensaje de bienvenida */}
        {mensaje && (
          <div className="bg-green-100 text-green-700 p-4 rounded-md mb-4">
            {mensaje}
          </div>
        )}

        {/* Mostrar mensaje de error */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border rounded-md w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;