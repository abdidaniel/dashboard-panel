import { useEffect, useState } from "react";
import axios from "axios";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const [topProductos, setTopProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    title: "",
    price: "",
    category: "",
  });

  const API_BASE = "http://localhost:5000/api";
  const token = localStorage.getItem("token");

  // Obtener productos, categorías y productos más vendidos
  useEffect(() => {
    axios.get(`${API_BASE}/products`).then((res) => {
      setProductos(res.data);
      setProductosFiltrados(res.data);
    });

    axios.get(`${API_BASE}/products/categories`).then((res) => {
      setCategorias(["Todas", ...res.data]);
    });

    axios
      .get(`${API_BASE}/products/stats/top-products`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTopProductos(res.data);
      });
  }, [token]);

  // Filtrar productos por categoría
  const filtrarPorCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
    if (categoria === "Todas") {
      setProductosFiltrados(productos);
    } else {
      setProductosFiltrados(productos.filter((p) => p.category === categoria));
    }
  };

  // Eliminar producto
  const eliminarProducto = () => {
    axios
      .delete(`${API_BASE}/products/${productoSeleccionado._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setProductos(productos.filter((p) => p._id !== productoSeleccionado._id));
        setProductosFiltrados(productosFiltrados.filter((p) => p._id !== productoSeleccionado._id));
        setMostrarModalEliminar(false);
      });
  };

  // Guardar cambios al editar un producto
  const guardarCambiosProducto = () => {
    axios
      .put(`${API_BASE}/products/${productoSeleccionado._id}`, productoSeleccionado, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setProductos(
          productos.map((p) =>
            p._id === productoSeleccionado._id ? productoSeleccionado : p
          )
        );
        setProductosFiltrados(
          productosFiltrados.map((p) =>
            p._id === productoSeleccionado._id ? productoSeleccionado : p
          )
        );
        setMostrarModalEditar(false);
      });
  };

  // Agregar un nuevo producto
  const agregarProducto = () => {
    axios
      .post(`${API_BASE}/products`, nuevoProducto, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProductos([...productos, res.data]);
        setProductosFiltrados([...productosFiltrados, res.data]);
        setMostrarModalAgregar(false);
        setNuevoProducto({ title: "", price: "", category: "" });
      });
  };

return (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-6">Productos</h1>

    {/* Top de productos más vendidos */}
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <h2 className="text-xl font-bold mb-4">Productos Más Vendidos</h2>
      <div className="flex flex-col lg:flex-row items-start lg:items-center">
        {/* Lista de productos más vendidos */}
        <ul className="flex-1">
          {topProductos.map((producto) => (
            <li key={producto._id} className="mb-2">
              {producto.title} - {producto.totalSold} ventas
            </li>
          ))}
        </ul>

        {/* Tarjeta del producto más vendido */}
        {topProductos.length > 0 && (
          <div className="flex-shrink-0 w-full lg:w-1/3 bg-white shadow-md rounded-lg p-4 mt-6 lg:mt-0 lg:ml-6">
            <img
              src={topProductos[0].image || "https://via.placeholder.com/150"} // Imagen predeterminada
              alt={topProductos[0].title || "Producto"}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              {topProductos[0].title || "Sin título"}
            </h3>
            <p className="text-gray-600">{topProductos[0].category || "Sin categoría"}</p>
            <p className="text-gray-800 font-bold">
              ${topProductos[0].price || "0.00"}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {topProductos[0].description || "Sin descripción"}
            </p>
          </div>
        )}
      </div>
    </div>

    {/* Filtros y botón para agregar producto */}
    <div className="mb-6 flex items-center justify-between">
      <div>
        <label className="block text-lg font-semibold mb-2">
          Filtrar por Categoría:
        </label>
        <select
          value={categoriaSeleccionada}
          onChange={(e) => filtrarPorCategoria(e.target.value)}
          className="p-2 border rounded-md"
        >
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={() => setMostrarModalAgregar(true)}
        className="bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Agregar Producto
      </button>
    </div>

    {/* Tabla de productos */}
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <h2 className="text-xl font-bold mb-4">Lista de Productos</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Precio</th>
            <th className="px-4 py-2">Categoría</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.map((producto) => (
            <tr key={producto._id}>
              <td className="border px-4 py-2">{producto.title}</td>
              <td className="border px-4 py-2">${producto.price}</td>
              <td className="border px-4 py-2">{producto.category}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => {
                    setProductoSeleccionado(producto);
                    setMostrarModalEditar(true);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => {
                    setProductoSeleccionado(producto);
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
  </div>
);
}

export default Productos;  