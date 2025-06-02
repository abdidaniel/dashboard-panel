const axios = require('axios');

async function testDeleteCart() {
  try {
    const cartId = '683d07560397a5a6ba225169';
    const response = await axios.delete(
      `http://localhost:5000/api/carts/${cartId}`,
      {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4M2JhMDdmNDBkNjMzYmUxYTc1YzM5ZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0ODgyOTU0NSwiZXhwIjoxNzQ4OTE1OTQ1fQ.zZJ6nL8dSC0u6zyj7-hHQbwao3bYTJfpAN70JJDPBFI'
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