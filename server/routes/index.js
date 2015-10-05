import express from 'express';
import Projects from '../loader/Projects'

let onError = (res) => {
  return (e) => {
    console.log(e);
    console.log(e.stack);
    res.status(500).send(e);
  };
};

module.exports = (config) => {

  let router = express.Router();
  let projects = new Projects(config.PROJECTS, config.AUTHORS);

  router.get('/', function (req, res) {
    res.render('index');
  });

  router.get('/api/v1/projects', function (req, res) {
    res.send(projects.getProjectDefinitions());
  });

  router.get('/api/v1/contributions/:project', function (req, res) {
    let projectKey = req.params.project;
    projects.getProjectContributions(projectKey).then(function (results) {
      res.send(results);
    }).catch(onError(res));
  });

  router.get('/api/v1/contributions', function (req, res) {
    projects.getTotalContributions().then(function (results) {
      res.send(results);
    }).catch(onError(res));
  });

  return router;
};
