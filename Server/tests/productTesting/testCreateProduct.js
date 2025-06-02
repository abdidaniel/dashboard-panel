const axios = require('axios');

async function testCreateProduct() {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/products',
      {
        title: 'Producto de prueba',
        price: 99.99,
        category: 'Test',
        description: 'Este es un producto de prueba'
      },
      {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4M2JhMDdmNDBkNjMzYmUxYTc1YzM5ZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0ODc0NjU4MCwiZXhwIjoxNzQ4ODMyOTgwfQ.Pop1d4Rb8xWLdXyRS9VOZgEK-KH1SY2IgdQkqazVV38'
        }
      }
    );
    console.log('Producto creado exitosamente:', response.data);
  } catch (err) {
    if (err.response) {
      console.log('Error al crear producto:', err.response.data);
    } else {
      console.log('Error:', err.message);
    }
  }
}

testCreateProduct();