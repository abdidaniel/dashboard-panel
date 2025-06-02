const axios = require('axios');

async function testProtectedNoToken() {
  try {
    const response = await axios.get('http://localhost:5000/api/users');
    console.log('Acceso inesperadamente permitido:', response.data);
  } catch (err) {
    if (err.response) {
      console.log('Acceso denegado (como se esperaba):', err.response.data);
    } else {
      console.log('Error:', err.message);
    }
  }
}

testProtectedNoToken();