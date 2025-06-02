const axios = require('axios');

async function testGetCartById() {
  try {
    const cartId = '<CART_ID_AQUI>';
    const response = await axios.get(
      `http://localhost:5000/api/carts/${cartId}`,
      {
        headers: {
          Authorization: 'Bearer <TOKEN_ADMIN_AQUI>'
        }
      }
    );
    console.log('Carrito obtenido:', response.data);
  } catch (err) {
    if (err.response) {
      console.log('Error al obtener carrito:', err.response.data);
    } else {
      console.log('Error:', err.message);
    }
  }
}

testGetCartById();