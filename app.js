// npm install express
// npm install dotenv
// npm install ejs 

const express = require('express')
const path = require('path')
const dotenv = require('dotenv').config();
const app = express()
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.set ('views', [
    path.join(__dirname, './src/views'),
])




const mainRouter = require('./src/routes/mainRouter');

app.listen(process.env.PORT, () => {
    console.log("Servidor escuchando Puerto " + process.env.PORT + " http://localhost:" + process.env.PORT)
})

app.use('/', mainRouter)

app.use(express.static('public'));