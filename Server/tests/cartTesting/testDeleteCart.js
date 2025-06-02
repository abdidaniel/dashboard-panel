const axios = require('axios');

async function testDeleteCart() {
  try {
    const cartId = '<CART_ID_AQUI>';
    const response = await axios.delete(
      `http://localhost:5000/api/carts/${cartId}`,
      {
        headers: {
          Authorization: 'Bearer <TOKEN_ADMIN_AQUI>'
        }
      }
    );
    console.log('Carrito eliminado:', response.data);
  } catch (err) {
    if (err.response) {
      console.log('Error al eliminar carrito:', err.response.data);
    } else {
      console.log('Error:', err.message);
    }
  }
}

testDeleteCart();