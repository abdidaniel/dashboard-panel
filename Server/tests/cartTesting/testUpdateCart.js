const axios = require('axios');

async function testUpdateCart() {
  try {
    const cartId = '<CART_ID_AQUI>';
    const response = await axios.put(
      `http://localhost:5000/api/carts/${cartId}`,
      {
        products: [
          { productId: '<PRODUCT_ID_AQUI>', quantity: 5 }
        ]
      },
      {
        headers: {
          Authorization: 'Bearer <TOKEN_ADMIN_AQUI>'
        }
      }
    );
    console.log('Carrito actualizado:', response.data);
  } catch (err) {
    if (err.response) {
      console.log('Error al actualizar carrito:', err.response.data);
    } else {
      console.log('Error:', err.message);
    }
  }
}

testUpdateCart();