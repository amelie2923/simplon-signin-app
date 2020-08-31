const User = require('../models/User');

let controller = {}

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

controller.login = async (req, res) => {
  try {
    res.render('login', {
      title: 'Login',
      path: '/login',
    });
  } catch (error) {
      return res.status(500).send('Error!');
  }
}

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
        return res.json({
          result: "error",
          message: "Mauvais identifiants"
        });
      } else {
        res.redirect('/dashboard')
      }
    } catch (error) {
      return res.json({
        result: "error",
        message: "Mauvais identifiants"
      });
    }
  }
}

controller.signup = async (req, res) => {
  // if (!validator.isEmail(req.body.email)) {
  //   return res.redirect('/inscription')
  // }

  User.create({
    email: req.body.email,
    password: req.body.password
  }).then(
    res.redirect('/')
  )
}

  module.exports = controller;