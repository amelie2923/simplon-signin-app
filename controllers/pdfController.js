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
    const templateId = await Sheets.find().populate('templateId');

    res.render('dashboard', {
      title: 'Dashboard',
      path: '/dashboard',
      page: 'dashboard',
      findTemplate: findTemplate,
      templateId: templateId
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
  // const sheetsId = req.params.id;
  // const sheets = Sheets;
  const pdf = new PDFDocument({
    size: 'A4',
    layout: 'landscape',
    margin: 50,
    // autoFirstPage: false
  });
}

module.exports = controller;