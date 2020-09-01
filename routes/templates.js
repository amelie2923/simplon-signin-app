const express = require('express');
const router = express.Router();
const multer  =   require('multer');
const controller = require('../controllers/templatesController')
const fs = require('fs-extra');

const path = require('path');

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
      //mkdirs est une fonction de fs-extra qui autorise l'enregistrement du fichier même si le dossier existe déjà
      fs.mkdirs('./public/images', function(err) {
          if(err) {
              console.log(err.stack)
          } else {
              callback(null, './public/images');
          }
      })
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

router.get('/', controller.index);
router.post('/create',function(req,res){
let upload = multer({ storage : storage }).single('logo');
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
},
controller.create);

module.exports = router;
