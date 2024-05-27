const Profile = require('../models/Profile')
const {multipleMongooseToObject} = require('../../utils/mongoose')

class ProfilesController {
    home(req, res) {
      Profile.find({})
        .then(profiles => {
          res.render('profiles', {
            profiles:multipleMongooseToObject(profiles)
          })
        })
        .catch(err => createNextState(err  ))
  }
  }
  
  module.exports = new ProfilesController();
  