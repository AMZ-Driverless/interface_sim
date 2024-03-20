const express = require('express');
const mongoose = require('mongoose');
const commitRoutes = require('./routes/api/commits');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/amz_toy_dbe', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/commits', commitRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
