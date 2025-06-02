const axios = require('axios');

async function testProtectedInvalidToken() {
  try {
    const response = await axios.get('http://localhost:5000/api/users', {
      headers: {
        Authorization: 'Bearer token_invalido'
      }
    });
    console.log('Acceso inesperadamente permitido:', response.data);
  } catch (err) {
    if (err.response) {
      console.log('Acceso denegado por token inválido (como se esperaba):', err.response.data);
    } else {
      console.log('Error:', err.message);
    }
  }
}

testProtectedInvalidToken();