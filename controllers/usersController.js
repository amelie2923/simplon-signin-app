const User = require('../models/User');

let controller = {}

/**
 * 
 * Formulaire login
 * @param {object} res Express response object render
 * @memberof controller
 */
controller.login = async (req, res) => {//GET:/login
  try {
    res.render('login', {
      title: 'Login',
      path: '/login',
    });
  } catch (error) {
      return res.status(500).send('Error!');
  }
}


/**
 * 
 * Formulaire inscription
 * @param {object} res Express response object render
 *
 * @memberof controller
 */
controller.register = async (req, res) => {
  try {

    res.render('register', {
      title: 'Register',
      path: '/register',
    });
  } catch (error) {
      return res.status(500).send('Error!');
  }
}


/**
 * 
 * Action connexion
 *  @param {object} req body
 * @param {object} res json
 *
 * @memberof controller
 */
//to do : login et inscription for admin
controller.signin = async (req, res) => {
  const {
    email,
    password
  } = req.body
  if (!email || !password) {
    return res.json({
      result: "error",
      message: "Veuillez remplir ce champ"
    });
  } else {
    try {
      const user = await User.findOne({
        email: email
    })
      if (!user || (user.email !== email && user.password !== password)) {
        req.session.msgFlash = {
          type: "danger",
          message: "Mauvais identifiants"
        }
        res.redirect('/login')
      } else {
        req.session.user = user;
        // console.log(req.session);
        req.session.msgFlash = {
          type: "success",
          message: "Bienvenue"
        }
        res.redirect('/dashboard')
      }
    } catch (error) {
      return res.json({
        result: "error",
        message: "Mauvais identifiants"
      });
    }
  }
  console.log(req.session)
}


/**
 * 
 * Action connexion
 *  @param {object} req body
 * @param {object} res redirect /login
 *
 * @memberof controller
 */
controller.signup = async (req, res) => {
  User.create({
    email: req.body.email,
    password: req.body.password
  }).then(
    res.redirect('/login')
  )
}



/**
 * 
 * Indentification du user
 *  @param {object} req params
 * @param {object} res status
 * @param {object} :id
 * @memberof controller
 */
controller.show = async (req, res) => {
  const {
    id
  } = req.params
  try {
    const user = await User.findById(id)
    if (!user) return res.status(400).json({
      result: "error",
      message: "utilisateur non trouvé"
    })
    res.status(200).json({
      user
    })
  } catch (error) {
    res.status(400).json({
      result: "error",
      message: error
    })
  }
}

  module.exports = controller;



  
// controller.signup = async (req, res) => {
//   const {
//     email,
//     password
//   } = req.body
//   try {
//     const user = await User.create({
//       email,
//       password
//     })
//     res.status(201).json({
//       user
//     })
//   } catch (error) {
//     res.status(400).json({
//       result: "error"
//     })
//   }
// }