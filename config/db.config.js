const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/node_schedule';


const connect = async () => {
    try {
        const db = await mongoose.connect(DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
        });

        const { name, host } = db.connection;
        console.log(`Conectado con exito a ${name} en ${host}`);

    } catch (error) {
        console.log(`Ha ocurrido un error conectando a la base de datos ${error}`);
    }
};


module.exports = { connect, DB_URL };