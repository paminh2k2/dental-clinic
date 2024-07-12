const express = require('express');
const cors = require('cors');
const route = require('./routes')
const connectDB = require('./config/db')
const app = express();

// Kết nối với MongoDB
connectDB();
app.use(express.json())
app.use(cors());
// Routes
route(app)

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
