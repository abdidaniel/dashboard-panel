const axios = require('axios');

async function testCreateCart() {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/carts',
      {
        userId: '683ba07f40d633be1a75c39e',
        products: [
          { productId: '683b9dd07a1837853e8e3209', quantity: 2 }
        ],
        date: new Date()
      },
      {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4M2JhMDdmNDBkNjMzYmUxYTc1YzM5ZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0ODgyOTU0NSwiZXhwIjoxNzQ4OTE1OTQ1fQ.zZJ6nL8dSC0u6zyj7-hHQbwao3bYTJfpAN70JJDPBFI'
        }
      }
    );
    console.log('Carrito creado:', response.data);
  } catch (err) {
    if (err.response) {
      console.log('Error al crear carrito:', err.response.data);
    } else {
      console.log('Error:', err.message);
    }
  }
}

testCreateCart();