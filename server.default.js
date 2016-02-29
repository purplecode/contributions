/**
 * Projects configurations. Multiple projects with multiple repositories are supported.
 */
export const PROJECTS = {
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
 *
 * @returns {string} user identifier
 */
export const AUTHORS = (name, email) => {
    /**
     * This is just an example. You can put your own logic here, or left it intact.
     */
    if (email.indexOf('jaworski') > -1) {
        return 'mateusz.jaworski@nokia.com';
    }
    return email;
};


/**
 * Authentication middleware. No credentials check.
 *
 * @returns {function} middleware
 */
export const AUTHENTICATION = {

    configure(app) {
        // do nothing
    },

    middleware() {
        /**
         * No authentication
         */
        return (_, __, next) => {
            next();
        }
    }
};


/**
 * Authentication middleware. HTTP basic auth.
 */
//export const AUTHENTICATION = {
//
//    passport: require('passport'),
//    passportHttp: require('passport-http'),
//
//    configure(app) {
//        app.use(this.passport.initialize());
//        app.use(this.passport.session());
//
//        this.passport.serializeUser((user, done) => {
//            done(null, user);
//        });
//
//        this.passport.deserializeUser((user, done) => {
//            done(null, user);
//        });
//
//        const check = (username, password, done) => {
//            if (username === "username" && password === "password") {
//                return done(null, username);
//            }
//            return done(null, false);
//        };
//
//        this.passport.use(new this.passportHttp.BasicStrategy(check));
//
//    },
//
//    middleware() {
//        return this.passport.authenticate('basic', {session: true});
//    }
//
//};
//
