const axios = require('axios');

async function testGetCarts() {
  try {
    const response = await axios.get('http://localhost:5000/api/carts', {
      headers: {
        Authorization: 'Bearer <TOKEN_ADMIN_AQUI>'
      }
    });
    console.log('Carritos obtenidos:', response.data);
  } catch (err) {
    if (err.response) {
      console.log('Error al obtener carritos:', err.response.data);
    } else {
      console.log('Error:', err.message);
    }
  }
}

testGetCarts();