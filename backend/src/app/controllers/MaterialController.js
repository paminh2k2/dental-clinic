class MaterialController {
    search(req, res) {
      res.render('search');
    }
    home(req, res) {
      res.render('home');
    }
  }
  
  module.exports = new MaterialController();
  