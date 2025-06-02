const axios = require('axios');

async function testRegisteredByMonth() {
  try {
    const response = await axios.get(
      'http://localhost:5000/api/users/stats/registered-by-month',
      {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4M2JhMDdmNDBkNjMzYmUxYTc1YzM5ZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0ODc0NzY4MSwiZXhwIjoxNzQ4ODM0MDgxfQ.Lv0qNH6mcAM-XdkiMsDDTBndCcNtY9L2lZTpQZ-7oHc'
        }
      }
    );
    console.log('Usuarios registrados por mes:', response.data);
  } catch (err) {
    if (err.response) {
      console.log('Error al obtener estadísticas:', err.response.data);
    } else {
      console.log('Error:', err.message);
    }
  }
}

testRegisteredByMonth();