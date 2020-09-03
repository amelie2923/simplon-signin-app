let controller = {};
const path = require('path');

const Template = require('../models/Template');
/**
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object render
 *
 * @memberof controller
 */
controller.index = async (req, res, next) => {
	if (!req.session.user) {
		res.redirect('/')
	}
	Template.find().then((templates) => {
		console.log(templates);
		res.render('templates/index', {
			title: 'Créer un template',
			templates: templates
		})
	})
	.catch((error) => {
		throw error
	})
}

controller.add = async (req, res, next) => {
	res.render('templates/add');
}

/**
 * 
 * @param {object} req Express request object file
 * @param {object} res Express response object 
 *
 * @memberof controller
 */

controller.create = async (req, res, next) => { //POST:/create
  const logoFile = req.file;
  //enregistre le chemin de l'image sans le public/images
  const logo = logoFile.path.split('public/images/')[1];
  console.log(req.file);
	//to do : validation des données du formulaire avec express validator
	try {

		const template = new Template({
			name: req.body.name,
			entitled: req.body.entitled,
			organism: req.body.organism,
			logo: req.file
		});
		await template.save();

		res.json({
			success: true,
			message: 'Le template a bien été créé'
		});

	} catch (error) {

		res.json({
			success: false,
			message: 'Une erreur est survenue lors de la création du template'
		});

	}

}

module.exports = controller;