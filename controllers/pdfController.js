const fs = require('fs');
const readline = require('readline');

const PDFDocument = require('pdfkit');

const axios = require('axios');

const Sheets = require('../models/Sheets');
const Template = require('../models/Template')

let controller = {}

controller.dashboard = async(req, res, next) => {
  try {
    const findTemplate = await Template.find();
    // const templateId = await Sheets.find().populate('templateId');
    // const name = await Template.find().select('name');

    res.render('dashboard', {
      title: 'Dashboard',
      path: '/dashboard',
      page: 'dashboard',
      findTemplate: findTemplate,
      // templateId: templateId
    });
  } catch (error) {
      return res.status(500).send('Error!');
  }
}

controller.dataSheets = async (req, res, next) => {
  const learner = [];
  const date = [];
  const former = [];

  try {
    axios.get('https://spreadsheets.google.com/feeds/cells/1Z5A_I7_RQKOjAXyDgn9_scbLA7YVTYBAC1G64orWb-E/1/public/full?alt=json')
    .then(response => {
      getSheetsData = response.data.feed.entry;
    })
    .catch(error => {
      console.log(error);
    });
    //Enregistrer les données du Sheets dans des tableaux vides pour pouvoir réutiliser les données
    getSheetsData.forEach(element => {
      //Pour push uniquement les éléments sous la première ligne après "Etudiant"
      if (element.gs$cell.col === '1' && element.gs$cell.inputValue != "Etudiant"){
        learner.push(element.gs$cell.inputValue)
      }
      //Pour push uniquement les éléments sous la première ligne après "Date"
      if(element.gs$cell.col === '2' && element.gs$cell.inputValue != "Date"){
        date.push(element.gs$cell.inputValue)
      }
      if(element.gs$cell.col === '3' && element.gs$cell.inputValue != "Formateur"){
        former.push(element.gs$cell.inputValue)
      }
    });

    const saveSheetsData = new Sheets({
      learner: learner,
      date: date,
      former: former,
    });

    await saveSheetsData.save();

    res.json({
      success: true,
      message: 'Les données ont bien été ajoutées à la base'
    });

  } catch (error) {
      return res.json({
          success: false,
          message: 'Une erreur est survenue lors de l\'ajout des données dans la base'
      });
    }
};

controller.createPdf = async (req, res, next) => {
  //Créer un document PDF vide et l'enregiste
  
  //Récupérer les données du sheets depuis la base

  const learners = await Sheets.find({}).select('learner');
  const dates = await Sheets.find({}).select('date');
  const formers = await Sheets.find({}).select('former');

  //Récupérer les données du template choisi (avec son id?)

  const pdf = new PDFDocument({
    size: 'A4',
    layout: 'landscape',
    margin: 50,
  });

  //parcourir learner pour afficher les noms 1 à 1
  // let i;
  // for(i=0; i < learners.length; i++){

  // }

  // pdf
  // .text(`${learners}`)
  // .text(`${dates}`)
  // .text(`${formers}`)

  //enregistre le pdf à la racine du projet
  pdf.pipe(fs.createWriteStream('sheets.pdf'));

  pdf.end();
  
}

controller.template = async (req, res, next) => {
  res.render('template', {
    title: 'Créer un template',
    path: '/template',
    page: "template",
  });
}

controller.createTemplate = async (req, res, next) => {

  //Récupérer les données de la base de données pour Template
  // const name = await Template.find({}).select('name');
  // console.log(name)
  // const entitled = await Template.find().select('entitled');
  // const organism = await Template.find().select('organism');
  // const logo = await Template.find().select('logo');

  const { name, entitled, organism } = req.body;
  const logo = req.file;

//   res.render('createtemplate', {
//     title: 'Créer un template',
//     path: '/createtemplate',
//     page: "createtemplate",
// });

  try {
    const template = new Template({
        name: name,
        entitled: entitled,
        organism: organism,
        logo: logo
    });

    await template.save();

    return res.json({
        success: true,
        message: 'Le template a bien été créé'
    });

  } catch (error) {
    return res.json({
        success: false,
        message: 'Une erreur est survenue lors de la création du template'
    });
  }

}

module.exports = controller;