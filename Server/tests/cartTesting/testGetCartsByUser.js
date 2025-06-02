const axios = require('axios');

async function testGetCartsByUser() {
  try {
    const userId = '<USER_ID_AQUI>';
    const response = await axios.get(
      `http://localhost:5000/api/carts/user/${userId}`,
      {
        headers: {
          Authorization: 'Bearer <TOKEN_USER_O_ADMIN_AQUI>'
        }
      }
    );
    console.log('Carritos del usuario:', response.data);
  } catch (err) {
    if (err.response) {
      console.log('Error al obtener carritos del usuario:', err.response.data);
    } else {
      console.log('Error:', err.message);
    }
  }
}

testGetCartsByUser();