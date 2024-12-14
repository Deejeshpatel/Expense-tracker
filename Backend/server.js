const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/db');

const expenseRoutes = require('./routes/expenseRoutes');
const authRoutes = require('./routes/authRoutes');
const { authMiddleware } = require('./middleware/authMiddleware');

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());


app.use('/api/auth', authRoutes);


app.use('/api/expenses', expenseRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
