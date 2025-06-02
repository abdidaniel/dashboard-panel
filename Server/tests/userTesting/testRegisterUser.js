const axios = require('axios');

async function testRegisterUser() {
  try {
    const response = await axios.post('http://localhost:5000/api/users', {
      name: { firstname: 'Test', lastname: 'User' },
      email: 'testuser' + Date.now() + '@mail.com',
      password: 'testpassword'
    });
    console.log('Usuario registrado:', response.data);
  } catch (err) {
    if (err.response) {
      console.log('Error al registrar usuario:', err.response.data);
    } else {
      console.log('Error:', err.message);
    }
  }
}

testRegisterUser();