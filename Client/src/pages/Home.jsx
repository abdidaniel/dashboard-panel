import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);

  // Obtener productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products"); // Cambia la URL si es necesario
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barra de navegación */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-800">Marketplace</h1>
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Productos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.title}
                </h3>
                <p className="text-gray-600">{product.category}</p>
                <p className="text-gray-800 font-bold">${product.price}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;