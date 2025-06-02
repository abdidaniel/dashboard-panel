import { useEffect, useState } from "react";
import axios from "axios";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [rolSeleccionado, setRolSeleccionado] = useState("Todos");
  const [busqueda, setBusqueda] = useState(""); // Estado para la búsqueda
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [mensaje, setMensaje] = useState(""); // Estado para el mensaje de éxito o error
  const [mostrarModalMensaje, setMostrarModalMensaje] = useState(false); // Modal para mostrar mensaje

  const API_BASE = "http://localhost:5000/api";
  const token = localStorage.getItem("token");

  // Obtener usuarios
  useEffect(() => {
    axios
      .get(`${API_BASE}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsuarios(res.data);
        setUsuariosFiltrados(res.data);
      });
  }, [token]);

  // Filtrar usuarios por rol
  const filtrarPorRol = (rol) => {
    setRolSeleccionado(rol);
    const usuariosFiltradosPorRol =
      rol === "Todos" ? usuarios : usuarios.filter((u) => u.role === rol);
    setUsuariosFiltrados(
      usuariosFiltradosPorRol.filter((u) =>
        u.name.firstname.toLowerCase().includes(busqueda.toLowerCase()) ||
        u.name.lastname.toLowerCase().includes(busqueda.toLowerCase()) ||
        u.email.toLowerCase().includes(busqueda.toLowerCase())
      )
    );
  };

  // Manejar búsqueda
  const manejarBusqueda = (e) => {
    const texto = e.target.value;
    setBusqueda(texto);
    const usuariosFiltradosPorRol =
      rolSeleccionado === "Todos"
        ? usuarios
        : usuarios.filter((u) => u.role === rolSeleccionado);
    setUsuariosFiltrados(
      usuariosFiltradosPorRol.filter((u) =>
        u.name.firstname.toLowerCase().includes(texto.toLowerCase()) ||
        u.name.lastname.toLowerCase().includes(texto.toLowerCase()) ||
        u.email.toLowerCase().includes(texto.toLowerCase())
      )
    );
  };

  // Guardar cambios del usuario
  const guardarCambiosUsuario = () => {
    axios
      .put(
        `${API_BASE}/users/${usuarioSeleccionado._id}`,
        usuarioSeleccionado,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setMensaje("Se ha actualizado la información del usuario correctamente.");
        setMostrarModalMensaje(true);
        setMostrarModalEditar(false);
        actualizarUsuarios();
      })
      .catch((err) => {
        setMensaje("Error al actualizar la información del usuario.");
        setMostrarModalMensaje(true);
        console.error(err);
      });
  };

  // Eliminar usuario
  const eliminarUsuario = () => {
    axios
      .delete(`${API_BASE}/users/${usuarioSeleccionado._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setMensaje("Usuario eliminado correctamente.");
        setMostrarModalMensaje(true);
        setMostrarModalEliminar(false);
        actualizarUsuarios();
      })
      .catch((err) => {
        setMensaje("Error al eliminar el usuario.");
        setMostrarModalMensaje(true);
        console.error(err);
      });
  };

  // Actualizar lista de usuarios
  const actualizarUsuarios = () => {
    axios
      .get(`${API_BASE}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsuarios(res.data);
        setUsuariosFiltrados(res.data);
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Usuarios</h1>

      {/* Búsqueda */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Buscar Usuario:</label>
        <input
          type="text"
          value={busqueda}
          onChange={manejarBusqueda}
          placeholder="Buscar por nombre, apellido o correo"
          className="p-2 border rounded-md w-full"
        />
      </div>

      {/* Filtros */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Filtrar por Rol:</label>
        <select
          value={rolSeleccionado}
          onChange={(e) => filtrarPorRol(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="Todos">Todos</option>
          <option value="admin">Admin</option>
          <option value="user">Usuario</option>
        </select>
      </div>

      {/* Tabla de usuarios */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-bold mb-4">Lista de Usuarios</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Correo</th>
              <th className="px-4 py-2">Rol</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((usuario) => (
              <tr key={usuario._id}>
                <td className="border px-4 py-2">
                  {usuario.name.firstname} {usuario.name.lastname}
                </td>
                <td className="border px-4 py-2">{usuario.email}</td>
                <td className="border px-4 py-2">{usuario.role}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => {
                      setUsuarioSeleccionado(usuario);
                      setMostrarModalEditar(true);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      setUsuarioSeleccionado(usuario);
                      setMostrarModalEliminar(true);
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para editar usuario */}
      {mostrarModalEditar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Nombre</label>
              <input
                type="text"
                value={usuarioSeleccionado.name.firstname}
                onChange={(e) =>
                  setUsuarioSeleccionado({
                    ...usuarioSeleccionado,
                    name: { ...usuarioSeleccionado.name, firstname: e.target.value },
                  })
                }
                className="p-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Apellido</label>
              <input
                type="text"
                value={usuarioSeleccionado.name.lastname}
                onChange={(e) =>
                  setUsuarioSeleccionado({
                    ...usuarioSeleccionado,
                    name: { ...usuarioSeleccionado.name, lastname: e.target.value },
                  })
                }
                className="p-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Correo</label>
              <input
                type="email"
                value={usuarioSeleccionado.email}
                onChange={(e) =>
                  setUsuarioSeleccionado({ ...usuarioSeleccionado, email: e.target.value })
                }
                className="p-2 border rounded-md w-full"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setMostrarModalEditar(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={guardarCambiosUsuario}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para eliminar usuario */}
      {mostrarModalEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Eliminar Usuario</h2>
            <p>¿Estás seguro de que deseas eliminar este usuario?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setMostrarModalEliminar(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={eliminarUsuario}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para mostrar mensaje */}
      {mostrarModalMensaje && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Mensaje</h2>
            <p>{mensaje}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setMostrarModalMensaje(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Usuarios;