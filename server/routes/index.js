import express from 'express';
import Repositories from '../loader/Repositories'
import {REPOSITORIES, AUTHORS} from '../../server.config';

let router = express.Router();
let repositories = new Repositories(REPOSITORIES, AUTHORS);

let onError = (res) => {
  return (e) => {
    console.log(e);
    console.log(e.stack);
    res.status(500).send(e);
  };
};

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/api/v1/contributions/:repo', function (req, res) {
  let repoName = req.params.repo;
  repositories.getContributions(repoName).then(function (results) {
    res.send(results);
  }).catch(onError(res));
});

router.get('/api/v1/contributions', function (req, res) {
  var repositories = new Repositories(REPOSITORIES, AUTHORS);
  repositories.getTotalContributions().then(function (results) {
    res.send(results);
  }).catch(onError(res));
});


module.exports = router;
