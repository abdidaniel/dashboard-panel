const axios = require('axios');

async function testDeleteProduct() {
  try {
    const productId = '683b9dd07a1837853e8e320b';
    const response = await axios.delete(
      `http://localhost:5000/api/products/${productId}`,
      {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4M2JhMDdmNDBkNjMzYmUxYTc1YzM5ZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0ODc0NjU4MCwiZXhwIjoxNzQ4ODMyOTgwfQ.Pop1d4Rb8xWLdXyRS9VOZgEK-KH1SY2IgdQkqazVV38'
        }
      }
    );
    console.log('Producto eliminado:', response.data);
  } catch (err) {
    if (err.response) {
      console.log('Error al eliminar producto:', err.response.data);
    } else {
      console.log('Error:', err.message);
    }
  }
}

testDeleteProduct();