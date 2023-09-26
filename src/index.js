const express = require('express');
const cors = require('cors');
const { router } = require('./routes/indexRoutes');
const { default: mongoose } = require('mongoose');
const app = express();

require('dotenv').config()
app.use(express.json())
app.use(cors());

const PORT = 8000;

app.use(router);

app.listen(PORT, async () => {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log(`Listening to http://localhost:${PORT}`);
});