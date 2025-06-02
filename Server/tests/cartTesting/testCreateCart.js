const axios = require('axios');

async function testCreateCart() {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/carts',
      {
        userId: '<USER_ID_AQUI>',
        products: [
          { productId: '<PRODUCT_ID_AQUI>', quantity: 2 }
        ],
        date: new Date()
      },
      {
        headers: {
          Authorization: 'Bearer <TOKEN_USER_AQUI>'
        }
      }
    );
    console.log('Carrito creado:', response.data);
  } catch (err) {
    if (err.response) {
      console.log('Error al crear carrito:', err.response.data);
    } else {
      console.log('Error:', err.message);
    }
  }
}

testCreateCart();