const express = require ('express')
const router = express.Router()
const mainController = require ('../controllers/mainController')
const multer = require('multer')
const path = require('path')



router.get('/' , mainController.home);
router.get('/pokemon/:id' , mainController.detail);



module.exports = router;

