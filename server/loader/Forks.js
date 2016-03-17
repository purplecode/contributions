import _ from 'lodash';
import child_process from 'child_process';

let jobId = 0;

export default class Forks {

    constructor(N, scriptPath) {

        this.todo = [];
        this.inprogress = {};

        this.forks = _.times(N, Number).map(() => {
            let fork = child_process.fork(`${__dirname}/${scriptPath}`);

            fork.$isBusy = false;

            fork.on('message', this._onResponse.bind(this, fork, 'resolve'));
            fork.on('error', this._onResponse.bind(this, fork, 'reject'));

            return fork;
        });

    }

    process(data) {
        return new Promise((resolve, reject) => {
            let job = {
                id: jobId++,
                data,
                resolve,
                reject
            };

            let fork = _.find(this.forks, {$isBusy: false});
            if (fork) {
                this._send(fork, job);
            } else {
                this.todo.push(job);
            }
        });
    }

    kill() {
        this.forks.forEach(fork => fork.kill());
    }

    _send(fork, {id, data, resolve, reject}) {
        fork.$isBusy = true;
        this.inprogress[id] = {
            resolve,
            reject
        };
        fork.send({
            id,
            data
        });
    }

    _onResponse(fork, action, {id, data, error}) {
        if (error) {
            action = 'reject';
        }

        this.inprogress[id][action](data);

        delete this.inprogress[id];

        if (this.todo.length > 0) {
            this._send(fork, this.todo.pop());
        } else {
            fork.$isBusy = false;
        }
    }

}