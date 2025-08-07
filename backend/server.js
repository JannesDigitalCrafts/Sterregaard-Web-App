const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const inventoryRoutes = require('./routes/inventory');

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/inventory', inventoryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
