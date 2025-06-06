const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema & model
const DataSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const DataModel = mongoose.model('Data', DataSchema);

// Routes
app.post('/api/data', async (req, res) => {
  const { name, email } = req.body;
  const newData = new DataModel({ name, email });
  await newData.save();
  res.json({ message: 'Data saved' });
});

app.get('/api/data', async (req, res) => {
  const data = await DataModel.find();
  res.json(data);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
