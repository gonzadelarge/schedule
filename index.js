const express = require('express')

const dotenv = require('dotenv');
dotenv.config();

const path = require('path')
const PORT = process.env.PORT || 3000

const db = require('./config/db.config');
db.connect();

const indexRoutes = require('./routes/index.routes');

const app = express();

app.use('/', indexRoutes);

app.use('*', (req, res, next) => {

    const error = new Error('Route not found');

    error.status = 404;

    return res.json(error.message);
});

app.use((error, req, res, next) => {
    return res.json('error', { message: error.message || "Unexpected Error", status: error.status || 500, })
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`Servidor a tota virolla en http://localhost:${PORT}`))