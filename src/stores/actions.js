import _ from 'lodash';
import keyMirror from 'keymirror';

const Constants = keyMirror({
    REQUEST_PROJECTS: null,
    RECEIVE_PROJECTS: null,
    REQUEST_CONTRIBUTORS: null,
    RECEIVE_CONTRIBUTORS: null,
    REQUEST_CONTRIBUTIONS: null,
    RECEIVE_CONTRIBUTIONS: null
});

const Projects = {
    actions: {
        requestProjects() {
            return {
                type: Constants.REQUEST_PROJECTS
            };
        },
        receiveProjects(json) {
            return {
                type: Constants.RECEIVE_PROJECTS,
                projects: json,
                receivedAt: Date.now()
            };
        }
    },
    fetchProjects() {
        return dispatch => {
            dispatch(this.actions.requestProjects());
            return fetch(`/api/v1/projects`)
                .then(response => response.json())
                .then(json => dispatch(this.actions.receiveProjects(json)))
        };
    }
};

const Contributors = {
    actions: {
        requestContributors() {
            return {
                type: Constants.REQUEST_CONTRIBUTORS
            };
        },
        receiveContributors(json) {
            return {
                type: Constants.RECEIVE_CONTRIBUTORS,
                contributors: json,
                receivedAt: Date.now()
            };
        }
    },
    fetchContributors() {
        return dispatch => {
            dispatch(this.actions.requestContributors());
            return fetch(`/api/v1/contributors`)
                .then(response => response.json())
                .then(json => dispatch(this.actions.receiveContributors(json)))
        };
    }
};

const Contributions = {
    actions: {
        requestContributions(projectKey) {
            return {
                type: Constants.REQUEST_CONTRIBUTIONS,
                projectKey: projectKey
            };
        },
        receiveContributions(projectKey, json) {
            return {
                type: Constants.RECEIVE_CONTRIBUTIONS,
                projectKey: projectKey,
                contributions: json,
                receivedAt: Date.now()
            };
        }
    },
    fetchContributions(projectKey) {
        return dispatch => {
            dispatch(this.actions.requestContributions(projectKey));
            return fetch( `/api/v1/contributions/${projectKey}`)
                .then(response => response.json())
                .then(json => dispatch(this.actions.receiveContributions(projectKey, json)))
        };
    }
};


function shouldFetch(store) {
    if (!store || _.isEmpty(store.model)) {
        return true;
    } else if (store.isFetching) {
        return false;
    }
    return false;
}

export default {
    ...Constants,
    getProjects() {
        return (dispatch, getState) => {
            if (shouldFetch(getState().projects)) {
                return dispatch(Projects.fetchProjects())
            } else {
                return Promise.resolve()
            }
        }
    },
    getContributors() {
        return (dispatch, getState) => {
            if (shouldFetch(getState().contributors)) {
                return dispatch(Contributors.fetchContributors())
            } else {
                return Promise.resolve()
            }
        }
    },
    getContributions(projectKey) {
        return (dispatch, getState) => {
            if (shouldFetch(getState().contributions[projectKey])) {
                return dispatch(Contributions.fetchContributions(projectKey))
            } else {
                return Promise.resolve()
            }
        }
    }
};

