require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//Create express server
const app = express();

//Configure Cors
app.use(cors());

//Database
dbConnection();

app.get('/', (req, res) => {

    res.json({
        ok: true,
        msg: 'hola mundo'
    })

});


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto:', process.env.PORT);
})