import express from 'express';
import Repositories from '../loader/Repositories'
import {REPOSITORIES, AUTHORS} from '../../server.config';

var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'Main' });
});

router.get('/api/v1/contributions', function(req, res) {
  var repositories = new Repositories(REPOSITORIES, AUTHORS);
  repositories.getMonthlyContributions().then(function (results) {
    res.send(results);
  }).catch(function(e) {
    console.log(e);
    console.log(e.stack);
    res.status(500).send(e);
  });
});


module.exports = router;
