const Profile = require('../models/Profile')

class HomeController {
    search(req, res) {
      res.render('search');
    }
    async home(req, res) {
      try {
          const profiles = await Profile.find({});
          res.json(profiles);
      } catch (err) {
          console.error('Error fetching profiles:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      }
  }
  }
  
  module.exports = new HomeController();
  