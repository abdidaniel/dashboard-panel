const axios = require('axios');

async function testGetUsers() {
  try {
    const response = await axios.get('http://localhost:5000/api/users', {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4M2JhMDdmNDBkNjMzYmUxYTc1YzM5ZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0ODc0NzY4MSwiZXhwIjoxNzQ4ODM0MDgxfQ.Lv0qNH6mcAM-XdkiMsDDTBndCcNtY9L2lZTpQZ-7oHc'
      }
    });
    console.log('Usuarios obtenidos:', response.data);
  } catch (err) {
    if (err.response) {
      console.log('Error al obtener usuarios:', err.response.data);
    } else {
      console.log('Error:', err.message);
    }
  }
}

testGetUsers();