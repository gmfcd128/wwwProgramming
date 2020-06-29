var express = require('express');
const passport = require('passport');
var path = require('path');
const bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.json());

router.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/login.html'));
});
router.get('/home', (req, res) =>{
  console.log('req:' + req.user);
  res.render('home.ejs', {user:req.user});
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/auth/facebook', passport.authenticate('facebook', {
  scope: 'email'
}));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/home',
  failureFlash: false
}));

module.exports = router;
