const axios = require('axios');

async function testLoginFail() {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@market.com',
      password: 'contraseña_incorrecta'
    });
    console.log('Login inesperadamente exitoso:', response.data);
  } catch (err) {
    if (err.response) {
      console.log('Login fallido (como se esperaba):', err.response.data);
    } else {
      console.log('Error:', err.message);
    }
  }
}

testLoginFail();