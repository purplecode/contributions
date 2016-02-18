import _ from 'lodash';
import keyMirror from 'keymirror';

const Constants = keyMirror({
    REQUEST_PROJECTS: null,
    RECEIVE_PROJECTS: null
});

const Actions = {
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

const Reducer = function (state = {
    isFetching: false,
    model: []
}, action) {
    switch (action.type) {
        case Constants.REQUEST_PROJECTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case Constants.RECEIVE_PROJECTS:
            return Object.assign({}, state, {
                isFetching: false,
                model: action.projects,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
};

export {Reducer};

export default {
    getProjects() {
        return (dispatch, getState) => {
            let state = getState().projects;
            let shouldFetch = _.isEmpty(state.model) && !state.isFetching;
            let promise = shouldFetch ? dispatch(Actions.fetchProjects()) : Promise.resolve();
            return promise.then(() => {
                return getState().projects.model;
            });
        }
    }
};

