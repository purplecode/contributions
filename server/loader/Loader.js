import GitRepository from './GitRepository';
import _ from 'lodash';

export default class Loader {
  constructor(repositories, authors) {
    this.repositories = repositories;
    this.authors = authors;
  }

  getMonthlyContributions() {
    let names = Object.keys(this.repositories);
    let promises = names.map((name)=> {
        return new GitRepository(name, this.repositories[name], this.authors).getHistory().then((history) => {
          return history.getMonthlyContributions();
        });
    });
    return Promise.all(promises).then((history) => {
      return _.zip(names, history);
    });
  }
}