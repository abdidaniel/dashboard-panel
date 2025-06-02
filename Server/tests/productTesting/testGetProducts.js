const axios = require('axios');

async function testGetProducts() {
  try {
    const response = await axios.get('http://localhost:5000/api/products');
    console.log('Productos obtenidos:', response.data);
  } catch (err) {
    if (err.response) {
      console.log('Error al obtener productos:', err.response.data);
    } else {
      console.log('Error:', err.message);
    }
  }
}

testGetProducts();