const axios = require('axios');

async function testGetUserById() {
  try {
    const userId = '683ba40e58cb411f6ebc674d';
    const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4M2JhMDdmNDBkNjMzYmUxYTc1YzM5ZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0ODc0NzY4MSwiZXhwIjoxNzQ4ODM0MDgxfQ.Lv0qNH6mcAM-XdkiMsDDTBndCcNtY9L2lZTpQZ-7oHc'
      }
    });
    console.log('Usuario obtenido:', response.data);
  } catch (err) {
    if (err.response) {
      console.log('Error al obtener usuario:', err.response.data);
    } else {
      console.log('Error:', err.message);
    }
  }
}

testGetUserById();