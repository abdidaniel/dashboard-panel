const axios = require('axios');

async function testSalesByMonth() {
  try {
    const response = await axios.get(
      'http://localhost:5000/api/carts/stats/sales-by-month',
      {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4M2JhMDdmNDBkNjMzYmUxYTc1YzM5ZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0ODgyOTU0NSwiZXhwIjoxNzQ4OTE1OTQ1fQ.zZJ6nL8dSC0u6zyj7-hHQbwao3bYTJfpAN70JJDPBFI'
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