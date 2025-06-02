import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import axios from 'axios';

function Pedidos() {
  const [pedidosPendientes, setPedidosPendientes] = useState([]);
  const [totalPendientes, setTotalPendientes] = useState(0);
  const [totalCompletados, setTotalCompletados] = useState(0);
  const [pedidosPorEstado, setPedidosPorEstado] = useState([]);
  const [tendenciaPedidos, setTendenciaPedidos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

  const API_BASE = 'http://localhost:5000/api';
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    // Obtener pedidos
    axios
      .get(`${API_BASE}/carts`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const pedidos = res.data;
        const pendientes = pedidos.filter((p) => p.estado === 'pendiente');
        const completados = pedidos.filter((p) => p.estado === 'completado');

        setPedidosPendientes(pendientes);
        setTotalPendientes(pendientes.length);
        setTotalCompletados(completados.length);

        // Pedidos por estado
        const estados = {};
        pedidos.forEach((p) => {
          estados[p.estado] = (estados[p.estado] || 0) + 1;
        });
        setPedidosPorEstado(
          Object.entries(estados).map(([name, value]) => ({ name, value }))
        );

        // Tendencia de pedidos
        const meses = [];
        const now = new Date();
        for (let i = 11; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const mes = d.toISOString().slice(0, 7);
          meses.push(mes);
        }
        const tendencia = meses.map((mes) => ({
          mes,
          pedidos: pedidos.filter((p) => p.date.slice(0, 7) === mes).length,
        }));
        setTendenciaPedidos(tendencia);
      })
      .catch((err) => {
        console.error('Error al obtener los pedidos:', err);
      });
  }, [token]);

  const completarPedido = (id) => {
    axios
      .put(
        `${API_BASE}/carts/${id}/estado`,
        { estado: 'completado' },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        // Actualizar la lista de pedidos después de completar uno
        setPedidosPendientes((prev) => prev.filter((pedido) => pedido._id !== id));
        setTotalPendientes((prev) => prev - 1);
        setTotalCompletados((prev) => prev + 1);
        setModalVisible(false); // Cerrar el modal
      })
      .catch((err) => {
        console.error('Error al completar el pedido:', err);
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Pedidos</h1>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h2 className="text-lg font-semibold">Pedidos Pendientes</h2>
          <p className="text-2xl font-bold text-yellow-500">{totalPendientes}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h2 className="text-lg font-semibold">Pedidos Completados</h2>
          <p className="text-2xl font-bold text-green-500">{totalCompletados}</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-3 gap-6">
        {/* Gráfico circular (Pedidos por Estado) */}
        <div className="col-span-1 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Pedidos por Estado</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pedidosPorEstado}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#82ca9d"
                label
              >
                {pedidosPorEstado.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de barras (Tendencia de Pedidos) */}
        <div className="col-span-2 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Tendencia de Pedidos</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tendenciaPedidos}>
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="pedidos" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabla de pedidos pendientes */}
      <div className="bg-white shadow-md rounded-lg p-4 mt-8">
        <h2 className="text-xl font-bold mb-4">Pedidos Pendientes</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Cliente</th>
              <th className="px-4 py-2">Productos</th>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidosPendientes.map((pedido) => (
              <tr key={pedido._id}>
                <td className="border px-4 py-2">{pedido.userId?.username || 'Desconocido'}</td>
                <td className="border px-4 py-2">
                  {pedido.products
                    .map((p) => `${p.productId?.title || 'Producto desconocido'} x${p.quantity}`)
                    .join(', ')}
                </td>
                <td className="border px-4 py-2">
                  {new Date(pedido.date).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  ${pedido.products.reduce((acc, p) => acc + (p.productId?.price || 0) * p.quantity, 0)}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => {
                      setPedidoSeleccionado(pedido);
                      setModalVisible(true);
                    }}
                    className="bg-green-500 text-white px-2 py-1 rounded-md"
                  >
                    Completar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmación */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirmación</h2>
            <p>¿Seguro que quiere completar este pedido?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setModalVisible(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={() => completarPedido(pedidoSeleccionado._id)}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pedidos;