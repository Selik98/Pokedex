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
    let showPokemon = req.params.id
    console.log('Hicieron un Request en "Quisieron Ver al pokemon N° ' + showPokemon)
    res.render('detail', { showPokemon });
  }),


}

module.exports = controller;