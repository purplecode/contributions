/**
 * Projects configurations. Multiple projects with multiple repositories are supported.
 */
const PROJECTS = {
    sampleProject1: {
        name: 'PurpleCode.Contributions 1',
        description: "Project contributions stats made with love by PurpleCode",
        repositories: [{
            type: 'git',
            branch: 'master',
            path: '.'
        }]
    },
    sampleProject2: {
        name: 'PurpleCode.Contributions 2',
        description: "Just a copy of the project to show how to add multiple projects",
        repositories: [{
            type: 'git',
            branch: 'master',
            path: '.'
        }, {
            type: 'git',
            branch: 'master',
            path: '.'
        }]
    }
};

/**
 * Contributors id's translator. In the case when:
 *    - the same person has multiple identities
 *    - for anonymisation
 *    - for merging team results
 */
const AUTHORS = {
    getId(name, email) {
        /**
         * This is just an example. You can put your own logic here, or left it intact.
         */
        if (email.indexOf('jaworski') > -1) {
            return 'mateusz.jaworski@nokia.com';
        }
        return email;
    }
};


export {PROJECTS};
export {AUTHORS};