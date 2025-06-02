const axios = require('axios');

async function testGetCartById() {
  try {
    const cartId = '683ce8219fbddeaca0b040d7';
    const response = await axios.get(
      `http://localhost:5000/api/carts/${cartId}`,
      {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4M2JhMDdmNDBkNjMzYmUxYTc1YzM5ZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0ODgyOTU0NSwiZXhwIjoxNzQ4OTE1OTQ1fQ.zZJ6nL8dSC0u6zyj7-hHQbwao3bYTJfpAN70JJDPBFI'
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