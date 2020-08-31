let controller = {};

const Template = require('../models/Template');

controller.index = async (req, res, next) => {
    res.render('template', {
		title: 'Créer un template',
		path: '/template',
		page: "template",
    });
}
  
controller.create = async (req, res, next) => {
	//to do : validation des données du formulaire avec express validator
	try {

		const template = new Template({
			name: req.body.name,
			entitled: req.body.entitled,
			organism: req.body.organism,
			logo: req.body.logo
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