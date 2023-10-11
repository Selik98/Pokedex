const path = require('path')
const mainModel = require('../models/mainModels');
const multer = require('multer');
const upload = multer({ dest: 'img/noticias' });



const controller = {
  home: ('/', (req, res) => {
    console.log('Hicieron un Request en "/"')
    res.render('index')
  }),
  detail: ('/', (req, res) => {
    console.log('Hicieron un Request en "Quisieron Ver al pokemon N° ' + req.params.id)
    res.render('detail')
  }),


}

module.exports = controller;