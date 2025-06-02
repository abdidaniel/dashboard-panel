const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const hashedPassword = await bcrypt.hash('123456789', 10);

  const admin = new User({
    email: 'admin@market.com',
    username: 'admin',
    password: hashedPassword,
    name: { firstname: 'Admin', lastname: 'Principal' },
    role: 'admin'
  });

  await admin.save();
  console.log('Usuario administrador creado correctamente');
  mongoose.disconnect();
}

createAdmin().catch(err => {
  console.error(err);
  mongoose.disconnect();
});