// Simula ventas para los últimos 12 meses, por producto y categoría

// Puedes personalizar los productos/categorías según los de fakestoreapi
const categorias = ['electronics', 'jewelery', "men's clothing", "women's clothing"];
const productos = [
  { id: 1, name: 'Producto 1', category: 'electronics', price: 200 },
  { id: 2, name: 'Producto 2', category: 'jewelery', price: 150 },
  { id: 3, name: 'Producto 3', category: "men's clothing", price: 80 },
  { id: 4, name: 'Producto 4', category: "women's clothing", price: 120 },
  // ...agrega más si quieres
];

export function simularVentas() {
  const now = new Date();
  const meses = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const mes = d.toISOString().slice(0, 7);
    meses.push(mes);
  }

  // Simula ventas por mes
  const ventas = [];
  meses.forEach(mes => {
    // Simula entre 5 y 20 ventas por mes
    const ventasMes = Math.floor(Math.random() * 16) + 5;
    for (let i = 0; i < ventasMes; i++) {
      // Elige producto aleatorio
      const producto = productos[Math.floor(Math.random() * productos.length)];
      // Simula cantidad
      const cantidad = Math.floor(Math.random() * 5) + 1;
      ventas.push({
        mes,
        productoId: producto.id,
        categoria: producto.category,
        precio: producto.price,
        cantidad,
        total: producto.price * cantidad,
      });
    }
  });

  return { ventas, productos, categorias, meses };
}