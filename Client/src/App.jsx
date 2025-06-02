import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./Components/Login";
import Panel from "./pages/Panel";
import Dashboard from "./Components/Dashboard";
import Pedidos from "./Components/Pedidos";
import Productos from "./Components/Productos";
import Usuarios from "./Components/Usuarios";
import Perfil from "./Components/Perfil";
import Home from "./pages/Home";

function App() {
  const [user, setUser] = useState({
    name: { firstname: "Admin", lastname: "Principal" },
    email: "admin@market.com",
    role: "admin",
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login onLogin={(user) => setUser(user)} />} // Pasa la función onLogin
        />

        {/* Ruta para el panel principal */}
        <Route
          path="/panel"
          element={
            user?.role === "admin" ? (
              <Panel user={user} />
            ) : (
              <Navigate to="/profile" />
            )
          }
        >
          {/* Subrutas del panel */}
          <Route index element={<Dashboard />} />
          <Route path="pedidos" element={<Pedidos />} />
          <Route path="productos" element={<Productos />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="perfil" element={<Perfil user={user} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;