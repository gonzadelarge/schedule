const express = require('express')

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000

const app = express();
app.listen(PORT, () => console.log(`Servidor a tota virolla en http://localhost:${PORT}`))