import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Sidebar({ user }) {
  const location = useLocation(); // Obtiene la ruta actual
  const navigate = useNavigate(); // Para redirigir al usuario
  const currentPath = location.pathname;

  const [menuAbierto, setMenuAbierto] = useState(false); // Estado para mostrar/ocultar el menú

  const fullName = user?.name
    ? `${user.name.firstname} ${user.name.lastname}`
    : "Admin Principal";

  const navItems = [
    { key: "dashboard", icon: "🏠", label: "Dashboard", path: "/panel" },
    { key: "pedidos", icon: "🛒", label: "Pedidos", path: "/panel/pedidos" },
    { key: "productos", icon: "📦", label: "Productos", path: "/panel/productos" },
    { key: "usuarios", icon: "👥", label: "Usuarios", path: "/panel/usuarios" },
    { key: "perfil", icon: "⚙️", label: "Perfil", path: "/panel/perfil" },
    { key: "logout", icon: "🚪", label: "Cerrar sesión", path: "/" },
  ];

  // Función para cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem("token"); // Eliminar el token del almacenamiento local
    navigate("/login"); // Redirigir al usuario a la página de inicio de sesión
  };

  return (
    <>
      {/* Botón de menú para pantallas pequeñas */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#22304a] text-white p-2 rounded-md"
        onClick={() => setMenuAbierto(!menuAbierto)}
      >
        {menuAbierto ? "✖" : "☰"}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-60 bg-[#22304a] min-h-screen flex flex-col items-center pt-8 z-40 transition-transform duration-300 ${
          menuAbierto ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-3 overflow-hidden">
            <img
              src="https://ui-avatars.com/api/?name=Admin+Principal"
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-white font-semibold text-lg">{fullName}</div>
          <div className="text-[#b0b8c1] text-sm">{user?.email || "admin@market.com"}</div>
        </div>
        <nav className="w-full">
          <ul className="flex flex-col gap-2">
            {navItems.map((item) =>
              item.key === "logout" ? (
                <li
                  key={item.key}
                  className={`flex items-center gap-3 px-8 py-3 text-white cursor-pointer rounded-l-full transition
                    hover:bg-[#1a2336]`}
                  onClick={cerrarSesion} // Llama a la función cerrarSesion
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-base">{item.label}</span>
                </li>
              ) : (
                <li
                  key={item.key}
                  className={`flex items-center gap-3 px-8 py-3 text-white cursor-pointer rounded-l-full transition
                    ${currentPath === item.path ? "bg-[#1a2336] font-bold" : "hover:bg-[#1a2336]"}`}
                >
                  <Link to={item.path} className="flex items-center gap-3 w-full">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-base">{item.label}</span>
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>

      {/* Fondo oscuro cuando el menú está abierto */}
      {menuAbierto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setMenuAbierto(false)}
        ></div>
      )}
    </>
  );
}

export default Sidebar;