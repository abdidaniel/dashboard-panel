const axios = require('axios');

async function testSalesByMonth() {
  try {
    const response = await axios.get(
      'http://localhost:5000/api/carts/stats/sales-by-month',
      {
        headers: {
          Authorization: 'Bearer <TOKEN_ADMIN_AQUI>'
        }
      }
    );
    console.log('Ventas por mes:', response.data);
  } catch (err) {
    if (err.response) {
      console.log('Error al obtener ventas por mes:', err.response.data);
    } else {
      console.log('Error:', err.message);
    }
  }
}

testSalesByMonth();