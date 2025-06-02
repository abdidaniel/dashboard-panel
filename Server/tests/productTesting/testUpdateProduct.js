const axios = require('axios');

async function testUpdateProduct() {
  try {
    const productId = '683b9dd07a1837853e8e3211';
    const response = await axios.put(
      `http://localhost:5000/api/products/${productId}`,
      {
        price: 79.99,
        description: 'Descripción actualizada'
      },
      {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4M2JhMDdmNDBkNjMzYmUxYTc1YzM5ZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0ODc0NjU4MCwiZXhwIjoxNzQ4ODMyOTgwfQ.Pop1d4Rb8xWLdXyRS9VOZgEK-KH1SY2IgdQkqazVV38'
        }
      }
    );
    console.log('Producto actualizado:', response.data);
  } catch (err) {
    if (err.response) {
      console.log('Error al actualizar producto:', err.response.data);
    } else {
      console.log('Error:', err.message);
    }
  }
}

testUpdateProduct();