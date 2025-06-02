import { useState } from "react";
import axios from "axios";

function Perfil({ user }) {
  const [perfil, setPerfil] = useState(user);
  const [mostrarModalConfirmacion, setMostrarModalConfirmacion] = useState(false);
  const [mensaje, setMensaje] = useState(""); // Estado para el mensaje de éxito o error
  const [mostrarModalMensaje, setMostrarModalMensaje] = useState(false); // Modal para mostrar mensaje
  const [nuevaContrasena, setNuevaContrasena] = useState(""); // Estado para la nueva contraseña

  const API_BASE = "http://localhost:5000/api";
  const token = localStorage.getItem("token");

  // Guardar cambios en el perfil
  const guardarCambios = () => {
    axios
      .put(
        `${API_BASE}/users/${user._id}`,
        perfil,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setMensaje("Se ha cambiado los datos correctamente.");
        setMostrarModalMensaje(true); // Mostrar modal de mensaje
      })
      .catch((err) => {
        setMensaje("Error al actualizar los datos. Inténtalo de nuevo.");
        setMostrarModalMensaje(true); // Mostrar modal de mensaje
        console.error("Error al actualizar el perfil:", err);
      });
    setMostrarModalConfirmacion(false); // Cerrar modal de confirmación
  };

  // Cambiar contraseña
  const cambiarContrasena = () => {
    if (!nuevaContrasena) {
      setMensaje("Por favor, ingresa una nueva contraseña.");
      setMostrarModalMensaje(true);
      return;
    }

    axios
      .put(
        `${API_BASE}/users/${user._id}/password`,
        { password: nuevaContrasena },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setMensaje("La contraseña se ha cambiado correctamente.");
        setMostrarModalMensaje(true); // Mostrar modal de mensaje
        setNuevaContrasena(""); // Limpiar el campo de la nueva contraseña
      })
      .catch((err) => {
        setMensaje("Error al cambiar la contraseña. Inténtalo de nuevo.");
        setMostrarModalMensaje(true); // Mostrar modal de mensaje
        console.error("Error al cambiar la contraseña:", err);
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Perfil</h1>

      {/* Formulario de perfil */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-bold mb-4">Información Personal</h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Nombre</label>
          <input
            type="text"
            value={perfil.name.firstname}
            onChange={(e) =>
              setPerfil({ ...perfil, name: { ...perfil.name, firstname: e.target.value } })
            }
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Apellido</label>
          <input
            type="text"
            value={perfil.name.lastname}
            onChange={(e) =>
              setPerfil({ ...perfil, name: { ...perfil.name, lastname: e.target.value } })
            }
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Correo Electrónico</label>
          <input
            type="email"
            value={perfil.email}
            onChange={(e) => setPerfil({ ...perfil, email: e.target.value })}
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Teléfono</label>
          <input
            type="text"
            value={perfil.phone || ""}
            onChange={(e) => setPerfil({ ...perfil, phone: e.target.value })}
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Dirección</label>
          <input
            type="text"
            value={perfil.address || ""}
            onChange={(e) => setPerfil({ ...perfil, address: e.target.value })}
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => setMostrarModalConfirmacion(true)} // Mostrar modal de confirmación
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Guardar
          </button>
        </div>
      </div>

      {/* Cambiar contraseña */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-bold mb-4">Cambiar Contraseña</h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Nueva Contraseña</label>
          <input
            type="password"
            value={nuevaContrasena}
            onChange={(e) => setNuevaContrasena(e.target.value)}
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={cambiarContrasena} // Cambiar contraseña
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Cambiar Contraseña
          </button>
        </div>
      </div>

      {/* Modal de confirmación */}
      {mostrarModalConfirmacion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirmación</h2>
            <p>¿Seguro que quieres guardar los cambios?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setMostrarModalConfirmacion(false)} // Cerrar modal
                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={guardarCambios} // Guardar cambios
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Confirmar
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
                onClick={() => setMostrarModalMensaje(false)} // Cerrar modal
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

export default Perfil;