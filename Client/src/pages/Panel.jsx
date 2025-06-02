import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

function Panel({ user }) {
  return (
    <div className="flex">
      {/* Barra de navegación fija */}
      <Sidebar user={user} />

      {/* Contenido principal */}
      <div className="flex-1 ml-60 p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}

export default Panel;