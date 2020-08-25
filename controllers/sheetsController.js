const fs = require('fs');
const readline = require('readline');
const axios = require('axios');

let controller = {}

controller.dataSheets = async (req, res, next) => {
  let learner = [];
  let date = [];
  let former = [];

  try {
    axios.get('https://spreadsheets.google.com/feeds/cells/1Z5A_I7_RQKOjAXyDgn9_scbLA7YVTYBAC1G64orWb-E/1/public/full?alt=json')
    .then(response => {
      getSheetsData = response.data.feed.entry;
      console.log(getSheetsData);
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

module.exports = controller;