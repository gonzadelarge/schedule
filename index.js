const express = require("express");
const passport = require("passport");
const path = require('path');

const dotenv = require("dotenv");
dotenv.config();

const db = require('./config/db.config');
db.connect();

const auth = require("./auth");
auth.useStrategies();

const PORT = process.env.PORT || 4000

const indexRoutes = require('./routes/index.routes');
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRoutes);
app.use("/auth", authRoutes);

app.use('*', (req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    return res.json(error.message);
});

app.use((error, req, res, next) => {
    return res.json('error', { 
        message: error.message || "Unexpected Error", 
        status: error.status || 500, 
    });
});

app.listen(PORT, () => console.log(`Servidor a tota virolla en http://localhost:${PORT}`))