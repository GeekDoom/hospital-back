require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//Create express server
const app = express();

//Configure Cors
app.use(cors());

//Body read
app.use(express.json());

//Database
dbConnection();


//Routes
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/login', require('./routes/auth.routes'));



app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto:', process.env.PORT);
})