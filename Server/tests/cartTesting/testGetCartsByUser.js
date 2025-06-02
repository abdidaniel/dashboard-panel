const axios = require('axios');

async function testGetCartsByUser() {
  try {
    const userId = '683ba07f40d633be1a75c39e';
    const response = await axios.get(
      `http://localhost:5000/api/carts/user/${userId}`,
      {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4M2JhMDdmNDBkNjMzYmUxYTc1YzM5ZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0ODgyOTU0NSwiZXhwIjoxNzQ4OTE1OTQ1fQ.zZJ6nL8dSC0u6zyj7-hHQbwao3bYTJfpAN70JJDPBFI'
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