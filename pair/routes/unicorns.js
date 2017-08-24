var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');




/* GET home page. */
router.get('/', function(req, res, next) {
  knex.raw(`select * from unicorns`)
  .then(function(data){
    res.render('unicorns', {unicorns:data.rows})
  })
});


router.get('/new', function(req, res, next){
  res.render('new')
})


router.get('/:id', function(req, res, next) {
  knex.raw(`select * from unicorns where id = ${req.params.id}`)
  .then(function(data) {
    res.render('show', {title:'My Unicorn', unicorn:data.rows[0]})
  })
})



router.post('/new', function(req, res, next){
  knex.raw(`insert into unicorns(name, color, bronie) values('${req.body.name}', '${req.body.color}', ${req.body.bronie})`)
  .then(function(data){
    res.redirect('/')
  })
})

module.exports = router;
