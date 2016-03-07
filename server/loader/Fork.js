var nodegit = require('nodegit');


function getRepository(repositoryPath) {
    return nodegit.Repository
        .open(repositoryPath)
        .then((r) => {
            return r;
        });
}


function getLineStats(commit) {
    var lines = {
        added: 0,
        deleted: 0
    };
    return commit.getDiff().then((diffs) => {
        return Promise.all(diffs.map((diff)=> {
            return diff.patches().then(function (patches) {
                patches.forEach(function (patch) {
                    var stats = patch.lineStats();
                    lines.added += stats.total_additions;
                    lines.deleted += stats.total_deletions;
                });
            });
        }));
    }).then(() => {
        return lines;
    });
}


process.on('message', message => {
    getRepository(message.data.repository).then(repository => {
        repository.getCommit(message.data.oid).then(getLineStats).then((response) => {
            process.send({id: message.id, data: response});
        }).catch((e) => {
            process.send({id: message.id, error: e.message});
        });
    });

});
