const express = require('express');
const { dbConection } = require('./DB/config');
require('dotenv').config();
const app = express();
const cors = require('cors')
//db


//mostrar el index html
app.use( express.static('public') )
dbConection();

//cors
app.use(cors())


//lectura del body
app.use(express.json())


app.use('/app/auth', require('./routes/auth'))



app.listen( process.env.PORT, ()=>{
    console.log(`server in port ${process.env.PORT}`);
} )