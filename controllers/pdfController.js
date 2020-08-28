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
  const templateId = await Sheets.find({}).select('templateId');

  const pdf = new PDFDocument({
    size: 'A4',
    layout: 'landscape',
    margin: 50,
  });

  learners.forEach(element => pdf.text(element.learner));
  dates.forEach(element => pdf.text(element.date));
  formers.forEach(element => pdf.text(element.former));
  templateId.forEach(element => pdf.text(element.templateId));

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

  //to do : validation des données du formulaire avec express validator

  try {
    const template = new Template({
        name: req.body.name,
        entitled: req.body.entitled,
        organism: req.body.organism,
        logo: req.body.logo
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

//todo : list, edit and remove template controller

module.exports = controller;