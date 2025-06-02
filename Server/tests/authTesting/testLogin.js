const axios = require('axios');

async function testLogin() {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@market.com',
      password: '123456789'
    });
    console.log('Login exitoso:', response.data);
  } catch (err) {
    if (err.response) {
      console.log('Error en la respuesta:', err.response.data);
    } else {
      console.log('Error:', err.message);
    }
  }
}

testLogin();