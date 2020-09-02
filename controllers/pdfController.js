const fs = require('fs');
const readline = require('readline');

const PDFDocument = require('pdfkit');

const axios = require('axios');

const Sheets = require('../models/Sheets');
const Template = require('../models/Template');

let controller = {}

controller.dashboard = async(req, res, next) => {
  const templateId = await Sheets.find().populate('templateId');
  const name = await Template.find().select('name');
  const findTemplate = await Template.find();
  // if (!req.session.user) {
  //   return res.redirect('/')
  // }
  // console.log(req.session)
  try {
    res.render('dashboard', {
      title: 'Récupérer les données en base et choisir un template',
      path: '/dashboard',
      page: 'dashboard',
      name: name,
      findTemplate: findTemplate,
      templateId: templateId,
    });
  } catch (error) {
      return res.status(500).send('Error!');
  }
}

controller.dataSheets = async (req, res, next) => {

  const learner = [];
  const date = [];
  const former = [];
  const findTemplate = await Template.find();

  const templateId  = req.body.templateId;

  try {
    await axios.get('https://spreadsheets.google.com/feeds/cells/1Z5A_I7_RQKOjAXyDgn9_scbLA7YVTYBAC1G64orWb-E/1/public/full?alt=json')
    .then(response => {
      getSheetsData = response.data.feed.entry;
    })
    .then(() => {
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
    })
    .then(() => {
      const saveSheetsData = new Sheets({
        learner: learner,
        date: date,
        former: former,
        templateId: templateId,
      });
      return saveSheetsData
    })
    .then((saveSheetsData) => {
      saveSheetsData.save();
    })
    .catch(err => console.log(err))

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
  //Récupérer les données du sheets depuis la base
  const template = await Template.findOne({_id : req.body.templateId});
  const sheet = await Sheets.findOne({templateId : req.body.templateId});
  
  
    //Créer le pdf
    const pdf = new PDFDocument({
      size: 'A4',
      layout: 'landscape',
      margin: 50,
    });

    generateHeader(pdf,template);
    textInRowFirst(pdf);

    //ligne verticale milieu tableau

    //Création des lignes en statique
    row(pdf, 100);
   
    
  //Entrer les données dans le tableau
  var x=130;
  var y=137;
  textInRowFirst(pdf, '', 120);
sheet.learner.forEach(element => {
    row(pdf, x);
    
    textInRowFirst(pdf, `${element}`, y);
    y+=30;
    x+=30;
  });
  y=214;
  
for(let index=0; index<5;index++){
    
    textInFirstRow(pdf, sheet.date[index], y);
    y+=100;
    

  }
  for (let index = 200; index < 701; index+=100) {
    pdf.lineCap('butt')
    .moveTo(index, 130)
    .lineTo(index, x)
    .stroke()
    
  }
  


    generateFooter(pdf);

    pdf.end();
    let timestamp = new Date().getTime()
    //depanner
    var pdfdepan=fs.createWriteStream(`docs/sheets_${timestamp}.pdf`)
    setTimeout(function(){pdf.pipe(pdfdepan)},3000);

  //to do : obtenir les données du template
  function generateHeader(pdf,template) {
    pdf
      .image("public/images/"+template.logo, 50, 45, { width: 50 })
      .fillColor("#444444")
      .fontSize(20)
      //remplacer par les données dynamiques
      .text(template.organism, 110, 57)
      .fontSize(15)
      .text(template.entitled, 330, 65)
      .fontSize(14)

      .moveDown();
  }

  //Entrer le texte dans la première colonne
  function textInRowFirst(pdf, text, height) {
    pdf.y = height;
    pdf.x = 30;
    pdf.fillColor('black')
    pdf.text(text, {
      paragraphGap: 5,
      indent: 5,
      align: 'justify',
      columns: 1,
    });
    return pdf
  }
  function textInFirstRow(pdf, text, height) {
    pdf.y = 114;
    pdf.x = height;
    pdf.fillColor('black')
    pdf.text(text, {
      paragraphGap: 5,
      indent: 5,
      align: 'justify',
      columns: 1,
    });
    return pdf
  }

  function row(pdf, height) {
    pdf.lineJoin('miter')
      .rect(30, height, 670, 30)
      .stroke()
    return pdf
  }

  //signature statique
  function generateFooter(pdf) {
    pdf
      .fontSize(10)
      .text(
        "Cachet de l'établissement.",
        150,
        500,
        { align: "right", width: 500 }
      );
  }
}

//todo : list, edit and remove template controller

module.exports = controller;