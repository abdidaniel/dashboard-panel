import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

function Dashboard() {
  const [totalProductos, setTotalProductos] = useState(0);
  const [totalCategorias, setTotalCategorias] = useState(0);
  const [totalVentas, setTotalVentas] = useState(0);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [ingresosTotales, setIngresosTotales] = useState(0);
  const [ventasPorCategoria, setVentasPorCategoria] = useState([]);
  const [productosPorCategoria, setProductosPorCategoria] = useState([]);
  const [evolucionVentas, setEvolucionVentas] = useState([]);

  const API_BASE = 'http://localhost:5000/api';
  const token = localStorage.getItem('token');

  // Productos y categorías
  useEffect(() => {
    axios.get(`${API_BASE}/products`)
      .then(res => {
        setTotalProductos(res.data.length);
        const counts = {};
        res.data.forEach(p => {
          counts[p.category] = (counts[p.category] || 0) + 1;
        });
        setProductosPorCategoria(
          Object.entries(counts).map(([name, value]) => ({ name, value }))
        );
        setTotalCategorias(Object.keys(counts).length);
      });
  }, []);

  // Usuarios (requiere token)
  useEffect(() => {
    if (!token) return;
    axios.get(`${API_BASE}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setTotalUsuarios(Array.isArray(res.data) ? res.data.length : res.data.data.length);
      })
      .catch(() => {
        setTotalUsuarios(0);
      });
  }, [token]);

  // Ventas, ingresos, ventas por categoría y evolución de ventas (requiere token)
  useEffect(() => {
    if (!token) return;
    axios.get(`${API_BASE}/carts`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const orders = Array.isArray(res.data) ? res.data : res.data.data;

        // Filtrar solo los pedidos completados
        const completedOrders = orders.filter(order => order.estado === 'completado');
        setTotalVentas(completedOrders.length);

        let total = 0;
        const ventasCat = {};
        const ventasMes = {};

        completedOrders.forEach(order => {
          if (order.products) {
            order.products.forEach(p => {
              const price = p.productId?.price || 0;
              const quantity = p.quantity || 0;
              total += price * quantity;

              const category = p.productId?.category;
              if (category) {
                ventasCat[category] = (ventasCat[category] || 0) + quantity;
              }
            });
          }

          if (order.date) {
            const mes = order.date.slice(0, 7);
            if (!ventasMes[mes]) ventasMes[mes] = 0;
            if (order.products) {
              order.products.forEach(p => {
                const price = p.productId?.price || 0;
                const quantity = p.quantity || 0;
                ventasMes[mes] += price * quantity;
              });
            }
          }
        });

        setIngresosTotales(total);

        setVentasPorCategoria(
          Object.entries(ventasCat).map(([name, ventas]) => ({
            name,
            ventas
          }))
        );

        const meses = [];
        const now = new Date();
        for (let i = 11; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const mes = d.toISOString().slice(0, 7);
          meses.push(mes);
        }
        const data = meses.map(mes => ({
          mes,
          ventas: ventasMes[mes] || 0
        }));
        setEvolucionVentas(data);
      })
      .catch(() => {
        setTotalVentas(0);
        setIngresosTotales(0);
        setVentasPorCategoria([]);
        setEvolucionVentas([]);
      });
  }, [token]);

return (
  <div className="p-6 w-full px-4">
    <h1 className="text-2xl font-bold mb-6">Resumen General (Overview)</h1>

    {/* Tarjetas */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-white shadow-md rounded-lg p-4 text-center">
        <h2 className="text-lg font-semibold">Total de Productos</h2>
        <p className="text-2xl font-bold text-blue-500">{totalProductos}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 text-center">
        <h2 className="text-lg font-semibold">Total de Categorías</h2>
        <p className="text-2xl font-bold text-green-500">{totalCategorias}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 text-center">
        <h2 className="text-lg font-semibold">Ventas Totales</h2>
        <p className="text-2xl font-bold text-yellow-500">{totalVentas}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 text-center">
        <h2 className="text-lg font-semibold">Usuarios Registrados</h2>
        <p className="text-2xl font-bold text-purple-500">{totalUsuarios}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 text-center">
        <h2 className="text-lg font-semibold">Ingresos Totales</h2>
        <p className="text-2xl font-bold text-red-500">${Math.round(ingresosTotales)}</p>
      </div>
    </div>

    {/* Gráficos */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      <div className="bg-white shadow-md rounded-lg p-4 w-full">
        <h2 className="text-xl font-bold mb-4">Ventas por Categoría</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ventasPorCategoria}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="ventas" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 w-full">
        <h2 className="text-xl font-bold mb-4">Evolución de Ingresos</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={evolucionVentas}>
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="ventas" fill="#FF8042" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 w-full">
        <h2 className="text-xl font-bold mb-4">Productos por Categoría</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={productosPorCategoria}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#82ca9d"
              label
            >
              {productosPorCategoria.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);
}

export default Dashboard;